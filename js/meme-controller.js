'use strict'

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

function onFiterImages(searchTxt) {
    let fltrdImgs = filterImages(searchTxt);
    // if (searchTxt === '') return renderImgs(gImgs);
    // if (fltrdImgs.length>0) 
    renderImgs(fltrdImgs);
}

function initMemeEditor(imgId) {
    toggleView();
    gMeme = createMeme(imgId);
    createCanvas(imgId);
    // renderTxtsEditor();
}

function onInputText(txt) {
    editMemeTxt(txt);
    createCanvas(gMeme.selectedImgId);
}

function onChangeColor(color) {
    editTextColor(color)
    createCanvas(gMeme.selectedImgId);
}

function onChangeOutlineColor(color) {
    editOutlineColor(color)
    createCanvas(gMeme.selectedImgId);
}

function onTextAlign(elAlignment) {
    let alignment = elAlignment.value;
    editTextAlign(alignment);
    createCanvas(gMeme.selectedImgId);
}

function onDelete() {
    deleteTxt(0);
    document.querySelector('.text-editor').classList.toggle('hidden');
    createCanvas(gMeme.selectedImgId);
}

function renderTxt(txt) {
    gCtx.font = `${txt.size}px ${txt.fontFamily}`;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    // if (txt.isShadow) addTxtShadow(txt);
    if (txt.isOutline) editTxtOutline(txt);

    gCtx.fillText(txt.text, txt.x, txt.y);
    gMeme.txts[0].textWidth = gCtx.measureText(txt.text).width;
}

function onChangeFont(font) {
    editTextFont(font);
    createCanvas(gMeme.selectedImgId);
}

function onChangeFontSize(size) {
    editTextFontSize(size);
    createCanvas(gMeme.selectedImgId);
    document.querySelector('.font-size-range span').innerText = size;
}

function onChangeOutlineWidth(width) {
    editOutlineWidth(width);
    createCanvas(gMeme.selectedImgId);
}

function onToggleOutline() {
    TouggleOutline()
    createCanvas(gMeme.selectedImgId);
}

function onCanvasClicked(ev) {
    canvasClicked(ev);
}

function toggleView() {
    document.querySelector('.meme-editor-container').classList.toggle('hidden');
    document.querySelector('.gallery-container').classList.toggle('hidden');
}

function onMouseDownUp() {
    gMouseClicked = !gMouseClicked;
    // console.log(gMouseClicked)
}

function onMouseMove(ev) {
    if (!gMouseClicked) return;
    var x = ev.offsetX;
    var y = ev.offsetY;
    // console.log(canvasClicked(ev))
    if (!canvasClicked(ev)) return;
    dragText(x, y)
    createCanvas(gMeme.selectedImgId);
}

function dragText(x, y) {
    var dx=x-gMeme.txts[0].x
    var dy=y-gMeme.txts[0].y
    gMeme.txts[0].x += dx;
    gMeme.txts[0].y += dy;
}
