// Write your JS here

//initialize Hero
var hero;
var rightPressed
var leftPressed
var upPressed
var downPressed
var monster
var weapon
function initializeGame(){
   
     hero = new Object;
     monster = new Object
     weapon = new Object
     document.addEventListener("keydown", keyDownHandler, false);
    
    //console.log('game load')
    
    hero.imgHero = document.getElementById('heroIMG')
    hero.name = '';
    hero.heroic = false;
    hero.inventory = [];
    hero.health = 10;
    hero.weapon = {type:'',damage:2}
    hero.currentIndex = [0,0]
    
    rightPressed = false
    leftPressed = false
    upPressed = false
    downPressed = false
    var inn = document.getElementById('inn').onclick = function(){rest(hero)}
    var dagger = document.getElementById('dagger').onclick=
        function(){pickUpItem(hero,{type:'dagger',damage:2})}
    var bag = document.getElementById('bag').onclick = function(){equipWeapon(hero)}
    brickRowCount = 5;
    brickColumnCount = 5;
    brickWidth = 45;
    brickHeight = 50;
    brickPadding = 5;
    brickOffsetTop = 30;
    brickOffsetLeft = 30;
    bricks = [];
    monster.monsterIndex = generateRandomIndex()
    monster.health = 10;
    weapon.index = generateRandomIndex()
    
}

function disposeWeapon()
{
    weapon.elementH = document.getElementById("dagger")
     ctx.drawImage(weapon.elementH, bricks[weapon.index[0]][weapon.index[1]].x,bricks[weapon.index[0]][weapon.index[1]].y,brickWidth,brickHeight);
     bricks[weapon.index[0]][weapon.index[1]].occupied = "weapon"
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
        console.log('keyPress')
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.style.minWidth = 1100
canvas.style.maxWidth = window.innerWidth
canvas.style.height = 500
canvas.style.display = 'none'

function rest(target)
{
    if(target.health==10) 
        alert('The health of your hero is restored to 10')
       else target.health = 10;
       //console.log(target.health)
    return target;
}

function pickUpItem(heroX,weapon)
{
    
    heroX.inventory.push(weapon)
    document.getElementById('states').value+=('pick up '+ weapon.type + 'with damage '+ weapon.damage +'\\\n');
    console.log(hero.weapon.damage)
}

function equipWeapon(hero)
{
    if(hero.inventory[0]!=undefined)
    hero.weapon= hero.inventory[0];
    console.log(hero.weapon.damage)
}

function fight()
{
    var userChoice = prompt("Do you choose rock, paper or scissors?");
    console.log(hero)
    var computerChoice = Math.random();
    if (computerChoice < 0.34) {
	computerChoice = "rock";
  } else if(computerChoice <= 0.67) {
	computerChoice = "paper";
  } else {
	computerChoice = "scissors";
  } 

    var compare = function(choice1,choice2) {
    
    if (choice1 === choice2) {
        
        return "The result is a tie!" + " " + "Nothing happen." ;
    }
    
    else if (choice1 === "rock") {
        
        if (choice2 === "scissors") {
            monster.health -= hero.weapon.damage
            return "rock wins" + "\\\n" + hero.name+ " deal "+ hero.weapon.damage + " point damage to the monster";
        }
        else {
            hero.health -= 5
            return "paper wins" + "\\\n"+ hero.name + "received 5 damage from enemy";
        }
    }
    
    else if (choice1 === "paper") {
        
        if (choice2 === "rock") {
            monster.health -= hero.weapon.damage
            return "paper wins" + "\\\n"+ hero.name + "deal "+ hero.weapon.damage + " point damage  to the monster";
        }
        else {
            hero.health -= 5
            return "scissors wins" + "\\\n"+ hero.name + "received 5 damage from enemy";
        }
            
    }
    
    else if (choice1 === "scissors") {
        
        if (choice2 === "rock") {
            hero.health -= 5
            return "rock wins" + "\\\n"+ hero.name + "received 5 damage from enemy";
        }
        else {
            monster.health -= hero.weapon.damage
            return "scissors win" + "\\\n"+ hero.name + "deal "+ hero.weapon.damage + " point damage to the monster";
        }
    }
    
    
    } //closes compare function

    if(hero.health > 0 )
    {
        document.getElementById('states').value+=("Computer chose: " + computerChoice+'\\\n');
        document.getElementById('states').value+=(compare(userChoice,computerChoice)+'\\\n');
        document.getElementById('states').value+=(hero.name + " 's health: "+hero.health+ "|| moster 's health:" + monster.health +"\\\n");
    }
    else if(monster.health<=0)
    {
        document.getElementById('states').value+='you win!';
        alert("you win, press enter to restart!")
        location.reload()
    }
    else if(hero.health<=0)
    {
        document.getElementById('states').value+='game over!';
        alert("you lose, press enter to restart!")
        location.reload()
    }
}

function changeHeroName()
{
    name = document.getElementById('hero_name').value
    //console.log(name)
    if(name!='')
    hero.name = this.name
    //console.log(hero.name)
    form = document.getElementById('myForm')
    form.style.display = 'none'
    canvas.style.display = 'block'
}

function drawHero(grid_c,grid_r){
    //console.log(hero.imgHero,bricks[grid_c][grid_r].x,bricks[grid_c][grid_r].y )
    ctx.drawImage(hero.imgHero, bricks[grid_c][grid_r].x,bricks[grid_c][grid_r].y,brickWidth,brickHeight);
    //hero.imgHero.src = 'lib/hero.gif'
}


function disposeMonster()
{
    
     monster.elementH = document.getElementById("monster_pic")
     //console.log(monster.monsterIndex);
     ctx.drawImage(monster.elementH, bricks[monster.monsterIndex[0]][monster.monsterIndex[1]].x,bricks[monster.monsterIndex[0]][monster.monsterIndex[1]].y,brickWidth,brickHeight);
     bricks[monster.monsterIndex[0]][monster.monsterIndex[1]].occupied = "monster"
}


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
    }
}

