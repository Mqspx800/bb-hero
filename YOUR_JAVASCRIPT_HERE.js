// Write your JS here

//initialize Hero
var hero;
var init = false;
var brickRowCount
var brickColumnCount
var brickWidth
var brickHeight
var brickPadding 
var brickOffsetTop 
var brickOffsetLeft 
var bricks 
var imgHero
var rightPressed = false
var leftPressed = false
var upPressed = false
var downPressed = false
function initializeGame(){
    if(!hero)
    hero = new Object;
    //console.log('game load')
    hero.name = '';
    hero.heroic = false;
    hero.inventory = [];
    hero.health = 10;
    hero.weapon = {type:'',damage:2}
    hero.currentIndex = [0,0]
    
  
var inn = document.getElementById('inn').onclick = function(){rest(hero)}
var dagger = document.getElementById('dagger').onclick=
function(){pickUpItem(hero,{type:'dagger',damage:2})}
    brickRowCount = 5;
    brickColumnCount = 5;
    brickWidth = 45;
    brickHeight = 50;
    brickPadding = 5;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    bricks = [];
    imgHero = document.createElement('img')
    imgHero.id = 'hero'
    imgHero.src = 'https://data.whicdn.com/images/301966215/original.gif'
    imgHero.width = brickWidth
    imgHero.height = brickHeight
    renderBrick()
    renderHero(0,2)
   
    init = true
}

function draw(){
    initializeGame()
    console.log(rightPressed)
    if(rightPressed||leftPressed||upPressed||downPressed)
    {
        console.log('run??????')
        moveHero()
       
    }
}

var bag = document.getElementById('bag').onclick = function(){equipWeapon(hero)}

function rest(target)
{
    if(target.health==10) 
        alert('The health of your hero is restored to 10')
       else target.health = 10;
       //console.log(target.health)
    return target;
}

function pickUpItem(hero,weapon)
{
    hero.inventory.push(weapon)
}

function equipWeapon(hero)
{
    if(hero.inventory[0]!=undefined)
    hero.weapon= hero.inventory[0];
}



function changeHeroName()
{
    name = document.getElementById('hero_name').value
    //console.log(name)
    if(name)
    hero.name = this.name
    //console.log(hero.name)
    form = document.getElementById('myForm')
    form.style.display = 'none'
    canvas.style.display = 'block'
}

//game logic
var canvas = document.getElementById("myCanvas");
//console.log(canvas)
var ctx = canvas.getContext("2d");
canvas.style.minWidth = 1100
canvas.style.maxWidth = window.innerWidth
canvas.style.height = 500
canvas.style.display = 'none'



// setup grid of playground
function renderBrick(){
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 , occupied:null};
    }
    
    }
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        }
       // console.log(bricks)
    }
}


function renderHero(ind_c,ind_r)
    {
       //console.log(bricks[ind_c][ind_r].x+ '  '+bricks[ind_c][ind_r].y)
        ctx.drawImage(imgHero, bricks[ind_c][ind_r].x, bricks[ind_c][ind_r].y, imgHero.width, imgHero.height);
        hero.currentIndex = [ind_c,ind_r]
        //console.log(ind_c,ind_r)
    }


  
    document.addEventListener("keydown", keyDownHandler, false);
    
    function keyDownHandler(e) {
        if(e.key == "Right" || e.key == "ArrowRight") {
            console.log('rightPress')
            rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") {
            leftPressed = true;
        }
        else if(e.key == "up" || e.key == "ArrowUp") {
            upPressed = true;
        }else if(e.key == "down" || e.key == "ArrowDown") {
            downPressed = true;
        }
    }


    function moveHero(){
        var heroC = hero.currentIndex[0]
        var heroR = hero.currentIndex[1]
        if(rightPressed && heroC<3 && bricks[heroC+1][heroR].occupied== null ) {
            renderBrick();
            renderHero([heroC+1][heroR])
        }
        else if(left_press && heroC>1 && bricks[heroC-1][heroR].occupied== null ) {
            renderBrick()
            renderHero([heroC-1][heroR])
        }
        else if(up_Pressed && heroC<3 && bricks[heroC][heroR+1].occupied== null ) {
            renderBrick()
            renderHero([heroC][heroR+1])
        }
        else if(down_Pressed && heroC>1 && bricks[heroC][heroR-1].occupied== null ) {
            renderBrick()
            renderHero([heroC-1][heroR])
        }
    }
    setInterval(draw, 100);