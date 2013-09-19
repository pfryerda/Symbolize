//This module is used to define the functions used for the canvas
//Written by: Luke Brown


//Editing Functions
//-----------------
//rotateLine: Line -> Line
function rotateLine(l) {
    "use strict";
    return new Line(new Posn((SCALING - l.p1.y), l.p1.x), new Posn((SCALING - l.p2.y), l.p2.x), l.owner);
}

//unrotateLine: Line -> Line
function unrotateLine(l) {
    "use strict";
    return new Line(new Posn(l.p1.y, (SCALING - l.p1.x)), new Posn(l.p2.y, (SCALING - l.p2.x)), l.owner);
}

//flipLine: Line -> Line
function flipLine(l) {
    "use strict";
    return new Line(new Posn((SCALING - l.p1.x), l.p1.y), new Posn((SCALING - l.p2.x), l.p2.y), l.owner);
}

//Graphing Functions
//------------------

//clearCanvas: Canvas -> Void
function clearCanvas(can) {
    "use strict";
    console.log("clearing canvas");
    can.width = can.width;
}

//drawLine: Line -> Bool -> Context -> Void
function drawLine(line, isGridLine, ctx) {
    "use strict";
    if (isGridLine) { console.log("drawing grid line"); }
    else { console.log("drawing line"); }
    ctx.beginPath();
    ctx.moveTo(line.p1.x + (0.5 / SCALING), line.p1.y + (0.5 / SCALING));
    ctx.lineTo(line.p2.x + (0.5 / SCALING), line.p2.y + (0.5 / SCALING));
    if (isGridLine) {
        ctx.lineWidth = 1/30; 
        ctx.strokeStyle = '#A0A0A0';
        ctx.lineCap = 'butt'
    }
    else { 
        ctx.lineWidth = 2/5; 
        ctx.strokeStyle = '#000000'
        ctx.lineCap = 'round';  
    }
    ctx.stroke();
    ctx.closePath();
}

//drawGraph: Graph -> Bool -> Context -> Void
function drawGraph(graph, isGrid, ctx) {
    "use strict";
    if (isGrid) { console.log("drawing grid"); }
    else { console.log("drawing graph"); }
    for (var i = 0; i < graph.length; i += 1) { 
        drawLine(graph[i], isGrid, ctx); 
    }
}

//drawSolution: UserSolution -> Canvas -> Context ->  Void
function drawSolution(userSoln, can, ctx) {
    "use strict";
    console.log("starting canvas drawing");

    clearCanvas(can);                                           //Clears the canvas
    ctx.save();                                                 //Saves current coords
    ctx.scale(can.width / SCALING,                              //Scales the graph to have a max width and height of SCALING
        can.height / SCALING);                

    if (includeGrid || DEVMODE) { drawGraph(GRID, true, ctx); } //Draws the grid
    drawGraph(userSoln.solution, false, ctx);                   //Draws the graph

    ctx.restore();                                              //Resets the coords for the next draw
    console.log("finished canvas drawing");
}
