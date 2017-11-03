// Player is called first so lets define cnv and ctx here
var cnv = document.getElementById('vespa_game');
var ctx = cnv.getContext("2d");
// Canvas variables
var CW = parseInt($("#vespa_game").width());
var CH = parseInt($("#vespa_game").height());
var animationIndex = 0;
var points = 0;

function Player (x_pos, y_pos, width, height, speed, img, frameIndex_x, frameIndex_y){
	// Variables
	this.context = ctx;
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.height = height;
	this.width = width;
	this.image = img;
	this.speed = speed;
	this.frameIndex_x = frameIndex_x;
	this.frameIndex_y = frameIndex_y;	
	this.dy = 0;
	this.dx = 0;
	this.points = points;

}

Player.prototype.setCoordinates	= function(x, y){
	this.x_pos = x;
	this.y_pos = y;
}
Player.prototype.pickSprites = function(spriteIndex, animationIndex){
	this.frameIndex_x = 64 * (spriteIndex % 2) + animationIndex * 32;
	this.frameIndex_y = 36 * Math.floor(spriteIndex / 2);
}
Player.prototype.move = function(){
	//down
	if( this.dx === 0 && this.dy === 1){
		this.pickSprites(2,animationIndex);
		animationIndex ? animationIndex = 1 : animationIndex = 0;
	}
	//up
	else if(this.dx === 0 && this.dy === -1){
		this.pickSprites(0,animationIndex);
		animationIndex ? animationIndex = 0 : animationIndex = 1;
	}
	//right
	else if(this.dx === 1 && this.dy === 0){
		this.pickSprites(1,animationIndex);
		animationIndex ? animationIndex = 0 : animationIndex = 1;
	}
	//left
	else if(this.dx === -1 && this.dy === 0){
		this.pickSprites(3,animationIndex);
		animationIndex ? animationIndex = 0 : animationIndex = 1;
	}
	//left-up
	else if(this.dx === -1 && this.dy === -1){
	this.pickSprites(6,animationIndex);
	animationIndex ? animationIndex = 0 : animationIndex = 1;
	}
	//left-down
	else if(this.dx === -1 && this.dy === 1){
		this.pickSprites(7,animationIndex);
		animationIndex ? animationIndex = 0 : animationIndex = 1;
	}
	//right-up
	else if(this.dx === 1 && this.dy === -1){
	this.pickSprites(4,animationIndex);
	animationIndex ? animationIndex = 0 : animationIndex = 1;
	}
	//right-down
	else if(this.dx === 1 && this.dy === 1){
		this.pickSprites(5,animationIndex);
		animationIndex ? animationIndex = 0 : animationIndex = 1;
	}				
(this.dx != 0 && this.dy != 0) ? (this.x_pos += this.dx*this.speed*(1/Math.sqrt(2)), this.y_pos += this.dy*this.speed*(1/Math.sqrt(2))) : (this.y_pos += this.dy*this.speed, this.x_pos += this.dx*this.speed);
}


Player.prototype.render	= function(){
	// Draw sprite
	this.context.drawImage(
		this.image,
		this.frameIndex_x,		//crop x
		this.frameIndex_y,		//crop y
		this.width,
		this.height,
		this.x_pos,				
		this.y_pos,				
		this.width*2,
		this.height*2);
}