//var Cannon = Object.assign({}, Tower);

var Cannon = {
	name: 'cannon',
    x: 400,
	y: 500,
	theta: 0,
	target: null,
	coolDown: 0,
	recovery: 200,
	shotSpeed: 6,
	shotDamage: 20,
	boomColor: 'brown',
	shotRadius: 50,
	price: 40,
	shots: [],
	drawBase: function(ctx) {

		ctx.save();
		ctx.scale(1.1, 1);
		ctx.beginPath();
        ctx.arc(0,0,18, 0, 2 * Math.PI, false);
		ctx.fillStyle="rgb(100, 100, 100)";

		ctx.strokeStyle="rgb(0,0,30)";
		ctx.lineWidth = 1;
		ctx.fill();
		ctx.stroke();
		ctx.restore();

	},
	
	drawGun: function(ctx){

		ctx.beginPath();
		ctx.fillStyle="rgb(150, 150, 150)";

		ctx.strokeStyle="rgb(0,0,30)";
		ctx.lineWidth = 1;

		ctx.translate(this.coolDown * 0.02 - 1, 0);
        ctx.arc(0,0,12, -Math.PI * 0.5, -Math.PI * 1.5, false);
        ctx.lineTo(-30, 6);
        ctx.lineTo(-30, -6);
        ctx.lineTo(0, -12);
		ctx.fill();
		ctx.stroke();

		/*ctx.fillStyle="rgb(100,200,240)";
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
		ctx.fill();*/
	},

	drawShot: function(ctx) {
		ctx.strokeStyle="rgb(20, 20, 20)";
		ctx.fillStyle="rgb(120, 120, 120)";
		ctx.lineWidth = 1;


		ctx.beginPath();
        ctx.arc(0,0,6, 0, 2 * Math.PI, false);
		ctx.fill();
		ctx.stroke();
	},

};