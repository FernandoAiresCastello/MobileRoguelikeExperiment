
const Cols = 11;
const Rows = 11;
const SmileyCount = 100;

const Smiley = 
    '01111110'+
    '11111111'+
    '11011011'+
    '11111111'+
    '11111111'+
    '11011011'+
    '11100111'+
    '01111110';

document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        main();
    }
});

function random(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function main() {

    InitGraphics(Cols, Rows, 2);
    putRandomSmileys();

    let button = document.getElementById('star');
    button.addEventListener('click', () => {
        putRandomSmileys();
    });
}

function putRandomSmileys() {
    
    Cls();

    for (var i = 0; i < SmileyCount; i++) {

        const x = random(0, Cols);
        const y = random(0, Rows);
        const color = random(0, Palette.length);

        DrawTile(x, y, Palette[color], BackColor, Smiley);
    }

    //DrawGrid();
}
