'use strict'

function init() {
    gImgs = createImgs();
    renderImgs();
}

function renderImgs() {
    var strHtml = '';
    gImgs.forEach(function (img) {
        strHtml += `
        <img id='${img.id}' src='img/${img.url}' onclick="initMemeEditor(${img.id},this)" alt='meme picture'/>
        `
    })
    console.log(strHtml);
    document.querySelector('.img-gallery').innerHTML = strHtml;
}