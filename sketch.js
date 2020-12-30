//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,gameover;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage


function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  
  //set collider for sword
  sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("blue");
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    fruits();
    Enemy();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+1;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        gameover = createSprite(200,200,1,1);
        gameover.addImage(gameOverImage);
        gameover.x=200;
        gameover.y=200;
      }
    }
  }
  
  drawSprites();
  
  //Display score
  text("Score : "+ score,300,30);
}


function Enemy(){
 if (frameCount % 600 === 0){
   var monster = createSprite(0,165,10,40);
   monster.addAnimation("moving",monsterImage);
   monster.y= Math.round(random(40,350));  
   monster.velocityX = 8;    
    enemyGroup.add(monster);
   monster.lifetime=51;
  }
}

function fruits(){
  if (frameCount % 60 === 0){
   var fruit = createSprite(0,165,10,40);
   fruit.y= Math.round(random(40,350));  
   fruit.velocityX = 8;

   
    // //generate random fruits
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
   
    fruit.scale = 0.2
    
    //assign  and lifetime to the fruits       
    fruit.lifetime = 51;
   
   //adding fruits to the group
   fruitGroup.add(fruit);
  }
}