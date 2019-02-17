'use strict'

var startX;
var startY;

function init() {
    gImgs = createImgs();
    createFilterOptions();
    renderFilterOptions();
    renderImgs(gImgs);
}

function renderImgs(imgs) {
    var strHtml = '';
    imgs.forEach(function (img) {
        strHtml += `
        <img data-id='${img.id}' src='img/${img.url}' onclick="initMemeEditor(${img.id},this)" alt='meme picture'/>
        `
    })
    document.querySelector('.img-gallery').innerHTML = strHtml;
}

function renderFilterOptions() {
    var strHtml = '';
    gFilterOptions.forEach(function (filterOption) {
        strHtml += `
        <option value="${filterOption}">${filterOption}</option>
        `
    })
    document.querySelector('#filter-options').innerHTML = strHtml;
}

function onFiterImages(text) {
    var fltrdImgs = filterImages(text);
    renderImgs(fltrdImgs);
}

function initMemeEditor(imgId) {
    gMeme = createMeme(imgId);
    gCurrTxtIdx = 0;
    toggleView('.meme-editor-container');
    toggleView('.gallery-container');
    drawCanvas(imgId);
    addTxtLine('top');
    addTxtLine('bottom');
    drawTxt();
    renderTxtEditor();
}

function renderTxtEditor() {
    var txtObj = gMeme.txts[gCurrTxtIdx];
    var strHtml =
        `
        <button class="add-txt-btn" onclick="onAddTxt()">
        + Add New Text
    </button>
    <input type="text" placeholder="Your Text" oninput="onInputText(value)" value="${txtObj.text}">
    <select class="change-font" onchange="onChangeFont(value)">
    <option value="Impact">Impact</option>
    <option value="Arial Black">Arial Black</option>
    <option value="Tahoma">Tahoma</option>
    <option value="Comic Sans MS">Comic Sans MS</option>
    </select>
    <input type="color" oninput="onChangeColor(value)" value="${txtObj.color}">
    <div class="change-font-size">
    <input oninput="onChangeFontSize(value)" type="range" value="${txtObj.size}" min="1" max="120">
    <span>${txtObj.size}</span>
    </div>
    <div class="text-aligning">
    <button value="left" onclick="onTextAlign(this)">L</button>
    <button value="center" onclick="onTextAlign(this)">C</button>
    <button value="right" onclick="onTextAlign(this)">R</button>
    </div>
    <input onchange="onTextUpDown(value)" type="number" value="${txtObj.y}" min="0" max="${gCanvas.height}">
    <input id="outline" type="checkbox" onclick="onToggleOutline()">
    <label for="outline">Outline</label>
    Width: <input type="number" value="${txtObj.lineWidth}" min="1" step="1" max="12"
    onclick="onChangeOutlineWidth(value)">
    <input type="color" value="${txtObj.strokeStyle}" onchange="onChangeOutlineColor(value)">
    <button onclick="onDeleteTxt()">X Delete Text</button>
    `
    document.querySelector('.text-editor').innerHTML = strHtml;
    document.querySelector(`.change-font option[value=${txtObj.fontFamily}]`).selected = true;
    document.querySelector('#outline').checked = txtObj.isOutline;
}

function onInputText(text) {
    editMemeText(text);
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function onChangeColor(color) {
    editTextColor(color)
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function onChangeOutlineColor(color) {
    editOutlineColor(color)
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function onTextAlign(elAlignment) {
    var alignment = elAlignment.value;
    editTextAlign(alignment);
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function onDeleteTxt() {
    if (gMeme.txts.length < 2) return;
    toggleView('.confirm-modal');
}

function onConfirmDelete() {
    deleteTxt(gCurrTxtIdx);
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
    renderTxtEditor()
    toggleView('.confirm-modal');
}


function onChangeFont(font) {
    editTextFont(font);
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function onChangeFontSize(size) {
    editTextFontSize(size);
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
    document.querySelector('.change-font-size span').innerText = size;
}

function onTextUpDown(y) {
    moveTextUpDown(y);
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function onChangeOutlineWidth(width) {
    editOutlineWidth(width);
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}


function onToggleOutline() {
    toggleOutline()
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function onAddTxt() {
    addTxtLine('middle');
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function onCanvasClicked(ev) {
    if (txtClicked(ev)) {
        renderTxtEditor();
        drawCanvas(gMeme.selectedImgId);
        drawTxt();
    } else {
        drawCanvas(gMeme.selectedImgId);
        drawTxt();
    }
}

function onMouseDownUp(ev) {
    startX = ev.offsetX;
    console.log(startX)
    startY = ev.offsetY;
    gMouseClicked = !gMouseClicked;
}

function onMouseMove(ev) {
    if (!gMouseClicked) return;
    if (!txtClicked(ev)) return;
    ev.preventDefault();
    var mouseX = ev.offsetX;
    console.log(mouseX)
    var mouseY = ev.offsetY;
    dragText(mouseX, mouseY)
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function dragText(x, y) {
    // Put your mousemove stuff here
    var dx = x - startX;
    console.log(dx);
    var dy = y - startY;
    startX = x;
    startY = y;
    gMeme.txts[gCurrTxtIdx].x += dx;
    gMeme.txts[gCurrTxtIdx].y += dy;
}

function onDiscardMeme() {
    toggleView('.meme-editor-container');
    toggleView('.gallery-container');
}

function onClickDownload(elLink) {
    createDownloadLink(elLink);
    var currImg = gImgs.find((img) => img.id===gMeme.selectedImgId);
    elLink.download = currImg.url;
}