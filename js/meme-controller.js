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
    document.querySelector('.meme-editor').classList.toggle('hidden');
    document.querySelector('.img-gallery').classList.toggle('hidden');
}


function drawCanvas(img) {
    gCtx.drawImage(img, 0, 0);

    // gMeme.txts.forEach(function (txt) {
    //     drawTxt(txt);
    // });

}