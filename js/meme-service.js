
var gNextId = 1;
var gImgs;
var gCtx;
var gMeme;
var gFilterOptions = [];
var gMouseClicked = false;
var gPrevPos;



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
        createImage('2.jpg', ['happy', 'nature']),
        createImage('003.jpg', ['angry', 'trump']),
        createImage('004.jpg', ['cute', 'puppys']),
        createImage('005.jpg', ['cute', 'baby']),
        createImage('5.jpg', ['cute', 'baby']),
        createImage('006.jpg', ['tired', 'cat']),
        createImage('8.jpg', ['funny', 'hat']),
        createImage('9.jpg', ['funny', 'baby']),
        createImage('12.jpg', ['funny', 'zadik']),
        // createImage('19.jpg', ['angry']),
        createImage('drevil.jpg', ['funny', 'drevil']),
        createImage('img2.jpg', ['happy', 'baby']),
        createImage('img4.jpg', ['funny', 'trump']),
        createImage('img5.jpg', ['funny', 'baby']),
        createImage('img6.jpg', ['funny', 'dog']),
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
        txts: [
            createMemeTxt('Your Text', 235, 70),
            // createMemeTxt('Your Text', 235, 450)
        ]
    };
}

function createMemeTxt(text, x, y) {
    return {
        text: text,
        size: 40,
        textWidth: '',
        align: 'left',
        color: '#ffffff',
        fontFamily: 'Impact',
        isOutline: true,
        lineWidth: 3,
        strokeStyle: '#000000',
        isShadow: false,
        shadowColor: '#000000',
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 0,
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

function createCanvas(imgId) {
    var canvas = document.querySelector('.meme-canvas');
    gCtx = canvas.getContext('2d');
    var elImg = document.querySelector(`img[data-id='${imgId}']`)
    var aspectRatio = elImg.height / elImg.width;
    // canvas.width = elImg.width;
    canvas.height = 600 * aspectRatio;
    drawCanvas(elImg);
}

function drawCanvas(img) {
    var aspectRatio = img.height / img.width;
    gCtx.drawImage(img, 0, 0, 600, 600 * aspectRatio);

    gMeme.txts.forEach(function (txt) {
        renderTxt(txt);
    });
}

function filterImages(searchTxt) {
    return gImgs.filter((img) => {
        return img.keywords.some(function (keyword) {
            if (keyword.includes(searchTxt)) return true;
        });
    })
}

function editMemeTxt(txt) {
    gMeme.txts[0].text = txt;
}

function editTextFont(font) {
    gMeme.txts[0].fontFamily = font;
}

function editTextColor(color) {
    gMeme.txts[0].color = color;
}

function editOutlineColor(color) {
    gMeme.txts[0].strokeStyle = color;
}

function editTxtOutline(txt) {
    gCtx.strokeStyle = txt.strokeStyle;
    gCtx.lineWidth = txt.lineWidth;
    gCtx.strokeText(txt.text, txt.x, txt.y);
}

function editTextAlign(alignment) {
    if (alignment === 'left') gMeme.txts[0].x = 50;
    else if (alignment === 'right') gMeme.txts[0].x = 400;
    else if (alignment === 'center') gMeme.txts[0].x = 235;
}

function deleteTxt(txtIdx) {
    gMeme.txts.splice(txtIdx, 1); //arr.splice(start, deleteCount)
    // renderTxtsEditor();
}

function editTextFontSize(size) {
    gMeme.txts[0].size = size;
}

function editOutlineWidth(width) {
    gMeme.txts[0].lineWidth = width;
}

function TouggleOutline() {
    gMeme.txts[0].isOutline = !gMeme.txts[0].isOutline;
}

function canvasClicked(ev){
    return gMeme.txts.find(function (txt){
        return (
            ev.offsetX >= txt.x &&
            ev.offsetX <= txt.x+txt.textWidth &&
            ev.offsetY <= txt.y &&
            ev.offsetY >= txt.y-txt.size
        )
    })
}

