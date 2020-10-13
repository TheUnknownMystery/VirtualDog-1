
var dog, happyDog, database, foodS, foodStock = 20;
var dogImage;
function preload() {

  dogImage = loadImage("images/Dog.png");
  dogHappy = loadImage("images/happydog.png")
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);

  dog = createSprite(250, 400, 20, 20);
  dog.scale = 0.2
  dog.addImage(dogImage);
  foodS = database.ref("Food");
  foodS.on("value", readStock);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref("/").update({

    Food: x

  })
}


function draw() {
  background(46, 139, 87);
  drawSprites();
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogHappy);
  }
  text("food:" + foodS, 200, 200)
  textSize(4)
}



