const STEP = 50
const INTERVAL = 400

document.addEventListener('keydown', function (e) {
    if (imageManager.hasOwnProperty(e.code)) {
        imageManager.execute(e.code)
    }
})

function getRect(obj) {
    return {
        w: window.innerWidth - window.pageXOffset - obj.width,
        h: window.innerHeight - window.pageYOffset - obj.height
    }
}

function setPosition(w, h, obj) {
    obj.style.left = Math.trunc(w/2) + 'px'
    obj.style.top = Math.trunc(h/2) + 'px'
}

let imageManager = {
    image: document.querySelector('.logo'),
    ArrowUp: function () {
        let {w, h} = getRect(this.image)
        if(this.image.offsetTop > STEP) {
            this.image.style.top = this.image.offsetTop - STEP + 'px'
        } else {
            setPosition(w, h, this.image)
        }
    },
    ArrowLeft: function () {
        let {w, h} = getRect(this.image)
        if(this.image.offsetLeft > STEP) {
            this.image.style.left = this.image.offsetLeft - STEP + 'px'
        } else {
            setPosition(w, h, this.image)
        }
    },
    ArrowRight: function () {
        let {w, h} = getRect(this.image)
        if(this.image.offsetLeft + STEP <= w ) {
            this.image.style.left = this.image.offsetLeft + STEP + 'px'
        } else {
            setPosition(w, h, this.image)
        }
    },
    ArrowDown: function () {
        let {w, h} = getRect(this.image)
        if(this.image.offsetTop + STEP < h) {
            this.image.style.top = this.image.offsetTop + STEP + 'px'
        } else {
            setPosition(w, h, this.image)
        }
    },
}

imageManager.execute = function (key) {
    let methodName = imageManager[key]
    let functionParams = [].splice.call(arguments, 1)
    return methodName.apply(imageManager, functionParams)
}

const methods = ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowDown']
let randomMethodKey, methodsToExeccute, randomNumber

setInterval(function () {
    randomMethodKey = Math.floor((Math.random() * 4))
    methodsToExeccute = methods[randomMethodKey]

    imageManager.execute(methodsToExeccute)
}, INTERVAL)