var Tower = {
	name: 'tower',
	x: 400,
	y: 500,
	theta: 0,
	target: null,
	coolDown: 0,
	recovery: 100,
	shotSpeed: 15,
	shotDamage: 20,
	boomColor: 'red',
	shotRadius: 50,
	price: 20,
	shots: [],
	drawBase: function(ctx) {

		ctx.beginPath();
		ctx.fillStyle="rgb(200,200,240)";
		ctx.fillRect(-10, -10, 20, 20);

		ctx.lineWidth = 1;
		ctx.strokeStyle="rgb(50,100,120)";
		ctx.strokeRect(-10, -10, 20, 20);


	},
	
	drawGun: function(ctx){

		ctx.fillStyle="rgb(100,200,240)";
		ctx.strokeStyle="rgb(50,100,120)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.rect(-25 + this.coolDown * 0.1, -2, 30 - this.coolDown * 0.1, 4);
		ctx.stroke();
		ctx.fill();

		ctx.fillStyle="rgb(200,200,240)";
		ctx.strokeStyle="rgb(50,100,120)";
		ctx.beginPath();

		ctx.rect(-5, -5, 10, 10);
		ctx.stroke();
		ctx.fill();
	},

	drawShot: function(ctx) {
		ctx.fillStyle = "orange";
		ctx.fillRect(-10, -2, 20, 4);


	},

};