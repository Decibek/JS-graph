function f(x) {
    return Math.sin(x);
}
function k(x) {
    return Math.log10(x);
}

window.onload = function() {
    var WIN = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    }

    var graph = new Graph({WIN: WIN})

    function renderFunction(f, color, width){
        var x = WIN.LEFT;
        var dx = WIN.WIDTH / 200;
        while(x < WIN.WIDTH + WIN.LEFT) {
            graph.line(x, f(x), x + dx, f(x + dx), color, width);
            x += dx;
        }
    }

    function renderOXY() {
        for(i = WIN.BOTTOM; i < WIN.HEIGHT; i++) {
            graph.line(i, WIN.BOTTOM, i, WIN.HEIGHT + WIN.BOTTOM, "lightgrey", 1)
        }
        for(j = WIN.LEFT; j < WIN.WIDTH; j++) {    
            graph.line(WIN.LEFT, j, WIN.WIDTH + WIN.LEFT, j, "lightgrey", 1)
        }
        graph.line(WIN.LEFT, 0, WIN.WIDTH + WIN.LEFT, 0, "black", 1)
        graph.line(0, WIN.BOTTOM, 0, WIN.HEIGHT + WIN.BOTTOM, "black", 1)
        
    }

    renderOXY();
    renderFunction(f, 'red', 1.5);
    renderFunction(k, 'green', 1.5);
};