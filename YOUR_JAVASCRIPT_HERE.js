// Write your JS here


//initialize Hero
var hero = new Object;
hero.name = 'sssss';
hero.heroic = false;
hero.inventory = [];
hero.health = 10;
hero.weapon = {type:'',damage:2}


var inn = document.getElementById('inn').onclick = function(){rest(hero)}
var dagger = document.getElementById('dagger').onclick=
function(){pickUpItem(hero,{type:'dagger',damage:2})}
var bag = document.getElementById('bag').onclick = function(){
            equipWeapon(hero)
}

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
    //weapon object
    //targetWeapon = new {type:'',damage:2}
    //console.log(weapon)
    hero.inventory.push(weapon)
}

function equipWeapon(hero)
{
    if(hero.inventory[0]!=undefined)
    hero.weapon= hero.inventory[0];
}

