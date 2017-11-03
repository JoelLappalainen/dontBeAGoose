
function Pizza (x_pos, y_pos, width, height, img){
	this.context = ctx;
	this.x_pos = x_pos;
	this.y_pos = y_pos;
	this.height = height;
	this.width = width;
	this.target = [];
	this.image = img;
}

Pizza.prototype.newLocation	=function(){
	this.x_pos = Math.floor((Math.random() * (CW-this.width) ) + 1);
	this.y_pos = Math.floor((Math.random() * (CH-this.height) ) + 1);
}
Pizza.prototype.render = function(){
	// Draw sprite
		this.context.drawImage(
		this.image,
		this.x_pos,				
		this.y_pos,				
		this.width,
		this.height);
}