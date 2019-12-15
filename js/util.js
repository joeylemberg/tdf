var Util = {
    dist: function(obj1, obj2){var dx = obj1.x - obj2.x;
        var dy = obj1.y - obj2.y;
        return Math.sqrt(dx*dx + dy*dy);


    },

    angleTo(obj1, obj2){

        var dx = obj1.x - obj2.x;
        var dy = obj1.y - obj2.y;
        return Math.atan2(dy, dx);

    },

    angleToShot(obj1, obj2){

    	var lead = Util.dist(obj1, obj2);

        var dx = obj1.x - (obj2.x + obj2.dx * lead / obj1.shotSpeed);
        var dy = obj1.y - (obj2.y + obj2.dy * lead / obj1.shotSpeed);
        return Math.atan2(dy, dx);

    },

    random: function() {
    	return Math.random() - 0.5;
    }

};