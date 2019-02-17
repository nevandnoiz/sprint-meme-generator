'use strict'

var gNextId = 1;
var gImgs;
var gFilterOptions = [];

function createImage(url, keywords) {
    return {
        id: gNextId++,
        url: url,
        keywords: keywords
    }
}

function createImgs() {
    var imgs = [];
    imgs.push(
        createImage('Bad-Luck-Brian.jpg', ['funny']),
        createImage('Disaster-Girl.jpg', ['funny']),
        createImage('Distracted-Boyfriend.jpg', ['funny']),
        createImage('Evil-Baby.jpg', ['angry']),
        createImage('Good-Guy-Putin.jpg', ['funny']),
        createImage('disboy.jpg', ['funny']),
        createImage('Pissed-Off-Obama.jpg', ['angry']),
        createImage('michael-jordan.jpg', ['sad']),
        createImage('Torreshit.jpg', ['funny']),
        createImage('Y-U-No.jpg', ['angry']),
        createImage('sad-cat.jpg', ['sad']),
        createImage('Yao-Ming.jpg', ['funny', 'happy']),
        createImage('2.jpg', ['happy']),
        createImage('003.jpg', ['angry']),
        createImage('004.jpg', ['cute']),
        createImage('005.jpg', ['cute']),
        createImage('5.jpg', ['cute']),
        createImage('006.jpg', ['tired']),
        createImage('8.jpg', ['funny']),
        createImage('skelet.jpg', ['tired']),
        createImage('9.jpg', ['funny']),
        createImage('12.jpg', ['funny']),
        createImage('drevil.jpg', ['funny']),
        createImage('img2.jpg', ['happy']),
        createImage('img4.jpg', ['funny']),
        createImage('Third-World-Skeptical-Kid.jpg', ['suspicious']),
        createImage('img5.jpg', ['funny']),
        createImage('img6.jpg', ['funny']),
        createImage('memeban.jpg', ['angry']),
        createImage('img11.jpg', ['happy']),
        createImage('img12.jpg', ['funny']),
        createImage('leo.jpg', ['fun']),
        createImage('meme1.jpg', ['sad']),
        createImage('patrick.jpg', ['happy']),
        createImage('putin.jpg', ['funny']),
        createImage('Oprah-You-Get-A.jpg', ['happy', 'angry']),
        createImage('One-Does-Not-Simply.jpg', ['fun']),
        createImage('Futurama-Fry.jpg', ['suspicious']),
        createImage('Gangnam-Style-PSY.jpg', ['cool']),
        createImage('Doge.jpg', ['surprised']),
        createImage('Ancient-Aliens.jpg', ['happy']),
        createImage('Batman-Slapping-Robin.jpg', ['happy']),
        createImage('Mocking-Spongebob.jpg', ['happy']),
        createImage('X-Everywhere.jpg', ['sad'])
    )
    return imgs;
}

function createFilterOptions() {
    if (getFromStorage('keywords')) return gFilterOptions = getFromStorage('keywords');
    gImgs.forEach(function (img) {
        var keywords = img.keywords;
        if (keywords.length === 1) {
            var keyword = img.keywords.join();
            if (!gFilterOptions.includes(keyword)) gFilterOptions.push(keyword);
        } else {
            keywords.forEach(function (keyword) {
                if (!gFilterOptions.includes(keyword)) gFilterOptions.push(keyword);
            })
        }
    })
    gFilterOptions.map(function (keyword, idx) {
        gFilterOptions[idx] = { keyword: keyword, popularity: genRandomInt(20, 72) }
    })
    saveToStorage('keywords', gFilterOptions);
}

function filterImages(text) {
    var searchTxt = text.toLowerCase();
    return gImgs.filter((img) => {
        return img.keywords.some(function (keyword) {
            if (keyword.includes(searchTxt)) return true;
        });
    })
}