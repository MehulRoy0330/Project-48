var stick, jump, duck, lWalk, rWalk, stand;

var bridge, bridgeImg;
var lCliff, lCliffImg, rCliff, rCliffImg;
var sky;

var rock, rockImg, rocksGroup;
var bird, birdImg, birdsGroup;
var squirrel, squirrelAnim, squirrelsGroup;

var emerald, emeraldImg;

var invisGround;

function preload(){
    sky = loadImage("imgs/sky.jpg");

    lCliffImg = loadImage("imgs/l_cliff.png");
    rCliffImg = loadImage("imgs/r_cliff.png");

    bridgeImg = loadImage("imgs/bridge.png");

    rockImg = loadImage("imgs/rock.png");
    birdImg = loadImage("imgs/bird.png");
    
    squirrelAnim = loadAnimation(
        "imgs/squirrel/sq1.png",
        "imgs/squirrel/sq2.png",
        "imgs/squirrel/sq3.png",
        "imgs/squirrel/sq4.png",
        "imgs/squirrel/sq5.png",
        "imgs/squirrel/sq6.png",
        "imgs/squirrel/sq7.png"
    );

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

    emeraldImg = loadImage("imgs/emerald.png");
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
}

function draw() {
    background(sky);

    stick.collide(invisGround);

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

        stick.velocityY = -6;
    }
    stick.velocityY+=1;
    if(keyDown("down")){
        stick.addAnimation("duck", duck);
        stick.changeAnimation("duck");
    }

    drawSprites();
}