
var gNextId = 1;
var gImgs;
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