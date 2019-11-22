// we need to have this variable so that we can tell if we are in hard mode or easy mode
    // the danger of always generating 6 squares is that when in easy mode, a blank square might be picked as the target
var numSquares = 6;
var colors = [];

var squares = document.querySelectorAll(".square");
var pickedColor;  
// set the html colorDisplay span to show the random color
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset"); 
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons() {
    // instead of duplicating code for easyBtn and hardBtn it's better to use 'mode' class
    for (var i=0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            // need to remove from both since we don't have access to other button from this callback function
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
    
}

function setUpSquares() {
    // with Vanilla JS, we have to loop over matches and apply changes to them individually
    for (var i = 0; i < squares.length; i++) {
        // remember - we need to avoid using arrow function here because arrow functions do not bind their own 'this' keyword
            // 'function()' DOES, so we have access to the properties of the object that was clicked on via its callback
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
    
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    // reset button text back to 'new colors' when the user resets
    resetButton.textContent = "New Colors"; 
    // on reset need to get rid of previous game text
    messageDisplay.textContent = "";

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            // need to unhide the squares when going back to hard mode from easy mode
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}
// for the easy and hard buttons, we need to toggle the 'selected class so that the style changes on the buttons
// to switch to easy, generate 3 new colors and new picked color, then hide the last 3 squares
// easyBtn.addEventListener("click", function() {
//     easyBtn.classList.add("selected");
//     hardBtn.classList.remove("selected");

//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;

//     // can loop through and set new colors at the same time as we hide the last 3 squares
//         // since colors is half the length of squares just iterate over half of squares, and shift by colors.length
//     for (var i=0; i < squares.length/2; i++) {
//        squares[i].style.backgroundColor = colors[i];
//        squares[i + colors.length].style.display = "none"; 
//     }
// });

// hardBtn.addEventListener("click", function() {
//     easyBtn.classList.remove("selected");
//     hardBtn.classList.add("selected");

//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickColor();
//     colorDisplay.textContent = pickedColor;

//     // for hard mode, need to set display back to block to make it active again for the bottom 3 squares
//     for (var i=0; i < squares.length; i++) {
//        squares[i].style.backgroundColor = colors[i];
//        squares[i].style.display = "block"; 
//     }
// });

// callback function generates new colors when the user clicks on the 'new colors' button
resetButton.addEventListener("click", function() {
    reset();
    // colors = generateRandomColors(numSquares);
    // pickedColor = pickColor();
    // colorDisplay.textContent = pickedColor;

    // // reset button text back to 'new colors' when the user resets
    // this.textContent = "New Colors"; 
    // // on reset need to get rid of previous game text
    // messageDisplay.textContent = "";

    // for (var i = 0; i < squares.length; i++) {
    //     squares[i].style.backgroundColor = colors[i]; 
    // }
    // h1.style.backgroundColor = "steelblue";
});

// change all squares to match the color parameter
function changeColors(color) {
    for (var i=0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    h1.style.backgroundColor = color;
}

// random number between 0 and 1 turned into random integer in [0,colors.length)
function pickColor() {
    return colors[ Math.floor( Math.random() * colors.length)];
}

function generateRandomColors(num) {     
    var arr = [];

    for (var i=0; i < num; i++) {
        arr.push(randomColor());
    }

    return arr;
}

function randomColor() {
    var r = Math.floor( Math.random() * 256 );
    var g = Math.floor( Math.random() * 256 );
    var b = Math.floor( Math.random() * 256 );
    return `rgb(${r}, ${g}, ${b})`;
}