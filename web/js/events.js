//This module defined functions for buttons and events
//This module requires canvas.js
//written by: Luke Brown


//Variable Declaration
//-------------------

var currLevelNum = 1,                                                               //Defaults level 1
    currLevel = Levels[currLevelNum - 1],                                           //Defaults level 1
    currSoln = new UserSolution("", new Solution(0, false, currLevel.graph), 0, 0), //Defaults level 1

    inDrawMode = true,                                                              //Defaults Draw  Mode enabled
    inEraseMode = !inDrawMode;                                                      //Defaults Erase Mode disabled


//Getter functions
//----------------

//getDrawRestriction: Number[0,∞)
function getDrawRestriction() {
    "use strict";
    return currLevel.restriction.draw;
}

//getEraseRestriction: Number[0,∞)
function getEraseRestriction() {
    "use strict";
    return currLevel.restriction.erase;
}

//getHint1: String
function getHint1() {
    "use strict";
    return currLevel.hint1;
}

//getHint2: String
function getHint2() {
    "use strict";
    return currLevel.hint2;
}


//Event Functions
//----------------

//loadLevel: Void
function loadLevel() {
    "use strict";
    currLevel = Levels[currLevelNum - 1];
    currSoln = new UserSolution("", new Solution(0, false, currLevel.graph), 0, 0);
    console.log("loaded level", currLevelNum);
    showHint();
}

//addLine: Posn Posn -> Void
function addLine(point1, point2) {
    "use strict";
    if (currSoln.linesDrawn < getDrawRestriction()){
        console.log("adding line to solution");
        var newSoln = currSoln,
            l = new Line(point1, point2);

        newSoln.solution.sGraph.push(l);
        newSoln.linesDrawn += 1;
        newSoln.back = currSoln;
        currSoln = newSoln;
        console.log("added line to solution");
    } else {
        //Add error message
    }
}

//removeLine: Posn -> Void
function removeLine(point) {
    "use strict";
    if (currSoln.linesErased < getEraseRestriction()){
        var newSoln = currSoln,
            graph = newSoln.solution.sGraph,
            index = getErasedIndex(point, graph);

        if (index > -1) {
            console.log("removing line from solution");
            newSoln.solution.sGraph = newSoln.solution.sGraph.splice(index, 1);
            newSoln.linesErased += 1;
            newSoln.back = currSoln;
            currSoln = newSoln;
            console.log("removed line from solution");
        }
    } else {
        //Add error message
    }
}

//undo: Void
function undo() {
    "use strict";
    var newSoln = currSoln.back;
    if (newSoln !== "") {
        currSoln = newSoln;
        console.log("undoed");
    }  
    currSoln = currSoln.back;
}

//activateDrawMode: Void
function activateDrawMode() {
    "use strict";
    inDrawMode = true;
    inEraseMode = !inDrawMode;
    console.log("activated DrawMode");
}

//activateEraseMode: Void
function activateEraseMode() {
    "use strict";
    inEraseMode = true;
    inDrawMode = !inEraseMode;
    console.log("activated EraseMode");
}

//rotateGraph: Void
function rotateGraph() {
    "use strict";
    console.log("rotating graph 90 degree");
    console.log("currSolution = ", currSoln);
    var newSoln = currSoln,
        rotation = newSoln.solution.rotation,
        flip = newSoln.solution.isFliped;

    if (flip) { newSoln.solution.rotation = (rotation + 270) % 360; }
    else { newSoln.solution.rotation = (rotation + 90) % 360; }
    newSoln.back = currSoln;
    currSoln = newSoln;
    console.log("new currSolution = ", currSoln);
    console.log("rotated graph 90 degree");
}

//flipGraph: Void
function flipGraph() {
    "use strict";
    console.log("reflecting graph");
    var newSoln = currSoln,
        flip = newSoln.solution.isFliped,
        rotation = newSoln.solution.rotation;

    newSoln.solution.isFliped = !flip;
    newSoln.solution.rotation = (rotation + 180) % 360;
    newSoln.back = currSoln;
    currSoln = newSoln;
    console.log("reflected graph");
}

//showHint: Void
function showHint() {
    "use strict"; 
    console.log("showing hints")
    var hints = "1) " + getHint1() + "\n2) " + getHint2(),
        restrictions = "\nlines allowed drawn: " + (getDrawRestriction()).toString() + "\nlines allowed erased: " + (getEraseRestriction()).toString();
    App.dialog({
        title        : "Level " + currLevelNum.toString() + " Hints",
        text         : hints + restrictions,
        cancelButton : "OK"});
}

//resetGraph: Void
function resetGraph() {
    "use strict";
    var newSoln = new UserSolution(currSoln, new Solution(0, false, currLevel.graph), 0, 0);
    currSoln = newSoln;
    console.log("reseted graph")
}

//checkSolution: Void
function checkSolution() {
    "use strict";
    console.log("checking solution");
    if (solutionEqual(currLevel.solution, currSoln)){
        App.dialog({
            title        : "Success!",
            text         : "Congratulations, you beat level " + currLevel + " press OK to continue.",
            cancelButton : "OK"});
        currLevel += 1;
        loadLevel();
    } else {
        App.dialog({
            title : "Incorrect",
            text : "Your guess was wrong.",
            cancelButton : "OK"});
    }
}