function draw()
{
    renderBrick()
    disposeMonster()
    disposeWeapon()
    drawHero(hero.currentIndex[0],hero.currentIndex[1])
    if(rightPressed && hero.currentIndex[0]<4 && bricks[hero.currentIndex[0]+1][hero.currentIndex[1]].occupied==null){
        drawHero(hero.currentIndex[0]+1,hero.currentIndex[1])
       
        hero.currentIndex[0]++
        
    }
    else if(leftPressed && hero.currentIndex[0]>0 && bricks[hero.currentIndex[0]-1][hero.currentIndex[1]].occupied==null){
        drawHero(hero.currentIndex[0]-1,hero.currentIndex[1])
      
        hero.currentIndex[0]--
        
    }
    else if(downPressed && hero.currentIndex[1]<4 && bricks[hero.currentIndex[0]][hero.currentIndex[1]+1].occupied==null){
        drawHero(hero.currentIndex[0],hero.currentIndex[1]+1)
 
        hero.currentIndex[1]++
        
    }
    else if(upPressed && hero.currentIndex[1]>0 && bricks[hero.currentIndex[0]][hero.currentIndex[1]-1].occupied==null){
        drawHero(hero.currentIndex[0],hero.currentIndex[1]-1)
     
        hero.currentIndex[1]--
    }
    checkWhatsInfront()
    rightPressed = false;upPressed = false;downPressed = false;leftPressed = false;
}

function checkWhatsInfront()
{
    var target
    if(rightPressed&&hero.currentIndex[0]+1<=4){
        target = bricks[hero.currentIndex[0]+1][hero.currentIndex[1]].occupied
    }else if(leftPressed&&hero.currentIndex[0]-1>=0)
    {
        target =bricks[hero.currentIndex[0]-1][hero.currentIndex[1]].occupied
    }else if(upPressed&&hero.currentIndex[1]-1>=0){
        target= bricks[hero.currentIndex[0]][hero.currentIndex[1]-1].occupied
    }
    else if(downPressed&&hero.currentIndex[1]+1<=4)
    {
        target = bricks[hero.currentIndex[0]][hero.currentIndex[1]+1].occupied
    }


     if(target=='monster')
     {
         fight()
     }
     else if(target=='weapon'){
        var w = {type:'dagger',damage:5}
        pickUpItem(hero,w)
     }
    
    
}


function generateRandomIndex()
{
    var i = [0,0]
    var min=0; 
    var max=4;  
    
    i[0] = parseInt(Math.random() * (+max - +min) + +min); 
    i[1] = parseInt(Math.random() * (+max - +min) + +min); 

    return i;
}

setInterval(draw, 100);