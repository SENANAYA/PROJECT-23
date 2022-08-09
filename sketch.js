var helicopterImg, bgImg,packageImg;
var helicopterSprite, packageSprite;
var boxBottomBody, boxLeftBody, boxRightBody
var leftedge,rightedge,leftedgebody,rightedgebody

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var packageBody=[]
var packageSprite=[]
var packno=0;
var delay=0;
var dl=20
var left=1
var right=1
var ground;
function preload()
{
	helicopterImg=loadImage("helicopter.png")
	bgImg=loadImage("bg.png")
	packageImg=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	engine = Engine.create();
	world = engine.world;

	packageSprite[packno]=createSprite(width/2, 50,200,200);
	packageSprite[packno].addImage(packageImg)
	packageSprite[packno].scale=0.2

	helicopterSprite=createSprite(width/2, 100, 10,10);
	helicopterSprite.addImage(helicopterImg)
	helicopterSprite.scale=0.6

	engine = Engine.create();
	world = engine.world;
	
	boxBottomBody = new Box(400, 660, 200,20);
	ground = new Box(400, 660, 800,20);
 	boxLeftBody = new Box(310, 620, 20,100);
 	boxRightBody = new Box(490, 620, 20,100);
	 leftedge = createSprite(0, 350, 20,700);
 	rightedge = createSprite(800, 350, 20,700);
 	leftedgebody=new Box(0, 350, 20,700);
	 rightedgebody=new Box(800, 350, 20,700);

	packageBody[packno] = Bodies.circle(width/2 , 100 , 20 , {restitution:0.4, isStatic:true});
	
	World.add(world, packageBody);
	


}


function draw() {
	Engine.update(engine);
	background(bgImg);
	
	if(left===1){
		
		if (keyDown(LEFT_ARROW)) {
			
	if(packageBody[packno].position.y ===helicopterSprite.y){
		
		helicopterSprite.x=helicopterSprite.x-10
			 
			translation={x:-10,y:0}
			Matter.Body.translate(packageBody[packno], translation)
		
	}else{
		helicopterSprite.x=helicopterSprite.x-10
		
	}
} 
	}
 if(right===1){
	 if(keyDown( RIGHT_ARROW)) {
			if(packageBody[packno].position.y ===helicopterSprite.y){
				helicopterSprite.x=helicopterSprite.x+10
			translation={x:10,y:0}
			Matter.Body.translate(packageBody[packno], translation)
		
		
			
		}else{
			helicopterSprite.x=helicopterSprite.x+10
		}
	}
		  }
		   if(keyDown(DOWN_ARROW)&&delay===0&&(keyDown(LEFT_ARROW)===false&&keyDown(RIGHT_ARROW)===false)) {
		//assign a value for setStatic so that the packageBody falls DOWN
	
			//  Matter.Body.setStatic(packageBody,true);
			// Matter.Body.setStatic(false);
			 Matter.Body.setStatic(packageBody[packno],false);
			 packno++
			//  Matter.Body.setStatic(packageBody);
	packageBody[packno] =Bodies.circle(helicopterSprite.x , 100 , 20 , {restitution:0.4, isStatic:true});
	packageSprite[packno]=createSprite(helicopterSprite.x , 50,200,200);
	packageSprite[packno].depth=helicopterSprite.depth-1
	packageSprite[packno].scale=0.2
	packageSprite[packno].addImage(packageImg)
	World.add(world,packageBody[packno] );
	delay=dl
		}

	if(delay>0){
		delay--
	}
	for(var no=0;no<=packno;no++){
	packageSprite[no].x= packageBody[no].position.x 
	packageSprite[no].y= packageBody[no].position.y 
	}

	boxRightBody.display();
	boxLeftBody.display();
	boxBottomBody.display();
	leftedge.display()
	rightedge.display()
	leftedgebody.display()
	rightedgebody.display()
	if(	helicopterSprite.isTouching(leftedge)){
		left=0
		}else if(helicopterSprite.x>300){
			left=1
		}
		if(	helicopterSprite.isTouching(rightedge)){
		right=0
		}else if(helicopterSprite.x<500){
			right=1
		}
		
	helicopterSprite.collide(leftedge)
	helicopterSprite.collide(rightedge)
	
	drawSprites(); 
	
	
}


  
