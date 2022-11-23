//there are 3 ways to declare a variable in js var,let,conts,//
let xp = 0;
let health = 100;
let gold = 50;
//if have to words in the code like blow the first latter should be lower in the frist word case and the first latter..
//in the second word shound be upper case
let currentWeapon = 0;
let fighing;
let monsterHealth;
//putting stuff on [] make it in to an array or a list
let inventory = ["stick"];


//const is for thing that we dont want to change
const button1 = document.querySelector("#button1")
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterHealthText = document.querySelector("#monsterHealth")
const monsterNameText = document.querySelector("#monsterName")
const weapons = [
    {
        name:"stick",
        power: 5
    },
    {
        name:"dagger",
        power: 30
    },
    {
        name:"claw hammer",
        power: 50
    },
    {
        name:"sword",
        power: 100
    }
    

];
const monsters = [
{   
    name: "slime",
    level: 2,
    health: 15
},
{ 
    name:"fanged beast",
    level: 8,
    health: 60
},
{
    name:"dragon",
    level: 20,
    health: 300
}
]

const locations = [
    {
        name:"town square",
        "button text": ["go to store", "go to cave", "fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "you are in the town spuare you see a sigh that says \"store\""
    },
    { 
        name:"store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town squre"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "you enter the store",

    },
    {
        name:"cave",
        "button text": ["Fight slime", "Fight beast", "Go Town"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "you have enter the cave"
    },
    {
        name: "fight",
        "button text": ["attack", "dodge","run"],
        "button functions": [attack, dodge, run],
        text: "you are fighting a monsters"
    },
    {
        name:"kill monsters",
        "button text": ["Go Town","Go Town","Go Town"],
        "button functions": [goTown,goTown,easterEgg],
        text: "you killed the monsters congratulations !",
    },
    {
        name:"lose",
        "button text": ["replay","replay","replay"],
        "button functions": [restart,restart,restart],
        text: "you died! would you like to restart?"

    },
    {
        name:"Win!",
        "button text": ["replay","replay","replay"],
        "button functions": [restart,restart,restart],
        text: "congratulations! you bet the game!!"
    },

    {
        name:"esterEgg",
        "button text": ["2","8","go to town"],
        "button functions": [pickTwo,pickEight,goTown],
        text:  "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
    }
]
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function goTown() {
    update(locations[0]);
 

}

function goStore() {
    update(locations[1]);
}
function goCave() {
    update(locations[2]);


}

function buyHealth() {
    //compound assignment -=, - gold 10, health + 10
   if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = "you dont have god to buy health";
    }
    
}
function buyWeapon() {
    if(currentWeapon < weapons.length - 1) {
        if (gold >= 30){
            gold -= 30;
            // instead of += 1 we can do ++ just add 1 to the weapon
            currentWeapon ++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You have a " + newWeapon +".";
            inventory.push(newWeapon);
            text.innerText += " in your inventory you have: " + inventory;
        } else{
            text.innerText = "you do not have enough gold for a new weapon";
        }
    }
    else {  
         text.innerText = "you already have the most powerful weapon";
         button2.innerText = " Sell weapon for 15 gold";
         button2.onclick = sellWeapon;
    }
    
    
    


}
function sellWeapon () {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "you sold a " + currentWeapon + ".";
        text.innerText += " in your inventory you have: " + inventory;

    } else {
        text.innerText =" dont sell your only weapon!!";
    }


}
function fightBeast () { 
    fighing = 1;
    goFight ();

}
function fightSlime() {
    fighing = 0;
    goFight();

}
function fightDragon() {
   fighing = 2;
   goFight();
    


}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighing].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighing].name;
    monsterHealthText.innerText = monsterHealth;

}
function attack() {
    text.innerText = "the " + monsters[fighing].name + "attacks"; 
    text.innerText += " you attack it with your " + weapons[currentWeapon].name + "."
    if (isMonsterHit()) {
        health = getMonsterAttackValue(monsters[fighing].level);

    }
    else {
        text.innerText += "you miss.";
    }
    health -= monsters[fighing].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0 ) { 
        lose();
    } else if (monsterHealth <= 0 ){
       fighing ===2 ? winGame() :defeatMonster();
    } 

    if (Math.random() <= .1 && inventory.length !==1 ) {
        text.innerText += " your " + inventory.pop() + " breaks. ";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;

}
 
function dodge() {
    text.innerText = " you dodge the attack from " + monsters[fighing].name + ".";

}
function run() {

}

function lose()
{
    update(locations[5])

}
function winGame() {
    update(locations[6])
}
function restart() {
    xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();

}

function defeatMonster() {
    gold += Math.floor(monsters[fighing].level * 6.7);
    xp += Math.floor(monsters[fighing].level);
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4])
    
}

function isMonsterHit () {
    return Math.random() > .2 || health < 20;

}

function easterEgg() {
    update(locations[7]);
}
function pickTwo () {
    pick(2)

}

function pickEight () {
    pick(8);
}

function pick (guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11))

    }

    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";


    }

    if (numbers.indexOf (guess)!== -1) {
        text.innerText += "right! you win 20 gold";
        gold += 20;
        goldText.innerText = gold;

    }
    else {
        text.innerText =+ "wrong!! you loss the health !";
        health -= 20;
        healthText.innerText = health
        if (health <= 0) {
            lose();
        }
    }
}