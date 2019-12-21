
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
const SmileyCount = 100;

const Smiley = 
    '01111100'+
    '11111010'+
    '11111110'+
    '11111010'+
    '11111010'+
    '11110110'+
    '01111100'+
    '00000000';

function Main() {

    InitButtons();
    InitGraphics(Cols, Rows, 2);
    PutRandomSmileys();
    Print('This is a test...');
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
            PutRandomSmileys();
        }
    }, 10);
}

function log(text) {
    console.log(text);
}

function Print(text) {
    const TextArea = document.getElementById('scrolling-text');
    TextArea.innerText = text;
}

function PutRandomSmileys() {
    
    Cls();

    for (var i = 0; i < SmileyCount; i++) {

        const x = Random(0, Cols);
        const y = Random(0, Rows);
        const color = Random(0, Palette.length);

        DrawTile(x, y, Palette[color], BackColor, Smiley);
    }

    //DrawGrid();
}

function Random(min, max) {
    return Math.floor(Math.random() * max) + min;
}
