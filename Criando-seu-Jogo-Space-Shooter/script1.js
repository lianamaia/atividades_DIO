
const yourShip = document.querySelector(".player-shooter");
const playArea = document.querySelector("#main-play-area");
const aliensImg = ["img/nave1.png", "img/nave2.png", "img/nave3.png","img/nave4.png","img/nave5.png"];
const instructionsText = document.querySelector(".game-instructions");
const startButtom = document.querySelector(".start-button");
let alienIntervenal;


//Principais variáveis do jogo
//var somDisparo=document.getElementById("somDisparo");
//	var somExplosao=document.getElementById("somExplosao");
//	var musica=document.getElementById("musica");
//	var somGameover=document.getElementById("somGameover");
//	var somPerdido=document.getElementById("somPerdido");
//	var somResgate=document.getElementById("somResgate");

//movimento e tiro da nave
function flyShip(event) {
    if(event.key === "ArrowUp") {
        event.preventDefault();
        moveUp();
    } else if(event.key === "ArrowDown") {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//função de subir
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        yourShip.style.top = `${position}px`;
    }
}

//função de descer
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');
    if(topPosition === "500px") {
        return
    } else {
        let position = parseInt(topPosition);
        position += 50;
        yourShip.style.top = `${position}px`;
    }
}

//função tiro
function fireLaser(){
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement(){
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue("left"));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue("top"));
    let newLaser = document.createElement("img");
    newLaser.scr = "img/laser.png";
    newLaser.classList.add("laser");
    newLaser.style.left = " ${xPosition}px";
    newLaser.style.top = " ${yPosition - 10}px";
    return newLaser;
}

function moveLaser(laser){
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll(".alien");

        aliens.forEach((alien) => {//campara se cada alien foi atingido, se sim, troca o src da imagem
            if(checkLaserCollision(laser, alien)){
                alien.src = "img/explosion.png";
                alien.classList.remove("alien");
                alien.classList.add("dead-alien");
            }
        });

        if(xPosition === 340){
            laser.remove();
        }else{
            laser.style.left = "${xPosition + 8}px";
        }  
    }, 10);
}

//função para criar inimigos aleatórios
function createAliens(){
    let newAlien = document.createElement("img");
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens
    newAlien.src = alienSprite;
    newAlien.classList.add("alien");
    newAlien.classList.add("alien-transition");
    newAlien.style.left = "370px";
    newAlien.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newAlien);
    moveAlien(newAlien);
}

//função movimentação dos inimigos

function moveAlien(alien){
    let moveAlienInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue("left"));
        if(xPosition <= 50){
            if(Array.from(alien.classList).includes("dead-alien")){
                alien.remove();
            }else{
                gameover();
            }
        }else{
             alien.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}

//função colisão
function checkLaserCollision(laser, alien){
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserButton = laserTop - 20;

    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienbutton = alienTop - 30;

    if(laserLeft != 340 && laserLeft + 40 >= alienLeft){
        if(laserTop <= alienTop && laserTop >= alienbutton){
            return true;
        }else {
            return false;
        }
    }else{
        return false;
    }
}
//início do jogo
    startButtom.addEventListener("click", (event) => {
        playGame();
})

function playGame(){
    startButtom.style.display = "none";
    instructionsText.style.display = "none";
    window.addEventListener("keydown", flyShip);
    alienIntervenal = setInterval(()=> {
        createAliens();
    }, 2000);
}

//função Gameover
function gameOver() {
    window.addEventListener("keydown", flyShip);
    clearIntervenal(alienIntervenal);
    let aliens = document.querySelectorAll(".alien");
    let lasers = document.querySelectorAll("laser");
    lasers.forEach((laser) => laser.remove());
    setTimeout(()=>{
        alert("game over!");
        yourShip.style.top = "250px";
        startButtom.style.display = "block";
        instructionsText.style.display = "block";
    });
}


