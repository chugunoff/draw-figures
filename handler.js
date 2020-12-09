document.addEventListener('DOMContentLoaded', (event) => {
    let allDrawBtn = document.getElementById('all-draw-btn');
    let allClearBtn = document.getElementById('all-clear-btn');

    let inTextArea = document.getElementById('text-area');
    let errorText = document.getElementById('error');

    var canvas = document.getElementById('my-canvas');
    var ctx = canvas.getContext('2d');

    if (inTextArea.innerHTML.length == 0) {
        inTextArea.innerHTML = `line -p [10, 50] [100,25] -c rgb(255, 0, 0)
rectangle -p [100, 100] [50, 50] -c rgb(0, 255, 0) -b rgba(255, 0, 0, 0.3)
triangle -p [300, 300] [340, 340] [560, 200] -c rgb(0, 0, 255) -b rgba(255, 0, 0, 0.3)
circle -p [75, 75] -r 25 -c rgba(255, 0, 0, 0.8) -b rgba(0, 255, 0, 0.3)
ellipse -p [75, 75] -r1 50 -r2 25 -c rgb(0, 255, 0) -b rgba(255, 0, 0, 0.3)`
    }

    canvasModel = new Canvas(ctx, canvas.width, canvas.height);

    allDrawBtn.addEventListener('click', () => {
        // clear error div
        errorText.innerHTML = '';

        let inData = inTextArea.value;
        let figures = inData.split('\n');
        // console.log('Figures:');
        // console.log(figures);

        // перебираем фигуры
        for (let figure of figures) {
            let options = figure.trim().split(/ +-/);
            let nameFigure = options.shift();
            console.log(nameFigure);

            let optionMap = new Map();

            // перебираем опции
            for (let option of options) {
                nameOption = option.slice(0, option.indexOf(' '));
                valueOption = option.slice(nameOption.length + 1);
                if (nameOption == 'p') {
                    valueOption = valueOption.replace(/\s+/g, '');
                }
                optionMap.set(nameOption, valueOption);
            }

            // координаты
            let coordsStr = optionMap.get('p');
            let coords = coordsStr.match(/\d+/g);

            console.log(`Кол-во координат: ${coords.length}`)
            for (const coord of coords) {
                console.log(coord);
            }

            switch (nameFigure) {
                case 'line':
                    if (coords.length == 4) {
                        canvasModel.drawLine(coords[0], coords[1], coords[2], coords[3]);
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `${figure} неверно заданы координаты\n`;
                    }
                    break;
                case 'rectangle':
                    if (coords.length == 4) {
                        let width = coords[2] - coords[0];
                        let height = coords[3] - coords[1];
                        console.log(width + ' ' + height)
                        canvasModel.drawRect(coords[0], coords[1], width, height);
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `${figure} неверно заданы координаты\n`;
                    }
                    break;
                case 'triangle':
                    if (coords.length == 6) {
                        canvasModel.drawTri(coords[0], coords[1], coords[2], coords[3], coords[4], coords[5]);
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `${figure} неверно заданы координаты\n`;
                    }
                    break;
                case 'circle':
                    if (coords.length == 2) {
                        let rCircle = parseInt(optionMap.get('r'), 10);
                        if (Number.isInteger(rCircle)) {
                            canvasModel.drawCircle(coords[0], coords[1], rCircle);
                        } else {
                            errorText.innerHTML = errorText.innerHTML + `${figure} неверно задан радиус\n`;
                        } 
                    } else {
                        errorText.innerHTML = errorText.innerHTML + `${figure} неверно заданы координаты\n`;
                    }
                    break;
                case 'ellipse':
                    break;
                default:
                    console.log(`Фигура ${nameFigure} не определена.`);
            }
        }
        console.log(NaN)
    })

    allClearBtn.addEventListener('click', () => {
        canvasModel.clear();
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