var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
both = 0;

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 2 + "px";
    }

}

function moveRight() {
    console.log("right")
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 380) {
        character.style.left = left + 2 + "px";
    }

}



document.addEventListener("keydown", event => {

    if (both == 0) {
        both++;
        if (event.key === "ArrowLeft") {
            interval = setInterval(moveLeft, 1);
        }
        if (event.key === "ArrowRight") {
            interval = setInterval(moveRight, 1);
        }
    }

})

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
})


function keepMovingRight(){
    if(both == 0){
        both = 1;
        interval = setInterval(moveRight, 1);
    }
    
}
function keepMovingLeft(){
    if(both == 0){
        both = 1;
        interval = setInterval(moveLeft, 1);
    }
    
}
function stopMoving(){
    clearInterval(interval);
    both = 0;
}

var block = document.createElement("div");
var hole = document.createElement("div");
block.setAttribute("class", "block")
hole.setAttribute("class", "hole")
block.setAttribute("id", "block")
hole.setAttribute("id", "hole")
var random = Math.floor(Math.random() * 360)
game.appendChild(block);
game.appendChild(hole);












////adding touch support

function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 60, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}


window.addEventListener('load', function () {
    var el = document.getElementById('game')


    swipedetect(el, function (swipedir) {
        if (swipedir != 'none') {

            if (swipedir == 'left') {
                var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
                if (left > 0) {
                    character.style.left = left - 10 + "px";
                }
            }

            if (swipedir == 'right'){
                var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
                if (left < 380) {
                    character.style.left = left + 10 + "px";
                }
            }
           


        }
    })
}, false)