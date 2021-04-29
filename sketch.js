//Create variables here
var dog,happyDog,dogImg,happyDogImg;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500,500);
  database= firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);
  foodStock.set(20);



  dog=createSprite(250,300,20,20)
  dog.addImage(dogImg);
  dog.scale=0.2;
}


function draw() {  
  background("green");

  if(foodS!==undefined){
    textSize(20);
    fill(255)
    text("NOTE:press DOWN_ARROW to feed CHINTU",50,50);
    text("food remaining:"+foodS,150,150)

  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);


  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg)
  }

  if(foodS===0){
    foodS=20
  }

  drawSprites();

  }


  
  //add styles here

}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    food:x
  })
}

function readStock(data){
  foodS=data.val();
}


