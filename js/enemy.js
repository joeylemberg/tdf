var Enemy = {


    draw: function(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(-5, -3, 10, 6);
        ctx.fillStyle = "brown";
        ctx.fillRect(-1, -1, 10, 2);
    },
    maxSpeed: 2,
    maxHealth: 100,
    health: 100,
    speed: 2,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    target: {x: 0, y: 0},
    targetIndex: 0,
    wander: 25,
    theta: 0,
    timeToSpawn: 20,
    cash: 2,
    damage: 1,



};