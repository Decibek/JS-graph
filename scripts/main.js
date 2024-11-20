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
            mouseleave:mouseleave,
        }
    })

    var zoom = 0.8; var canMove = false;

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
            WIN.LEFT -= graph.sx(event.movementX) * 0.025;
            WIN.BOTTOM -= graph.sy(event.movementY) * 0.025;
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
        for (x = 0; x < WIN.WIDTH + WIN.LEFT; x++) { //от 0 до х+
            graph.line(x, WIN.BOTTOM, x,  WIN.HEIGHT + WIN.BOTTOM, 'lightgrey', 1) //ось y
        }
        
        for (x = 0; x > WIN.LEFT; x--) {
            graph.line(x, WIN.BOTTOM, x,  WIN.HEIGHT + WIN.BOTTOM, 'lightgrey', 1); //ось y
        }
        
        for (x = 0; x > WIN.BOTTOM; x--) { 
            graph.line(WIN.LEFT, x, WIN.WIDTH + WIN.LEFT, x, 'lightgrey', 1);
        }

        for (x = 0; x < WIN.HEIGHT + WIN.BOTTOM; x++) { 
            graph.line(WIN.LEFT, x, WIN.WIDTH + WIN.LEFT, x, 'lightgrey', 1);
        }

        graph.line(WIN.LEFT, 0, WIN.WIDTH + WIN.LEFT, 0, 'black') //ось х
        graph.line(0, WIN.BOTTOM, 0, WIN.HEIGHT + WIN.BOTTOM, 'black') //ось y
    }
};