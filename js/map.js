var Map = {

    

    path: [{x: 0, y: 0}, {x: 140, y: 470}, {x: 200, y: 500},
    {x: 300, y: 450},
    {x: 400, y: 150},
    {x: 470, y: 140},
    {x: 520, y: 200},
    {x: 600, y: 800} ],

        backgroundColor: 'rgb(101, 143, 119)',
        pathWidth: 20,
        pathColor: 'rgb(200, 100, 100)',
        width: 800,
        height: 800,

    draw: function() {

        var ctx = document.getElementById('map').getContext('2d');

        ctx.save();

        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.lineJoin = 'round';
        ctx.strokeStyle = this.pathColor;
        ctx.lineWidth = this.pathWidth;

        for(var j = 0; j < 10; j++){
            ctx.globalAlpha *= 0.8;
            ctx.lineWidth *= 1.05;

            ctx.beginPath();
        ctx.moveTo(this.path[0].x, this.path[0].y);
        for(var i = 1; i < Map.path.length; i++){
            var p = Map.path[i];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();


        }
        

        ctx.restore();
    }

};