'use strict'

function init() {
    gImgs = createImgs();
    createFilterOptions();
    renderSearchOptions();
    renderFilterOptions()
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

function renderSearchOptions() {
    var strHtml = '';
    gFilterOptions.forEach(function (filterOption) {
        strHtml += `
        <option value="${filterOption.keyword}">${filterOption.keyword}</option>
        `
    })
    document.querySelector('#search-options').innerHTML = strHtml;
}

function renderFilterOptions() {
    var strHtml = '';
    var lessOptionsList = gFilterOptions.slice(0, 5);
    lessOptionsList.forEach(function (filterOption, idx) {
        strHtml += `
        <a style="font-size:${filterOption.popularity}px" 
        onclick="onClickFilter('${filterOption.keyword}',${idx})">${filterOption.keyword}</a>
        `
    })
    document.querySelector('.filter-options').innerHTML = strHtml;
}

function onClickFilter(searchTxt, idx) {
    if (gFilterOptions[idx].popularity < 140){
        gFilterOptions[idx].popularity += 2;
    } 
    saveToStorage('keywords', gFilterOptions);
    document.querySelector('.search-filter-input').value = searchTxt;
    onFiterImages(searchTxt);
    renderFilterOptions();
}

function onFiterImages(text) {
    var fltrdImgs = filterImages(text);
    renderImgs(fltrdImgs);
}