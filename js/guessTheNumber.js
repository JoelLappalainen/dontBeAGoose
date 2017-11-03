$(document).ready(function(){

	function getRandomInteger(min, max){
		return Math.round(Math.random() * (max - min + 1)) + min;
	}
	var correctNumber = getRandomInteger(1, 10);
	console.log(correctNumber);

	guessTheNumber = function(guess){
		if(guess == correctNumber){
			console.log("Correct")
		}
		else if(guess < correctNumber){
			console.log("Too small")
		}
		else{
			console.log("Too big")
		}
	}
});