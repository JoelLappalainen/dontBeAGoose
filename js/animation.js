var imgs = {};
var loaded = false;
$("#pause-game").hide();
var paused = false;
function createGame(){
	// Player starting position (middle of canvas)
	window.middle_x = (CW / 2) - 16;
	window.middle_y = (CH / 2) - 18;
	window.player = new Player(middle_x, middle_y, 32, 36,10, imgs.p, 0, 0);			
	window.sprites = [];
	sprites.push(player);

	// 4 enemys to corners + their targets
	window.enemy1 = new Enemy(10, 10, 66, 66, imgs.e, 5, 0, 0);
	window.enemy2 = new Enemy(CW-73, 10, 66, 66, imgs.e, 5, 0, 0);
	window.enemy3 = new Enemy(10, CH-73, 66, 66, imgs.e, 5, 3, 0);
	window.enemy4 = new Enemy(CW-73, CH-73, 66, 66, imgs.e, 5, 3, 0);
	sprites.push(enemy1);
	sprites.push(enemy2);
	sprites.push(enemy3);
	sprites.push(enemy4);
	enemy1.giveNewTarget();
	enemy2.giveNewTarget();
	enemy3.giveNewTarget();
	enemy4.giveNewTarget();

	// pizza
	window.pizza = new Pizza(middle_x +100, middle_y + 100, 40, 40, imgs.pizza)
	sprites.push(pizza);
	pizza.newLocation();

	// Animation variables
	window.animationFrame;
	window.fps = 50;
	window.then = 0;

	startGame();
}
// Keydown and Keyup events
var left = 37;
var up = 38;
var right = 39;
var down = 40;

var left_down = false;
var right_down = false;
var up_down = false;
var down_down = false;

$(document).keydown(function(e) {
	if (e.keyCode == left) {
		e.preventDefault();
		left_down = true;
		player.dx = -1;		
	}
	if (e.keyCode == right) {
		e.preventDefault();
		right_down = true;
		player.dx = 1;
	}
	if (e.keyCode == up) {
		e.preventDefault();
		up_down = true;
		player.dy = -1;
	}
	if (e.keyCode == down) {
		e.preventDefault();
		down_down = true;
		player.dy = 1;
	}
});

$(document).keyup(function(e) {
	if (e.keyCode == left) {
		e.preventDefault();
		//check if player has pressed also right
		right_down ? player.dx = 1 : player.dx = 0; 
		left_down = false;
	}
	if (e.keyCode == right) {
		e.preventDefault();
		//check if player has pressed also left
		left_down ? player.dx = -1 : player.dx = 0; 
		right_down = false;
	}
	if (e.keyCode == up) {
		e.preventDefault();
		//check if player has pressed also down
		down_down ? player.dy = 1 : player.dy = 0;
		up_down = false;
	}
	if (e.keyCode == down) {
		e.preventDefault();
		//check if player has pressed also up
		up_down ? player.dy = -1 : player.dy = 0;
		down_down = false;
	}
});

