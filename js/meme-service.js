'use strict'

var gNextId = 1;
var gImgs;
var gCanvas;
var gCtx;
var gMeme;
var gFilterOptions = [];
var gMouseClicked = false;
var gPrevPos = {};
var gCurrTxtIdx;

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
        createImage('Doge.jpg', ['surprised']),
        createImage('Evil-Baby.jpg', ['angry']),
        createImage('Futurama-Fry.jpg', ['suspicious']),
        createImage('Gangnam-Style-PSY.jpg', ['cool']),
        createImage('Good-Guy-Putin.jpg', ['funny']),
        createImage('disboy.jpg', ['funny']),
        createImage('Pissed-Off-Obama.jpg', ['angry']),
        createImage('michael-jordan.jpg', ['sad']),
        createImage('Third-World-Skeptical-Kid.jpg', ['suspicious']),
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
        createImage('Ancient-Aliens.jpg', ['happy']),
        createImage('Batman-Slapping-Robin.jpg', ['happy']),
        createImage('Mocking-Spongebob.jpg', ['happy']),
        createImage('X-Everywhere.jpg', ['sad'])
    )
    return imgs;
}

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

function createFilterOptions() {
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
        gFilterOptions[idx] = { keyword: keyword, popularity: genRandomInt(20,72) }
    })
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
        if (txt.isOutline) editTxtOutline(txt);
        gCtx.fillText(txt.text, txt.x, txt.y);
        txt.textWidth = gCtx.measureText(txt.text).width;
    });
}

function filterImages(text) {
    var searchTxt = text.toLowerCase();
    return gImgs.filter((img) => {
        return img.keywords.some(function (keyword) {
            if (keyword.includes(searchTxt)) return true;
        });
    })
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
    if (alignment === 'left') gMeme.txts[gCurrTxtIdx].x = 50;
    else if (alignment === 'right') gMeme.txts[gCurrTxtIdx].x = 400;
    else if (alignment === 'center') gMeme.txts[gCurrTxtIdx].x = 235;
    // gMeme.txts[gCurrTxtIdx].align = alignment;
}

function deleteTxt(txtIdx) {
    gMeme.txts.splice(txtIdx, 1);
    if (gCurrTxtIdx > 0) gCurrTxtIdx--;
}

function editTextFontSize(size) {
    gMeme.txts[gCurrTxtIdx].size = size;
}

function moveTextUpDown(y) {
    gMeme.txts[gCurrTxtIdx].y = y;
}

function editOutlineWidth(width) {
    gMeme.txts[gCurrTxtIdx].lineWidth = width;
}

function toggleOutline() {
    gMeme.txts[gCurrTxtIdx].isOutline = !gMeme.txts[gCurrTxtIdx].isOutline;
}

function addTxtLine(pos) {
    var text = 'Your Text';
    var x = 235;
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
            ev.offsetX >= txt.x &&
            ev.offsetX <= txt.x + txt.textWidth &&
            ev.offsetY <= txt.y &&
            ev.offsetY >= txt.y - txt.size
        )
    })
    // console.log(ev.offsetY);
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