var Menus = {

	init: function() {
		this.towerTypes = [Tower, Cannon];
		this.selectedTower = Tower;

		this.renderTowerButtons();
		document.querySelector('.tower-button').classList.add('selected');
	},

	towerTypes: [],

	renderTowerButtons: function() {
		var towerMenu = document.getElementById('towers');
		for(var i = 0; i < Menus.towerTypes.length; i++){
			var tower = Menus.towerTypes[i];
			var div = document.createElement('div');
			div.classList.add('tower-button');
			var canvas = document.createElement('canvas');
			canvas.height = 120;
			canvas.width = 120;
			div.appendChild(canvas);
			var ctx = canvas.getContext('2d');
			ctx.translate(60, 60);
			tower.drawBase(ctx);
			tower.drawGun(ctx);
			towerMenu.appendChild(div);
			div.setAttribute('name', tower.name);

			var stats = document.createElement('div');
			stats.classList.add('stats');
			stats.innerHTML = '$' + tower.price + '<b>  ' + tower.name + '</b>';
			div.appendChild(stats);

			div.addEventListener("click", function(){
				var tower = Menus.towerTypes.find((t) => t.name == this.getAttribute('name'));
				Menus.selectedTower = tower;
				const selectedButton = document.querySelector('.tower-button.selected');
				if(selectedButton) {
					selectedButton.classList.remove('selected');
				}
				
				this.classList.add('selected');
			});
		}
	},

};