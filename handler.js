document.addEventListener('DOMContentLoaded', (event) => {
    let allDrawBtn = document.getElementById('all-draw-btn');
    let inTextArea = document.getElementById('text-area');

    allDrawBtn.addEventListener('click', () => {
        let inData = inTextArea.value;
        let figures = inData.split('\n');
        // console.log('Figures:');
        // console.log(figures);

        // перебираем фигуры
        for (let figure of figures) {
            let options = figure.split(/ +-/);
            let nameFigure = options.shift();
            console.log(nameFigure);

            // опции
            for (let option of options) {
                nameOption = option.slice(0, option.indexOf(' '));
                valueOption = option.slice(nameOption.length + 1);
                console.log(nameOption);
                console.log(valueOption);
                
            }
        }
    })
})