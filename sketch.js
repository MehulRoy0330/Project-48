var stick, jump, duck, lWalk, rWalk, stand;
var sad, yay;

var bridge, bridgeImg;
var lCliff, lCliffImg, rCliff, rCliffImg;
var sky;

var rock, rockImg, rocksGroup;
var bird, birdImg, birdsGroup;

var emerald, emeraldImg;

var gameImg;

var invisGround;

var turns = 3;
var gameState = "start";

function preload(){
    sky = loadImage("imgs/sky.jpg");

    lCliffImg = loadImage("imgs/l_cliff.png");
    rCliffImg = loadImage("imgs/r_cliff.png");

    bridgeImg = loadImage("imgs/bridge.png");

    rockImg = loadImage("imgs/rock.png");
    birdImg = loadImage("imgs/bird.png");

    jump = loadAnimation("imgs/stick/jump.png");
    duck = loadAnimation("imgs/stick/duck.png");
    lWalk = loadAnimation(
        "imgs/stick/l_walk1.png",
        "imgs/stick/l_walk2.png"
    );
    rWalk = loadAnimation(
        "imgs/stick/r_walk1.png",
        "imgs/stick/r_walk2.png"
    );
    stand = loadAnimation("imgs/stick/stand.png");

    sad = loadImage("imgs/stick/sad.png");
    yay = loadImage("imgs/stick/yay.png");

    emeraldImg = loadImage("imgs/emerald.png");

    gameImg = loadImage("imgs/game.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    lCliff = createSprite(200, height/2+250);
    lCliff.addImage(lCliffImg);

    rCliff = createSprite(width-200, height/2+250);
    rCliff.addImage(rCliffImg);

    bridge = createSprite(width/2, height/2+70);
    bridge.addImage(bridgeImg);
    bridge.scale = 0.2;

    stick = createSprite(100, height/2+55);
    stick.addAnimation("standing" ,stand);
    stick.scale = 0.25;

    emerald = createSprite(width-150, height/2+50);
    emerald.addImage(emeraldImg);
    emerald.scale = 0.05;

    invisGround = createSprite(width/2, height/2+100, width, 5);
    invisGround.visible = false;

    rocksGroup = createGroup();
    birdsGroup = createGroup();
}

function draw() {
    if(gameState === "start"){
        background("lightgreen");

        stroke("green");
        fill("green");
        textSize(35);
        text("Emerald Rush", width/2-150, height/2-200);

        noStroke();
        textSize(15);
        fill("blue");
        text("John wants to become a rich person, for which he needs to collect an emerald", width/2-275, height/2-100);
        text("Help him collect it by crossing the dangerous bridge!!", width/2-200, height/2-75);

        textSize(18);
        fill("red");
        text("Use left and right arrow keys to walk,", width/2-175, height/2);
        text(" up arrow key to jump and down arrow key to duck", width/2-225, height/2+25);

        image(gameImg, width/2-100, height/2+100);

        fill("black");
        textSize(20);
        text("Press space to start", width/2-125, height-50);

        if(keyDown("space")){
            gameState = "play";
        }

    }

    if(gameState === "play"){
        background(sky);

        stick.collide(invisGround);

        spawnRocks();
        spawnBirds();

        noStroke();
        fill("black");
        textSize(15);
        text("Turns: "+turns, width-100, 100);

        stick.changeAnimation("standing");
        if(keyDown("right")){
            stick.addAnimation("right walk", rWalk);
            stick.changeAnimation("right walk");
            stick.x+=8;
        }
        if(keyDown("left")){
            stick.addAnimation("left walk", lWalk);
            stick.changeAnimation("left walk");
            stick.x-=8;
        }
        if(keyDown("up")){
            stick.addAnimation("jump", jump);
            stick.changeAnimation("jump");
            stick.velocityY = -10;
        }
        stick.velocityY+=1;
        if(keyDown("down")){
            stick.addAnimation("duck", duck);
            stick.changeAnimation("duck");
        }

        if(rocksGroup.isTouching(stick) || birdsGroup.isTouching(stick)){
            if(turns > 0){
                turns--;
                birdsGroup.destroyEach();
                rocksGroup.destroyEach();
            }
            if(turns === 0){
                gameState = "over";
            }
        }
        if(stick.isTouching(emerald)){
            gameState = "win";
        }

        drawSprites();
    }
    if(gameState === "over"){
        background("lightgreen");

        stroke("green");
        fill("green");
        textSize(30);
        text("Game Over", width/2-80, height/2-200);
        
        imageMode(CENTER);
        image(sad, width/2, height/2-100, 135/2, 239/2);

        noStroke();
        fill("red");
        textSize(15);
        text("All the best next time!", width/2-80, height/2);

        fill("blue");
        textSize(20);
        text("Press R to restart", width/2-90, height/2+100);

        if(keyDown("r")){
            reset();
        }
    }
    if(gameState === "win"){
        background("lightgreen");

        stroke("green");
        fill("green");
        textSize(30);
        text("You Won!!", width/2-70, height/2-200);

        imageMode(CENTER);
        image(yay, width/2, height/2-100, 191/2, 316/2);

        noStroke();
        fill("red");
        textSize(15);
        text("John became rich and lived happily ever after", width/2-150, height/2+25);

        fill("blue");
        textSize(20);
        text("Press R to play again", width/2-90, height/2+100);

        if(keyDown("r")){
            reset();
        }
    }
}

function spawnRocks(){
    if(frameCount%60 === 0){
        rock = createSprite(random(200, width-200), 10);
        rock.addImage(rockImg);
        rock.scale = random(0.05, 0.2);
        rock.velocityY = 20;
        rock.velocityY+=1;
        rock.lifetime = 30;
        rocksGroup.add(rock);
    }
}

function spawnBirds(){
    if(frameCount%30 === 0){
        bird = createSprite(width+10, random(70, height/2+70));
        bird.addImage(birdImg);
        bird.scale = 0.1;
        bird.velocityX = -15;
        bird.lifetime = 90;
        birdsGroup.add(bird);
    }
}

function reset(){
    gameState = "play";
    turns = 3;
    rocksGroup.destroyEach();
    birdsGroup.destroyEach();

    stick.x = 100;
    stick.y = height/2+55;
}