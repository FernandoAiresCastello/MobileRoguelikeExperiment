
let Canvas;
let CanvasElement;
let ScreenWidth;
let ScreenHeight;
let ScreenZoom;
let ScreenCols;
let ScreenRows;
let CanvasWidth;
let CanvasHeight;
let GridTileWidth;
let GridTileHeight;
let TilePxWidth;
let TilePxHeight;

let BackColor = '#fff';
let BorderColor = '#000';
let GridColor = '#000';

const GridStyle = [4];
const TilePxCountX = 8;
const TilePxCountY = 8;
const TilePxCount = TilePxCountX * TilePxCountY;

const Palette = [
    '#000000','#000055','#0000aa','#0000ff','#550000','#550055','#5500aa','#5500ff',
    '#aa0000','#aa0055','#aa00aa','#aa00ff','#ff0000','#ff0055','#ff00aa','#ff00ff',
    '#005500','#005555','#0055aa','#0055ff','#555500','#555555','#5555aa','#5555ff',
    '#aa5500','#aa5555','#aa55aa','#aa55ff','#ff5500','#ff5555','#ff55aa','#ff55ff',
    '#00aa00','#00aa55','#00aaaa','#00aaff','#55aa00','#55aa55','#55aaaa','#55aaff',
    '#aaaa00','#aaaa55','#aaaaaa','#aaaaff','#ffaa00','#ffaa55','#ffaaaa','#ffaaff',
    '#00ff00','#00ff55','#00ffaa','#00ffff','#55ff00','#55ff55','#55ffaa','#55ffff',
    '#aaff00','#aaff55','#aaffaa','#aaffff','#ffff00','#ffff55','#ffffaa','#ffffff'
];

function InitGraphics(cols, rows, zoom) {
    
    document.body.style.backgroundColor = BorderColor;
    CanvasElement = document.getElementById('canvas');
    Canvas = CanvasElement.getContext('2d');
    
    ScreenWidth = CanvasElement.width;
    ScreenHeight = CanvasElement.height;

    ScreenCols = cols;
    ScreenRows = rows;

    ScreenZoom = zoom;

    CanvasWidth = ScreenZoom * ScreenWidth;
    CanvasHeight = ScreenZoom * ScreenHeight;
    GridTileWidth = CanvasWidth / ScreenCols;
    GridTileHeight = CanvasHeight / ScreenRows;
    TilePxWidth = GridTileWidth / TilePxCountX;
    TilePxHeight = GridTileHeight / TilePxCountY;

    CanvasElement.width = CanvasWidth;
    CanvasElement.height = CanvasHeight;

    Canvas.imageSmoothingEnabled = false;

    Cls();
}

function Cls() {
    Canvas.fillStyle = BackColor;
    Canvas.fillRect(0, 0, CanvasWidth, CanvasHeight);
}

function DrawGrid() {
    Canvas.strokeStyle = GridColor;
    Canvas.lineWidth = 0.1;
    Canvas.beginPath();

    for (let x = 0, y = 0; x < CanvasWidth; x += GridTileWidth) {
        Canvas.moveTo(x, y);
        Canvas.lineTo(x, y + CanvasHeight);
    }

    for (let x = 0, y = 0; y < CanvasHeight; y += GridTileHeight) {
        Canvas.moveTo(x, y);
        Canvas.lineTo(x + CanvasWidth, y);
    }

    Canvas.stroke();
}

function FillGridTile(x, y, color) {
    Canvas.strokeStyle = '';
    Canvas.fillStyle = color;
    Canvas.fillRect(x * GridTileWidth, y * GridTileHeight, GridTileWidth, GridTileHeight);
}

function DrawPixel(x, y, color) {
    Canvas.strokeStyle = '';
    Canvas.fillStyle = color;
    Canvas.fillRect(x * TilePxWidth, y * TilePxHeight, TilePxWidth + 1, TilePxHeight + 1);
}

function DrawTile(x, y, fgc, bgc, pixels) {
    x *= TilePxCountX;
    y *= TilePxCountY;
    let px = x;
    let py = y;
    for (let i = 0; i < TilePxCount; i++) {
        DrawPixel(px, py, (pixels[i] == '1') ? fgc : (pixels[i] == '0') ? bgc : null);
        if (++px >= x + TilePxCountX) {
            px = x;
            py++;
        }
    }
}
