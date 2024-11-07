function Graph(options) {
    options = options || {};
    var id = options.id;
    var width = options.width || 1000;
    var height = options.height || 1000;
    var WIN = options.WIN || {};
    var canvas;

    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement("canvas");
        document.querySelector("body").appendChild(canvas);
    } 

    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");

    function xs(x) {
        return (x - WIN.LEFT) / WIN.WIDTH * canvas.width;
    }

    function ys(y) {
        return (y - WIN.BOTTOM) / WIN.HEIGHT * canvas.height;
    }

    this.line = function(x1, y1, x2, y2, color, width) {
        context.beginPath();
        context.strokeStyle = color || "red";
        context.lineWidth = width || 2;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.closePath();
        context.stroke();
    }

    this.axes = function() {
        context.strokeStyle = 'lightgray';
        
        for(i = WIN.BOTTOM; i < WIN.HEIGHT; i++) {
            context.beginPath();
            context.moveTo(xs(i), ys(WIN.BOTTOM));
            context.lineTo(xs(i), ys(WIN.HEIGHT));
            context.closePath();
            context.stroke();
        };

        for(j = WIN.LEFT; j < WIN.WIDTH; j++) {
            context.beginPath();
            context.moveTo(xs(WIN.LEFT), ys(j));
            context.lineTo(xs(WIN.WIDTH), ys(j));
            context.closePath();
            context.stroke();
        };

        context.strokeStyle = 'black';
        context.beginPath();
        context.moveTo(xs(0), ys(WIN.BOTTOM));
        context.lineTo(xs(0), ys(WIN.HEIGHT));
        context.moveTo(xs(WIN.LEFT), ys(0));
        context.lineTo(xs(WIN.WIDTH), ys(0));
        context.closePath();
        context.stroke();
    };

    
}