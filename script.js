var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var score = 0;
both = 0;
var counter = 0;
var currentBlocks = [];

let highScore = localStorage.getItem("ballHighScore");

if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("ballHighScore", JSON.stringify(highScoreVal))
} else {
    highScoreVal = JSON.parse(highScore)
    highBox.innerHTML = "High Score: " + highScore
}

function moveLeft() {

    // for moving left
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 2 + "px";
    }

}

function moveRight() {

    //for moving right
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 380) {
        character.style.left = left + 2 + "px";
    }

}



document.addEventListener("keydown", event => {

    //keyboard response
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


//button reponse
function keepMovingRight() {
    if (both == 0) {
        both = 1;
        interval = setInterval(moveRight, 1);
    }

}
function keepMovingLeft() {
    if (both == 0) {
        both = 1;
        interval = setInterval(moveLeft, 1);
    }

}
function stopMoving() {
    clearInterval(interval);
    both = 0;
}


var blocks = setInterval(function () {

    //getting the last created block
    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));

    if(counter > 0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
    var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }
    

     //only create new block if have enough room or counter == 0 meaning there is currently no block present
    if(blockLastTop < 400 || counter == 0){  
        var block = document.createElement("div");  //creating block and holes
        var hole = document.createElement("div");
        block.setAttribute("class", "block")   
        hole.setAttribute("class", "hole")
        block.setAttribute("id", "block"+counter)  //adding uniqure id to block and holes created using counter
        hole.setAttribute("id", "hole"+counter)
    
        block.style.top = blockLastTop + 100 + "px";  //new block 100px below old block
        hole.style.top = holeLastTop + 100 + "px"; 
    
        var random = Math.floor(Math.random() * 360)
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter); //add the counter of the created block in the array
        counter++;

    }

    var characterTop =  parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft =  parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if(characterTop <= 0){
    
        retry = document.querySelector('.retry');
        retry.style.visibility = 'visible';
        
        clearInterval(blocks);
        location.reload;
    }

    for(var i = 0; i<currentBlocks.length; i++){
        let current = currentBlocks[i]; //counter no. of current block of array
        let ihole = document.getElementById("hole"+current);  
        let iblock = document.getElementById("block"+current);

        var iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

        //shifting the block and hole 0.5px  upside, as we are in a setInterval fucntion. the blocks/holes will keep moving
        iblock.style.top = (iblockTop - ((score/100) <= 1 ? (score/100) : 1) - 0.5) + "px";
        ihole.style.top = (iblockTop - ((score/100) <= 1 ? (score/100) : 1)  - 0.5 )+ "px";
        

        if(iblockTop< -5){
            //incrementing score
            score += 1;
            currentBlocks.shift();  //removing first element from array that is current block
            iblock.remove();
            ihole.remove();
        }

        if(iblockTop - 20 < characterTop && iblockTop>characterTop){
            drop++;
            if(iholeLeft <= characterLeft && iholeLeft+20>=characterLeft){ //currently over a hole
                drop = 0;
            }
        }

    }

    //changing high score
    if(score>highScoreVal){
        highScoreVal = score;
        localStorage.setItem("ballHighScore", JSON.stringify(highScoreVal))
        highBox.innerHTML = "High Score: " + highScoreVal
    }
    scoreBox.innerHTML = "Score: " + score;

    if(drop==0){
        if(characterTop < 480){
            character.style.top = (characterTop + 2 + ((score/200) <= 1.5 ? (score/200) : 1.5)) + "px"
            console.log( "Drop speed: ", ((score/200) <= 1.5 ? (score/200) : 1.5)) ; 
        }
        
    }else{
        character.style.top = (characterTop - ((score/100) <= 1 ? (score/100) : 1)  - 0.5) + "px"
    }
   

}, 1);



function reload(){
    score = 0;
    location.reload();
}

