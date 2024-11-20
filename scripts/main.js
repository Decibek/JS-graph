function f(x) {
    return Math.sin(x);
}

window.onload = function() {
    var WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20,
    }

    

    var graph = new Graph({
        WIN: WIN,
        callbacks: {
            wheel:wheel,
            mouseup:mouseup,
            mousedown:mousedown,
            mousemove:mousemove,
        }
    })

    var zoom = 0.2; var canMove = false;

    function wheel(event) {
        var delta = (event.wheelDelta > 0) ? -zoom : zoom;
        WIN.WIDTH += delta;
        WIN.HEIGHT += delta;
        WIN.LEFT -= delta / 2;
        WIN.BOTTOM -= delta / 2;
        render();
    }

    function mousedown() {
        canMove = true;
    }

    function mouseup() {
        canMove = false;
    }

    function mouseleave() {
        canMove = false;
    }

    function mousemove(event) {
        if (canMove) {
            WIN.LEFT -= graph.sx(event.movementX);
            WIN.BOTTOM -= graph.sy(event.movementY);
            render();
        }
    }

    function render() {
        graph.clear();
        renderOXY();
        renderFunction(f, 'red', 1.5);
    }


    function renderFunction(f, color, width) {
        var x = WIN.LEFT;
        var dx = WIN.WIDTH / 200;
        while(x < WIN.WIDTH + WIN.LEFT) {
            graph.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
    }

    function renderOXY() {
        for(var i = WIN.BOTTOM; i < WIN.HEIGHT; i++) {
            graph.line(i, WIN.BOTTOM, i, WIN.HEIGHT + WIN.BOTTOM, "lightgrey", 1)
        }
        for(var j = WIN.LEFT; j < WIN.WIDTH; j++) {    
            graph.line(WIN.LEFT, j, WIN.WIDTH + WIN.LEFT, j, "lightgrey", 1)
        }
        graph.line(WIN.LEFT, 0, WIN.WIDTH + WIN.LEFT, 0, "black", 1)
        graph.line(0, WIN.BOTTOM, 0, WIN.HEIGHT + WIN.BOTTOM, "black", 1)
        
    }
};