function boundaryCheck(obj){
	//check if player and check its boundaries with (*2)-scaled size
	var bl = 0;
	obj.target ? bl = 1 : bl = 2;

	// Check corners
	// TOP RIGHT
	if( (obj.x_pos + obj.dx*obj.speed + obj.width*bl) >= CW && (obj.y_pos + obj.dy*obj.speed) <= 0 ){
		obj.setCoordinates( (CW-obj.width*bl), 0 );
	}
	// TOP LEFT
	if( (obj.x_pos + obj.dx*obj.speed) <= 0 && (obj.y_pos + obj.dy*obj.speed) <= 0 ){
		obj.setCoordinates( 0, 0 );
	}
	// BOTTOM RIGHT
	if( (obj.x_pos + obj.dx*obj.speed + obj.width*bl) >= CW && (obj.y_pos + obj.dy*obj.speed + obj.height*bl) >= CH ){
		obj.setCoordinates( (CW-obj.width*bl), (CH-obj.height*bl) );
	}
	// BOTTOM LEFT
	if( (obj.x_pos + obj.dx*obj.speed) <= 0 && (obj.y_pos + obj.dy*obj.speed + obj.height*bl) >= CH ){
		obj.setCoordinates( 0,  (CH-obj.height*bl) );
	}
	// Check walls
	// RIGHT
	else if( (obj.x_pos + obj.dx*obj.speed + obj.width*bl) >= CW ){
		obj.setCoordinates( (CW-obj.width*bl), (obj.y_pos) );
	}
	// LEFT
	else if( (obj.x_pos + obj.dx*obj.speed) <= 0 ){
		obj.setCoordinates( 0, (obj.y_pos) );
	}
	// BOTTOM
	else if( (obj.y_pos + obj.dy*obj.speed + obj.height*bl) >= CH ) {
		obj.setCoordinates( (obj.x_pos), (CH-obj.height*bl) );
	}
	// TOP
	else if( (obj.y_pos + obj.dy*obj.speed) <= 0 ) {
		obj.setCoordinates( (obj.x_pos), 0 );
	}
}
function crashTest(){
	var i = 0;
	for(i; i<sprites.length; i++){
		Ea = sprites[i];
		for (var j= i+1; j<sprites.length; j++){
			Eb = sprites[j];
			if ( Ea.x_pos < Eb.x_pos + Eb.width  &&  Ea.x_pos + Ea.width  > Eb.x_pos &&
				 Ea.y_pos < Eb.y_pos + Eb.height  && Ea.y_pos + Ea.height > Eb.y_pos){
				if((Eb || Ea) === pizza){
					pizza.newLocation();
					if( Ea === player ){
						player.points += 20;
						$("#score span").html(player.points);
					}
				}
				else{
					if(Ea === player){
						player.points -= 1;
						$("#score span").html(player.points);
					}
					Eb.speed*= -1;				
					Eb.move();
				 	Eb.speed*= -1;
				 	Eb.pickSprites(6,0);
					Eb.giveNewTarget();
				}	
			}
		};
	};
}
function clear(){
	ctx.clearRect( 0, 0, CW, CH );
}
function render(){
	for (var i = 0 ; i < sprites.length - 1; i++) {		
		// render sprites
		sprites[i].move();
		crashTest();
		boundaryCheck(sprites[i])
		sprites[i].render();
	}
}
function animation_loop(time){
	// Match animation to FPS rate
	if((time-then)>(1000/fps)){
		clear();
		render();
		pizza.render();	
		then = time;	
	}
	if(!paused){
		animationFrame = requestAnimationFrame(animation_loop);		
	}
}
function startGame(){
	animationFrame = requestAnimationFrame(animation_loop);
}

$(document).ready(function(){
	$("#start").click(function(){
		$("#start").hide();
		$("#pause-game").show();
		if(!paused){
			loaded ? createGame() : preLoadImages();
		}
		else{
			startGame();
		}
		paused = false;
	});
});

//delete enemys
$("canvas").click(function(e){
	// mouse coordinates
	var Xmouse = e.clientX + document.body.scrollLeft;
	var Ymouse = e.clientY + document.body.scrollTop;
    // mouse coordinates in the canvas
	var cnvOffset = $(this).offset();
	var mX = Xmouse - cnvOffset.left;
	var mY = Ymouse - cnvOffset.top;

	for (var i = sprites.length - 1; i > 0; i--) {
				if( sprites[i].x_pos < mX && mX < sprites[i].x_pos+sprites[i].width && sprites[i].y_pos < mY && mY < sprites[i].y_pos+sprites[i].height ){
					$("span#game-info").text("Enemy deleted").show().fadeOut( 2000 );
					sprites.splice(i,1);
				}			
		};
});
$(document).ready(function(){
	$("#pause-game").click(function(){
		$("#start").show();
		$("#pause-game").hide();
		paused = true;
	});
});
$(document).ready(function(){
	$("#faster").click(function(){
		player.speed <= 20 ?  player.speed += 2 : $("#game-info").text("Can't go faster").show().fadeOut(3000);
	});
});
$(document).ready(function(){
	$("#slower").click(function(){
		player.speed >= 4 ? player.speed -= 2 : $("#game-info").text("Can't go slower").show().fadeOut(3000);
	});
});
function preLoadImages(){
	var p_img = new Image();
	var e_img = new Image();
	var pizza_img = new Image();
	p_img.src = "images/player_sprites.png";
	e_img.src = "images/enemy_sprites3.png";
	pizza_img.src = "images/pizza_sprite.png";
	p_img.onload = function(){loaded = true;}
	imgs.p = p_img;
	imgs.e = e_img;
	imgs.pizza = pizza_img;
	createGame();
}

