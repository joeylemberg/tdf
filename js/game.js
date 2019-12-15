var Game = {
    init: function() {
        Map.draw();

        Enemy.x = 500;
        Enemy.y = 100;


        this.enemies = [];
        for(var i = 0; i < 150; i++){
            var enemy = Object.assign({}, Enemy);
            enemy.x = -enemy.wander + Util.random() * enemy.wander;
            enemy.y = -enemy.wander + Util.random() * enemy.wander;
            enemy.speed = enemy.maxSpeed + enemy.maxSpeed * 0.1 * Util.random();
            enemy.target = {x: Map.path[0].x, y: Map.path[0].y};
            enemy.timeToSpawn = i * 10;
            this.enemies.push(enemy);
        }

        this.towers = [];
        var tower1 = Object.assign({}, Tower);
        var tower2 = Object.assign({}, Tower);
        var tower3 = Object.assign({}, Tower);
        var tower4 = Object.assign({}, Tower);
        var tower5 = Object.assign({}, Tower);
        var tower6 = Object.assign({}, Tower);
        var tower7 = Object.assign({}, Tower);
        tower2.x = 250;
        tower2.y = 150;
        tower3.x = 550;
        tower3.y = 150;
        tower4.x = 450;
        tower4.y = 300;
        tower5.x = 100;
        tower5.y = 650;
        tower6.x = 700;
        tower6.y = 600;
        tower7.x = 205;
        tower7.y = 135;
        this.towers.push(tower1);
        this.towers.push(tower2);
        this.towers.push(tower3);
        this.towers.push(tower4);
        this.towers.push(tower5);
        this.towers.push(tower6);
        this.towers.push(tower7);

        
        Game.loop()

    },

    loop: function(){
        var ctx = document.getElementById('sprites').getContext('2d');
        ctx.clearRect(0,0,Map.width, Map.height);

        this.moveEnemies();
        this.moveTowers();
        this.moveShots();
        this.moveBooms();

        this.drawEnemies();
        this.drawShots();
        this.drawTowers();
        this.drawBooms();

        requestAnimationFrame(() => {Game.loop();});

    },

    enemies: [],
    towers: [],
    shots: [],
    booms: [],

    cash: 0,
    health: 100,

    boom: function(x, y, r, damage, color, t){
        var boom = {
            x: x,
            y: y,
            maxRadius: r,
            r: r * 0.25,
            color: color || "red",
            t: t,
        };
        this.booms.push(boom);

    },

    moveBooms: function() {
        for(var i = 0; i < this.booms.length; i++) {
            var boom = this.booms[i];
            boom.r = (boom.r * boom.t + boom.maxRadius) / (boom.t + 1);
            if(boom.r > boom.maxRadius * 0.96){
                this.booms.splice(i, 1);
                i--;
            }
        }
    },

    moveTowers: function() {
        if(!this.enemies.length){
            return;
        }

         for(var i = 0; i < this.towers.length; i++) {
            var tower = this.towers[i];
            tower.target = this.enemies[i % this.enemies.length];
            tower.theta = Util.angleToShot(tower, tower.target);

            tower.coolDown--;

            if(tower.coolDown <= 0){
                tower.coolDown = tower.recovery + Math.random() * 5;
                var shot = {
                    x: tower.x,
                    y: tower.y,
                    dx: -Math.cos(tower.theta) * tower.shotSpeed,
                    dy: -Math.sin(tower.theta) * tower.shotSpeed,
                    speed: tower.shotSpeed,
                    theta: tower.theta,
                    draw: tower.drawShot,
                    target: {x: tower.target.x, y: tower.target.y}
                }
                Game.shots.push(shot);

            }

        }

    },

    moveEnemies: function() {
        for(var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            
            if(enemy.timeToSpawn > 0){
                enemy.timeToSpawn--;
                continue;

            }

            enemy.theta = Util.angleTo(enemy, enemy.target);//Math.atan2(enemy.y - enemy.target.y, enemy.x - enemy.target.x);
            enemy.dx = -Math.cos(enemy.theta) * enemy.speed;
            enemy.dy = -Math.sin(enemy.theta) * enemy.speed;

            if(Util.dist(enemy, enemy.target) < enemy.speed){
                enemy.targetIndex++;
                var target = Map.path[enemy.targetIndex];
                if(target){
                    enemy.target = {
                        x: target.x + Util.random() * enemy.wander,
                        y: target.y + Util.random() * enemy.wander,
                    };
                } else {
                    this.setHealth(Game.health - Game.enemies[i].damage);
                    this.enemies.splice(i, 1);
                    i--;
                } 
                
            }

            enemy.x += enemy.dx;
            enemy.y += enemy.dy;
        }

    },

    moveShots: function() {

        for(var i = 0; i < this.shots.length; i++) {
            var shot = this.shots[i];
            shot.x += shot.dx;
            shot.y += shot.dy;



            if(false){//} Util.dist(shot, shot.target) <= shot.speed/2){
                Game.boom(shot.target.x, shot.target.y, 50, 50, 'red', 5);
                Game.shots.splice(i, 1);
                i--;
                continue;
            }


            for(var j = 0; j < Game.enemies.length; j++){
                if(Util.dist(Game.enemies[j], shot) < 25){
                    Game.boom(Game.enemies[j].x, Game.enemies[j].y, 50, 50, 'red', 5);
                    Game.shots.splice(i, 1);
                    i--;
                    Game.setCash(Game.cash + Game.enemies[j].cash);

                    Game.enemies.splice(j, 1);
                    j--;
                    break;
                }

            }
        }

    },

    drawEnemies: function(){
        var ctx = document.getElementById('sprites').getContext('2d');
        
        for(var i = 0; i < this.enemies.length; i++) {
            var enemy = this.enemies[i];
            ctx.save();
            ctx.translate(enemy.x, enemy.y);
            ctx.rotate(enemy.theta);
            enemy.draw(ctx);
            ctx.restore();

        }

    },

    drawShots: function() {
        var ctx = document.getElementById('sprites').getContext('2d');

        for(var i = 0; i < this.shots.length; i++) {
            var shot = this.shots[i];
            ctx.save();
            ctx.translate(shot.x, shot.y);
            ctx.rotate(shot.theta);
            shot.draw(ctx);
            ctx.restore();

        }

    },


    drawBooms: function() {

        var ctx = document.getElementById('sprites').getContext('2d');

        ctx.save();

        for(var i = 0; i < this.booms.length; i++) {
            var boom = this.booms[i];
            ctx.beginPath();
            ctx.arc(boom.x, boom.y, boom.r, 0, 2 * Math.PI, false);
            ctx.globalAlpha = 1 - boom.r / boom.maxRadius ;
            ctx.fillStyle = boom.color;
            ctx.fill();
        }

        ctx.restore();
    },

    drawTowers: function() {
        var ctx = document.getElementById('sprites').getContext('2d');
        
        for(var i = 0; i < this.towers.length; i++) {
            var tower = this.towers[i];
            ctx.save();
            ctx.translate(tower.x, tower.y);
            ctx.rotate(tower.theta);
            tower.draw(ctx);
            ctx.restore();

        }

    },

    setCash: function(value){
        Game.cash = value;
        document.getElementById('cash-value').innerText = value;
    },

    setHealth: function(value) {
        Game.health = value;
        document.getElementById('health-value').innerText = value;
    },
    

}