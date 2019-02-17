function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function toggleView(element) {
    document.querySelector(element).classList.toggle('hidden');
}

function genRandomInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}