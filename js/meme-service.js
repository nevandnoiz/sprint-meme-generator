'use strict'

var gNextId = 1;
var gImgs;
var gCanvas;
var gCtx;
var gMeme;
var gFilterOptions = [];
var gMouseClicked = false;
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
        createImage('Bad-Luck-Brian.jpg', ['funny', 'nerd']),
        createImage('Disaster-Girl.jpg', ['funny', 'girl']),
        createImage('Distracted-Boyfriend.jpg', ['funny', 'boyfriend']),
        createImage('Doge.jpg', ['surprised', 'doge']),
        createImage('Evil-Baby.jpg', ['angry', 'baby']),
        createImage('Futurama-Fry.jpg', ['suspicious', 'futurama']),
        createImage('Gangnam-Style-PSY.jpg', ['cool', 'gangnam']),
        createImage('Good-Guy-Putin.jpg', ['funny', 'putin']),
        createImage('disboy.jpg', ['funny', 'girlfriend']),
        createImage('Pissed-Off-Obama.jpg', ['angry', 'obama']),
        createImage('michael-jordan.jpg', ['sad', 'michael jordan']),
        createImage('Third-World-Skeptical-Kid.jpg', ['suspicious', 'baby']),
        createImage('Torreshit.jpg', ['funny', 'soccer']),
        createImage('Y-U-No.jpg', ['angry', 'troll']),
        createImage('sad-cat.jpg', ['sad', 'cat']),
        createImage('Yao-Ming.jpg', ['funny', 'happy']),
        createImage('2.jpg', ['happy', 'nature']),
        createImage('003.jpg', ['angry', 'trump']),
        createImage('004.jpg', ['cute', 'puppys']),
        createImage('005.jpg', ['cute', 'baby']),
        createImage('5.jpg', ['cute', 'baby']),
        createImage('006.jpg', ['tired', 'cat']),
        createImage('8.jpg', ['funny', 'hat']),
        createImage('skelet.jpg', ['tired', 'skeleton']),
        createImage('9.jpg', ['funny', 'baby']),
        createImage('12.jpg', ['funny', 'zadik']),
        createImage('drevil.jpg', ['funny', 'drevil']),
        createImage('img2.jpg', ['happy', 'baby']),
        createImage('img4.jpg', ['funny', 'trump']),
        createImage('img5.jpg', ['funny', 'baby']),
        createImage('img6.jpg', ['funny', 'dog']),
        createImage('memeban.jpg', ['angry', 'jackie chan']),
        createImage('img11.jpg', ['happy', 'obama']),
        createImage('img12.jpg', ['funny', 'sports']),
        createImage('leo.jpg', ['fun', 'leo']),
        createImage('meme1.jpg', ['sad', 'morpheus']),
        createImage('patrick.jpg', ['happy', 'patrick']),
        createImage('putin.jpg', ['funny', 'putin']),
        createImage('Oprah-You-Get-A.jpg', ['happy', 'angry', 'joke']),
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

// function renderTxt(txt) {
//     gCtx.font = `${txt.size}px ${txt.fontFamily}`;
//     gCtx.textAlign = txt.align;
//     gCtx.fillStyle = txt.color;
//     // if (txt.isShadow) addTxtShadow(txt);
//     if (txt.isOutline) editTxtOutline(txt);

//     gCtx.fillText(txt.text, txt.x, txt.y);
//     gMeme.txts[0].textWidth = gCtx.measureText(txt.text).width;
// }

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