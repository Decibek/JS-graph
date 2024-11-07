function f(x) {
    return Math.sin(x);
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
    graph.axes();
    renderFunction(f, 'red', 1);
};