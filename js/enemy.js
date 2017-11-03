
	function Enemy (x_pos, y_pos, width, height, img, speed, frameIndex_x, frameIndex_y){
		// Variables
		this.context = ctx;
		this.x_pos = x_pos;
		this.y_pos = y_pos;
		this.height = height;
		this.width = width;
		this.target = [];
		this.image = img;
		this.speed = speed;
		this.frameIndex_x = frameIndex_x;
		this.frameIndex_y = frameIndex_y;
		this.dy = 0;
		this.dx = 0;
	}
	Enemy.prototype.setCoordinates = function(x, y){
		this.x_pos = x;
		this.y_pos = y;
	}
	Enemy.prototype.pickSprites = function(spriteIndex, animationIndex){
		this.frameIndex_x = 66 * animationIndex;
		this.frameIndex_y = 66 * spriteIndex;
	} 
	Enemy.prototype.move = function(){
		if(this.targetReached()){
			this.giveNewTarget();
		}
		else{
			this.nextPosition();

			//diagonal movement:
			//right-up
			if(this.dx === 1 && this.dy === -1){
				this.pickSprites(4,1)
			}
			//right-down
			else if(this.dx === 1 && this.dy === 1){
				this.pickSprites(4,0)
			}
			//left-up
			else if(this.dx === -1 && this.dy === -1){
				this.pickSprites(5,1)
			}
			//left-down
			else if(this.dx === -1 && this.dy === 1){
				this.pickSprites(5,0)
			}
			//normal movement:
			//down						
			else if( this.dx === 0 && this.dy === 1){
				this.pickSprites(0,animationIndex);
				animationIndex ? animationIndex = 1 : animationIndex = 0;
			}
			//up
			else if(this.dx === 0 && this.dy === -1){
				this.pickSprites(3,animationIndex);
				animationIndex ? animationIndex = 0 : animationIndex = 1;
			}	
			//right
			else if(this.dx === 1 && this.dy === 0){

				this.pickSprites(2,animationIndex);
				animationIndex ? animationIndex = 0 : animationIndex = 1;
			}
			//left
			else if(this.dx === -1 && this.dy === 0){
				this.pickSprites(1,animationIndex);
				animationIndex ? animationIndex = 0 : animationIndex = 1;
			}			
		}	
			this.x_pos += this.dx*this.speed;
			this.y_pos += this.dy*this.speed;
	}
	

	Enemy.prototype.giveNewTarget = function(){
		this.target = [Math.floor((Math.random() * (CW-this.width))), Math.floor((Math.random() * (CH-this.height)))];
	}
	Enemy.prototype.nextPosition = function(){
		if(Math.abs(Math.abs((this.target[0] - this.x_pos)) - Math.abs((this.target[1] - this.y_pos))) <= 2){
			//right-up
			if((this.target[0] - this.x_pos) > 0 && (this.target[1] - this.y_pos) < 0){
				this.dx = 1;
				this.dy = -1;
			}
			//right-down
			if((this.target[0] - this.x_pos) > 0 && (this.target[1] - this.y_pos) > 0){
				this.dx = 1;
				this.dy = 1;
			}
			//left-up
			if((this.target[0] - this.x_pos) < 0 && (this.target[1] - this.y_pos) < 0){
				this.dx = -1;
				this.dy = -1;
			}
			//left-down
			if((this.target[0] - this.x_pos) < 0 && (this.target[1] - this.y_pos) > 0){
				this.dx = -1;
				this.dy = 1;
			}						
		}
		else{

		if(Math.abs(this.target[0] - this.x_pos) > Math.abs(this.target[1] - this.y_pos)){
			// right
			if( this.target[0] - this.x_pos > 0){
				this.dx = 1;
				this.dy = 0;
			}
			// left
			else{
				this.dx = -1;
				this.dy = 0;
			}
		}
		else{
			//down
			if( this.target[1] - this.y_pos > 0 ){
				this.dx = 0;	
				this.dy = 1;
			}
			//up
			else{
				this.dx = 0;			
				this.dy = -1;
			}
		}
	}
		return;

	}
	Enemy.prototype.targetReached = function(){
		if( Math.abs(this.target[0] - this.x_pos) <= this.speed && Math.abs(this.target[1] - this.y_pos) <= this.speed ){
			return true;
		}
	}

	Enemy.prototype.render = function(){
		// Draw sprite

		this.context.drawImage(
			this.image,
			this.frameIndex_x,
			this.frameIndex_y,								
			this.width,
			this.height,
			this.x_pos,				
			this.y_pos,				
			this.width,
			this.height);
	}