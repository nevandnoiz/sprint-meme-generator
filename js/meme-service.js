
var gNextId = 1;
var gImgs;
var gCtx;
var gMeme;
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
        createImage('2.jpg', ['happy', 'nature']),
        createImage('003.jpg', ['angry', 'trump']),
        createImage('004.jpg', ['cute', 'puppys']),
        createImage('005.jpg', ['cute', 'baby']),
        createImage('5.jpg', ['cute', 'baby']),
        createImage('006.jpg', ['tired', 'cat']),
        createImage('8.jpg', ['funny', 'hat']),
        createImage('9.jpg', ['funny', 'baby']),
        createImage('12.jpg', ['funny', 'zadik']),
        createImage('19.jpg', ['angry']),
        createImage('drevil.jpg', ['funny', 'drevil']),
        createImage('img2.jpg', ['happy', 'babys']),
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
            createMemeTxt('Your Text', 230, 100), 
            // createMemeTxt('Your Text', 150, 300)
        ]
    };
}

function createMemeTxt(text, x, y) {
    return {
        text: text,
        size: 40,
        align: 'left',
        color: '#000000',
        fontFamily: 'Impact',
        isOutline: true,
        lineWidth: 2,
        strokeStyle: '#ffffff',
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
    // canvas.width = elImg.width;
    // canvas.height = elImg.height;
    drawCanvas(elImg);
}

function drawCanvas(img) {
    gCtx.drawImage(img, 0, 0);

    gMeme.txts.forEach(function (txt) {
        renderTxt(txt);
    });
}

function filterImages(keyword) {
    return gImgs.filter(function (img) {
        return img.keywords.includes(keyword);
    })
}