var bg,bgImg;
var player, shooterImg, shooter_shooting;
var afonsoOJegue, aojIMG;
var afonsesGroup;
var life1, life2, life3;
var l1, l2, l3;
var lifeT = 4;
var gameState;
var placar = 0
var blocos = 100
var blocosGroup
var BlocoImg;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  aojIMG = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  l1 = loadImage("assets/heart_1.png");
  l2 = loadImage("assets/heart_2.png");
  l3 = loadImage("assets/heart_3.png");
  BlocoImg = loadImage("assets/bullet.png")
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 900
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

   afonsesGroup = new Group()
   blocosGroup = new Group()


   life1 = createSprite(displayWidth - 150, 40, 20, 20)
   life1.visible = false
   life1.addImage("l1", l1)
   life1.scale = 0.5

   life2 = createSprite(displayWidth - 150, 40, 20, 20)
   life2.visible = false
   life2.addImage("l2", l2)
   life2.scale = 0.5

   life3 = createSprite(displayWidth - 150, 40, 20, 20)
   life3.visible = true
   life3.addImage("l3", l3)
   life3.scale = 0.5


  }

function draw() {
  background(0); 
   
  if(lifeT === 0){
    gameState = "lost"
    player.destroy()
  }
  if(afonsesGroup.isTouching(player)){
    for(i = 0; i < afonsesGroup.length; i = i + 1){
    //i++ tbm serve então pod usar que nem desodorante
    if(afonsesGroup[i].isTouching(player)){
      afonsesGroup[i].destroy()
      lifeT -= 1
    }
    }
  }

  if(lifeT === 4){
    life1.visible = false
    life2.visible = false
    life3.visible = true
  }

  if(lifeT === 3){
    life1.visible = false
    life2.visible = true
    life3.visible = false
  }

  if(lifeT === 2){
    life1.visible = true
    life2.visible = false
    life3.visible = false
  }

  if(lifeT === 1){
    life1.visible = false
    life2.visible = false
    life3.visible = false
  }

  
  if(lifeT >= 2){
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y = player.y+30
    }
    
    if(keyDown("LEFT_ARROW")||touches.length>0){
      player.x = player.x-30
    }
    if(keyDown("RIGHT_ARROW")||touches.length>0){
     player.x = player.x+30
    }
  }

  else{
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-7
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y = player.y+7
    }
    
    if(keyDown("LEFT_ARROW")||touches.length>0){
      player.x = player.x-7
    }
    if(keyDown("RIGHT_ARROW")||touches.length>0){
     player.x = player.x+7
    }
  }



//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
  player.addImage(shooter_shooting)
  blocos = createSprite(player.x + 2, player.y - 30)
  blocos.addImage("BlocoImg", BlocoImg)
  blocosGroup.add(blocos)
  blocos.velocityX = 15;
  blocos.scale = 0.1;
  blocos = blocos -1
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(afonsesGroup.isTouching(blocosGroup)){
  for(var i = 0; i < afonsesGroup.length; i++){
    if(afonsesGroup[i].isTouching(blocosGroup)){ 
      afonsesGroup[i].destroy()
      blocosGroup.destroyEach()
      placar = placar + 1  
    }
  }
}
enimyAfonsito();
drawSprites();
textSize(30)
fill("white")
text(placar + " pontos", displayWidth - 500, displayHeight / 2 - 280)
text(blocos + " é o seu restante de tiros", displayWidth - 500, displayHeight / 2 - 240)
}


function enimyAfonsito(){
  if(frameCount%50===0){
    afonsoOJegue = createSprite(random(500, 1100), random(500, 1100), 50, 50);
    afonsoOJegue.addImage("aojIMG", aojIMG)
    afonsoOJegue.scale = 0.3
    afonsoOJegue.debug = false
    afonsoOJegue.setCollider("rectangle",0,0,300,300)
    afonsoOJegue.lifetime = 400
    afonsoOJegue.velocityX = -10
    afonsesGroup.add(afonsoOJegue)
    }
  }
