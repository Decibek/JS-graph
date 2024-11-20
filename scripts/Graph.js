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
}