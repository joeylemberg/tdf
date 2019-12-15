var Input = {

	init: function(){

		var game = document.getElementById('game');
		game.addEventListener('click', function(e){
			Game.addTower(e.clientX, e.clientY);
		});


	}



}