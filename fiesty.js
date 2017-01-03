
var delay_new_pet_min = 200;
var delay_new_pet_max = 200;

var delay_hide_pet_min = 1000;
var delay_hide_pet_max = 2000;

var EMPTY = 0;
var HAPPY = "happy.png";
var ANGRY = "angry.png";

var numRows = 4
var numCols = 4

var matrix = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function getLightId(row, col) {
    return "#light-" + row + "-" + col;
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getPetId(row, col) {
    return "pet-" + row + "-" + col;
}

function drawPet(row, col, pet ) {
    var tag = "<img id='" + getPetId(row, col) + "' src='" + pet + "' height='100' width='100' >";
    $(getLightId(row, col)).append(tag);
}


function lightClick(row, col) {
    alert(row + ", " + col);
}

function new_pet() {

    var row = getRandomInt(0, numRows);
    var col = getRandomInt(0, numCols);

    if (matrix[row][col] == EMPTY) {
        if (getRandomInt(0, 2) == 0) {
            matrix[row][col] = HAPPY;
        } else {
            matrix[row][col] = ANGRY;
        }

        drawPet(row, col, matrix[row][col]);

    }

    setTimeout(new_pet, getRandomInt(delay_new_pet_min, delay_new_pet_max));


    function rm_pet() {
        matrix[row][col] = EMPTY;
        $("#" + getPetId(row, col)).remove();
    }

    setTimeout(rm_pet, getRandomInt(delay_hide_pet_min, delay_hide_pet_max));

}

setTimeout(new_pet, getRandomInt(delay_new_pet_min, delay_new_pet_max));

