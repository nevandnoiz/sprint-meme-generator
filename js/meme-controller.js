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
    // console.log(txt);
    editMemeTxt(txt);
    createCanvas(gMeme.selectedImgId);
}

function renderTxt(txt) {
    ///console.log(txt);
    gCtx.font = `${txt.size}px ${txt.fontFamily}`;
    gCtx.textAlign = txt.align;
    gCtx.fillStyle = txt.color;
    // if (txt.isShadow) addTxtShadow(txt);
    // if (txt.isOutline) addTxtOutline(txt);

    gCtx.fillText(txt.text, txt.x, txt.y);
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

function toggleView() {
    document.querySelector('.meme-editor-container').classList.toggle('hidden');
    document.querySelector('.gallery-container').classList.toggle('hidden');
}
