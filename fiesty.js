
var delay_value = 10;

var delay_new_pet_min_base = 50;
var delay_new_pet_max_base = 100;

var delay_hide_pet_min_base = 300;
var delay_hide_pet_max_base = 600;

var delay_new_pet_min = delay_new_pet_min_base * delay_value;
var delay_new_pet_max = delay_new_pet_max_base * delay_value;

var delay_hide_pet_min = delay_hide_pet_min_base * delay_value;
var delay_hide_pet_max = delay_hide_pet_max_base * delay_value;

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

var hits = 0;
var misses = 0;

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
    if (matrix[row][col] == HAPPY) {
        var lightId = getLightId(row, col);
        $("#" + getPetId(row, col)).remove();
        $("#misses").css("background-color", "red");

        function clearBackground() {
            $("#misses").css("background-color", "");
        }

        setTimeout(clearBackground, 300);

        misses += 1;
        $("#misses").text("Misses: " + misses);

    } else if (matrix[row][col] == ANGRY) {
        var lightId = getLightId(row, col);
        $("#" + getPetId(row, col)).remove();
        $("#hits").css("background-color", "green");

        function clearBackground() {
            $("#hits").css("background-color", "");
        }

        setTimeout(clearBackground, 300);

        hits += 1;
        $("#hits").text("Hits: " + hits);
    }
}

function get_delay_new_pet_max() {
    return delay_new_pet_max;
}

function get_delay_new_pet_min() {
    return delay_new_pet_min;
}

function get_delay_hide_pet_max() {
    return delay_hide_pet_max;
}

function get_delay_hide_pet_min() {
    return delay_hide_pet_min;
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

    setTimeout(new_pet, getRandomInt(get_delay_new_pet_min(), get_delay_new_pet_max()));


    function rm_pet() {
        matrix[row][col] = EMPTY;
        $("#" + getPetId(row, col)).remove();
    }

    var x = getRandomInt(get_delay_hide_pet_min(), get_delay_hide_pet_max());
    console.log(x);
    setTimeout(rm_pet, x);

}

setTimeout(new_pet, getRandomInt(get_delay_new_pet_min(), get_delay_new_pet_max()));


$("#slider").on("input", function(){
    delay_new_pet_min = delay_new_pet_min_base * this.value;
    delay_new_pet_max = delay_new_pet_max_base * this.value;

    delay_hide_pet_min = delay_hide_pet_min_base * this.value;
    delay_hide_pet_max = delay_hide_pet_max_base * this.value;

    console.log(delay_hide_pet_min, delay_hide_pet_max);
});

