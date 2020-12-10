document.addEventListener('DOMContentLoaded', (event) => {
    let allDrawBtn = document.getElementById('all-draw-btn');
    let allClearBtn = document.getElementById('all-clear-btn');

    let inTextArea = document.getElementById('text-area');
    let errorText = document.getElementById('error');

    let canvas = document.getElementById('my-canvas');
    let ctx = canvas.getContext('2d');

    // set canvas width:height 1:2/3
    canvas.setAttribute('width', `${canvas.parentElement.offsetWidth}px`);
    canvas.setAttribute('height', `${canvas.parentElement.offsetWidth * 2 / 3}px`);

    // print figure list
    let figureNameListDiv = document.getElementById('figure-name-list');
    figureNameList = ['line - линия', 'rectangle - прямоугольник', 'triangle - треугольник', 'circle - круг', 'ellipse - овал'];
    for (figureName of figureNameList) {
        let p = document.createElement("p");
        p.innerText = figureName;
        figureNameListDiv.append(p);
    }

    // print option list
    let optionListDiv = document.getElementById('option-list');
    optionList = ['-p [x, y] координаты',
        '-r радиус круга в px',
        '-r1 радиус овала в горизонтальной плоскости',
        '-r2 радиус овала в вертикальной плоскости',
        '-c цвет обводки в любом формате, который поддерживает CSS (ключевые слова, rgb, rgba, hex, hsl, hsla)',
        '-b цвет заливки в любом формате',
        '-lw толщина линии обводки в px',
        '-lt [solid|dashed|dotted] тип линии solid(сплошная), dashed(пунктирная), dotted(в точку)']
    for (option of optionList) {
        let p = document.createElement("p");
        p.innerText = option;
        optionListDiv.append(p);
    }


    // figures preset
    if (inTextArea.innerHTML.length == 0) {
        inTextArea.innerHTML = `line -p [10, 50] [100,25] -c rgb(255, 0, 0)
line -p [700, 130] [700, 350] -lw 1
rectangle -p [50, 150] [200, 250] -c rgb(0, 255, 0) -b rgba(255, 0, 0, 0.3) -lw 5 -lt dotted
rectangle -p [60, 500] [300, 570] -c black -lw 3 -lt dashed
triangle -p [300, 300] [340, 340] [800, 340] -c rgb(0, 0, 255) -b rgba(255, 0, 0, 0.3)
triangle -p [500, 400] [500, 580] [560, 580] -c black -b rgba(255, 0, 0, 0.5) -lw 5
circle -p [200, 150] -r 25 -c rgba(255, 0, 0, 0.8) -b rgba(0, 255, 0, 0.3)
ellipse -p [75, 75] -r1 50 -r2 25 -c rgb(0, 255, 0) -b rgba(255, 0, 0, 0.3)`
    }

    canvasModel = new Canvas(ctx, canvas.width, canvas.height);

    // draw button
    allDrawBtn.addEventListener('click', () => {
        // clear error div
        errorText.innerHTML = '';

        let inData = inTextArea.value;
        let figures = inData.split('\n');

        // all figures
        for (let figure of figures) {
            // empty string
            if (figure.length == 0) {
                continue;
            }

            let options = figure.trim().split(/ +-/);
            let nameFigure = options.shift();

            let optionMap = new Map();

            // all options
            for (let option of options) {
                nameOption = option.slice(0, option.indexOf(' '));
                valueOption = option.slice(nameOption.length + 1);
                if (nameOption == 'p') {
                    valueOption = valueOption.replace(/\s+/g, '');
                }
                optionMap.set(nameOption, valueOption);
            }

            if (options.length == 0) {
                errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно заданы параметры</p>`;
                continue;
            }

            // coordinates
            let coordsStr = optionMap.get('p');
            let coords = coordsStr.match(/\d+/g);

            // color
            let color = optionMap.get('c');

            // background color
            let bgColor = optionMap.get('b');

            // line width
            let lineWidth = optionMap.get('lw');
            if (lineWidth != undefined) {
                lineWidth = parseInt(lineWidth);
                if (isNaN(lineWidth)) {
                    errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно задана толщина линии</p>`;
                    continue;    
                }
            }

            // line type
            let lineType = optionMap.get('lt');

            switch (nameFigure) {
                case 'line':
                    if (coords.length == 4) {
                        canvasModel.drawLine(coords[0], coords[1], coords[2], coords[3], color, lineWidth, lineType);
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно заданы координаты</p>`;
                    }
                    break;
                case 'rectangle':
                    if (coords.length == 4) {
                        let width = coords[2] - coords[0];
                        let height = coords[3] - coords[1];
                        canvasModel.drawRect(coords[0], coords[1], width, height, color, bgColor, lineWidth, lineType);
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно заданы координаты</p>`;
                    }
                    break;
                case 'triangle':
                    if (coords.length == 6) {
                        canvasModel.drawTri(coords[0], coords[1], coords[2], coords[3], coords[4], coords[5], color, bgColor, lineWidth, lineType);
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно заданы координаты</p>`;
                    }
                    break;
                case 'circle':
                    if (coords.length == 2) {
                        let rCircle = parseInt(optionMap.get('r'), 10);
                        if (Number.isInteger(rCircle)) {
                            canvasModel.drawCircle(coords[0], coords[1], rCircle, color, bgColor, lineWidth, lineType);
                        } else {
                            errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно задан радиус</p>`;
                        }
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно заданы координаты</p>`;
                    }
                    break;
                case 'ellipse':
                    if (coords.length == 2) {
                        let r1Ellipse = parseInt(optionMap.get('r1'), 10);
                        let r2Ellipse = parseInt(optionMap.get('r2'), 10)
                        if (Number.isInteger(r1Ellipse) && Number.isInteger(r2Ellipse)) {
                            canvasModel.drawEllipse(coords[0], coords[1], r1Ellipse, r2Ellipse, color, bgColor, lineWidth, lineType);
                        } else {
                            errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно задан радиус</p>`;
                        }
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `<p>${figure} неверно заданы координаты</p>`;
                    }
                    break;
                default:
                    errorText.innerHTML = errorText.innerHTML + `<p>Фигура "${nameFigure}" не определена.</p>`;
            }
        }
    })

    // clear canvas
    allClearBtn.addEventListener('click', () => {
        canvasModel.clear();
        errorText.innerHTML = '';
    })

    // canvas coords observer
    let coordsSpan = document.getElementById('coords');

    canvas.addEventListener('mousemove', (event) => {
        let curX = event.offsetX;
        let curY = event.offsetY;

        coordsSpan.innerHTML = `x: ${curX} y: ${curY}`
    })

    canvas.addEventListener('mouseout', () => {
        coordsSpan.innerHTML = `x:  y: `
    })
})