
var gNextId = 1;
var gImgs;
var gCtx;
var gMeme;



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
        createImage('Oprah-You-Get-A.jpg', ['happy']),
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
        txts: [createTxtEditor('Your Text', 150, 70), createTxtEditor('Your Text', 150, 300)]
    };
}

function createTxtEditor(line, x, y) {
    return {
        line: line,
        size: 40,
        align: 'left',
        color: '#000000', // in color picker, if choosing color from platte notice it stays "solid".
        fontFamily: 'Impact',
        isOutline: true,
        lineWidth: 2, // outline width
        strokeStyle: '#ffffff',
        isShadow: false,
        shadowColor: '#000000',
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 0,
        x: x,
        y: y
    };
}

function createCanvas(imgId) {
    var canvas = document.querySelector('.meme-canvas');
    gCtx = canvas.getContext('2d');

    var elImg=document.querySelector(`img[data-id='${imgId}']`)

    // elImg.onload = function () {
        canvas.width = elImg.width;
        canvas.height = elImg.height;
        // gMeme.txts[1].y = elImg.height - 70;

    // };
    drawCanvas(elImg);
}

function drawCanvas(img) {
    gCtx.drawImage(img, 0, 0);

    // gMeme.txts.forEach(function (txt) {
    //     drawTxt(txt);
    // });

}