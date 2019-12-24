
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        Main();
    }
});

let Buttons;
let ButtonActiveColor = '#555'
let ButtonInactiveColor = '#333'
let ButtonA;
let ButtonB;

const Cols = 11;
const Rows = 11;
const TileCount = 100;

const Tile = 
    '11111110'+
    '11111110'+
    '11111110'+
    '11111110'+
    '11111110'+
    '11111110'+
    '11111110'+
    '00000000';

function Main() {

    InitButtons();
    InitGraphics(Cols, Rows, 2);
    PutRandomTiles();
}

function InitButtons() {

    Buttons = document.getElementsByTagName('button');

    for (let button of Buttons) {
        button.style.background = ButtonInactiveColor;

        button.onpointerenter = (event) => {
            button.pressed = true;
            button.style.background = ButtonActiveColor;
        };
        button.onpointerleave = (event) => {
            button.pressed = false;
            button.style.background = ButtonInactiveColor;
        };
    }

    ButtonA = document.getElementById('button-a');
    ButtonB = document.getElementById('button-a');

    setInterval(() => {
        if (ButtonA.pressed) {
            PutRandomTiles();
        }
    }, 10);
}

function log(text) {
    console.log(text);
}

function PutRandomTiles() {
    
    Cls();

    for (var i = 0; i < TileCount; i++) {

        const x = Random(0, Cols);
        const y = Random(0, Rows);
        const color = Random(0, Palette.length);

        DrawTile(x, y, Palette[color], BackColor, Tile);
    }

    //DrawGrid();
}

function Random(min, max) {
    return Math.floor(Math.random() * max) + min;
}
