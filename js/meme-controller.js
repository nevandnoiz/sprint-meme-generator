'use strict'

function init() {
    gImgs = createImgs();
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

function initMemeEditor(imgId) {
    toggleView();
    gMeme = createMeme(imgId);
    createCanvas(imgId);
    // renderTxtsEditor();
}

function toggleView() {
    document.querySelector('.meme-editor-container').classList.toggle('hidden');
    document.querySelector('.gallery-container').classList.toggle('hidden');
}

function onFiterImages(value) {
    let fltrdImgs = filterImages(value);
    renderImgs(fltrdImgs);
}