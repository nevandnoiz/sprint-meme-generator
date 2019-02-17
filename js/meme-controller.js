'use strict'

function initMemeEditor(imgId) {
    gMeme = createMeme(imgId);
    gCurrTxtIdx = 0;
    toggleView('.meme-editor-container');
    toggleView('.gallery-container');
    toggleView('.search-filter-input');
    toggleView('.header-button');
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
    <div class="move-text-pos">
        <button onclick="onMoveTextPos('up')">↑</button>
        <button onclick="onMoveTextPos('down')">↓</button>
        <button onclick="onMoveTextPos('left')">←</button>
        <button onclick="onMoveTextPos('right')">→</button>
    </div>
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
    deleteTxt(gCurrTxtIdx);
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
    renderTxtEditor()
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

function onMoveTextPos(direction) {
    moveTextPos(direction);
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

function onMouseDownUp() {
    gMouseClicked = !gMouseClicked;
    gPrevPos = {};
}

function onMouseOut() {
    if (!gMouseClicked) return;
    gMouseClicked = !gMouseClicked;
}

function onMouseMove(ev) {
    if (!gMouseClicked) return;
    if (!txtClicked(ev)) return;
    var x = Math.floor(ev.offsetX);
    var y = Math.floor(ev.offsetY);
    dragText(x, y)
    drawCanvas(gMeme.selectedImgId);
    drawTxt();
}

function dragText(x, y) {
    if (!gPrevPos.x) gPrevPos.x = x;
    if (!gPrevPos.y) gPrevPos.y = y;
    gMeme.txts[gCurrTxtIdx].x += x - gPrevPos.x;
    gMeme.txts[gCurrTxtIdx].y += y - gPrevPos.y;
    gPrevPos.x = x;
    gPrevPos.y = y;
}

function onBackToGallery() {
    toggleView('.meme-editor-container');
    toggleView('.gallery-container');
    toggleView('.search-filter-input');
    toggleView('.header-button');
}

function onClickDownload(elLink) {
    createDownloadLink(elLink);
    var currImg = gImgs.find((img) => img.id === gMeme.selectedImgId);
    elLink.download = currImg.url;
}