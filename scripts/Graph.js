function Graph(options) {
    options = options || {};
    var id = options.id;
    var width = options.width || 800;
    var height = options.height || 800;
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
    var callbacks = options.callbacks;
    canvas.addEventListener('wheel', callbacks.wheel);
    canvas.addEventListener('mouseup', callbacks.mouseup);
    canvas.addEventListener('mousedown', callbacks.mousedown);
    canvas.addEventListener('mousemove', callbacks.mousemove);

    function xs(x) {
        return (x - WIN.LEFT) / WIN.WIDTH * canvas.width;
    }

    function ys(y) {
    return canvas.height - (y - WIN.BOTTOM) / WIN.HEIGHT * canvas.height;
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

    this.clear = function(){
        context.fillStyle = '#ddd';
        context.fillRect(0,0,canvas.width, canvas.height);
    }

    this.sx = function(x){
        return x + WIN.WIDTH / canvas.width;
    }

    this.sy = function(y){
        return y + WIN.HEIGHT / canvas.height;
    }
}