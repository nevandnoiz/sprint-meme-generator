'use strict'

var gCanvas;
var gCtx;
var gMeme;
var gMouseClicked = false;
var gPrevPos = {};
var gCurrTxtIdx;
var gRenderIntrvl;

function createMeme(imgId) {
    return {
        selectedImgId: imgId,
        txts: []
    };
}

function createMemeTxt(text, x, y) {
    return {
        text: text,
        size: 40,
        textWidth: '',
        isSelected: false,
        color: '#ffffff',
        fontFamily: 'Impact',
        isOutline: true,
        lineWidth: 3,
        strokeStyle: '#000000',
        x: x,
        y: y
    }
}

function drawCanvas(imgId) {
    gCanvas = document.querySelector('.meme-canvas');
    gCtx = gCanvas.getContext('2d');
    var elImg = document.querySelector(`img[data-id='${imgId}']`)
    var aspectRatio = elImg.height / elImg.width;
    gCanvas.height = 600 * aspectRatio;
    gCtx.drawImage(elImg, 0, 0, 600, 600 * aspectRatio);
}

function drawTxt() {
    gMeme.txts.forEach(function (txt) {
        gCtx.font = `${txt.size}px ${txt.fontFamily}`;
        gCtx.fillStyle = txt.color;
        gCtx.textAlign = 'center';
        if (txt.isOutline) editTxtOutline(txt);
        gCtx.fillText(txt.text, txt.x, txt.y);
        txt.textWidth = gCtx.measureText(txt.text).width;
    });
}

function editMemeText(text) {
    gMeme.txts[gCurrTxtIdx].text = text;
}

function editTextFont(font) {
    gMeme.txts[gCurrTxtIdx].fontFamily = font;
}

function editTextColor(color) {
    gMeme.txts[gCurrTxtIdx].color = color;
}

function editOutlineColor(color) {
    gMeme.txts[gCurrTxtIdx].strokeStyle = color;
}

function editTxtOutline(txt) {
    gCtx.strokeStyle = txt.strokeStyle;
    gCtx.lineWidth = txt.lineWidth;
    gCtx.strokeText(txt.text, txt.x, txt.y);
}

function editTextAlign(alignment) {
    if (alignment === 'left') gMeme.txts[gCurrTxtIdx].x = 110;
    else if (alignment === 'right') gMeme.txts[gCurrTxtIdx].x = 490;
    else if (alignment === 'center') gMeme.txts[gCurrTxtIdx].x = 300;
    // gMeme.txts[gCurrTxtIdx].align = alignment;
}

function deleteTxt(txtIdx) {
    gMeme.txts.splice(txtIdx, 1);
    if (gCurrTxtIdx > 0) gCurrTxtIdx--;
}

function editTextFontSize(size) {
    gMeme.txts[gCurrTxtIdx].size = size;
}

function moveTextPos(direction) {
    var increment = 10;
    if (direction === 'up') {
        if (gMeme.txts[gCurrTxtIdx].y===gMeme.txts[gCurrTxtIdx].size) return;
        gMeme.txts[gCurrTxtIdx].y -= increment;
    }
    else if (direction === 'down') {
        if (gMeme.txts[gCurrTxtIdx].y===gCanvas.height) return;
        gMeme.txts[gCurrTxtIdx].y += increment;
    }
    else if (direction === 'left') {
        if (gMeme.txts[gCurrTxtIdx].x<gMeme.txts[gCurrTxtIdx].textWidth/2) return;
        gMeme.txts[gCurrTxtIdx].x -= increment;
    }
    else if (direction === 'right') {
        if (gMeme.txts[gCurrTxtIdx].x>gCanvas.width-gMeme.txts[gCurrTxtIdx].textWidth/2) return;
        gMeme.txts[gCurrTxtIdx].x += increment;
    }
}

function editOutlineWidth(width) {
    gMeme.txts[gCurrTxtIdx].lineWidth = width;
}

function toggleOutline() {
    gMeme.txts[gCurrTxtIdx].isOutline = !gMeme.txts[gCurrTxtIdx].isOutline;
}

function addTxtLine(pos) {
    var text = 'Your Text';
    var x = 300;
    var y;
    if (pos === 'top') y = 70;
    else if (pos === 'middle') y = gCanvas.height / 2 + 40;
    else if (pos === 'bottom') y = gCanvas.height - 70 + 40;
    var txtObj = createMemeTxt(text, x, y);
    gMeme.txts.push(txtObj);
}

function txtClicked(ev) {
    var res = gMeme.txts.findIndex(function (txt) {
        return (
            ev.offsetX >= txt.x - txt.textWidth &&
            ev.offsetX <= txt.x + txt.textWidth &&
            ev.offsetY <= txt.y + 50 &&
            ev.offsetY >= txt.y - txt.size - 50
        )
    })
    if (res >= 0) {
        gMeme.txts[gCurrTxtIdx].isSelected = false;
        gCurrTxtIdx = res;
        gMeme.txts[gCurrTxtIdx].isSelected = true;
        return true;
    } else {
        gMeme.txts[gCurrTxtIdx].isSelected = false;
        return false;
    }
}

function createDownloadLink(elLink) {
    elLink.href = gCanvas.toDataURL();
}