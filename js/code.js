// Selectors
let startGameSpan = document.querySelector(".control-buttons span");
let nameSpan = document.querySelector(".name span");
let StartBackGround = document.querySelector(".control-buttons");
let wrongTriesSpan = document.querySelector(".tries span");
let clicksSpan = document.querySelector(".clicks span");

let correctSound = document.querySelector("#success");
let wrongSound = document.querySelector("#fail");
let backgroundMusic = document.querySelector("#background-music");

let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children)
let orderRange = [...Array(blocks.length).keys()]
let duration = 1000;

// Start Game
startGameSpan.onclick = function () {
    let name = prompt("What is Your Name?");

    if (name === null || name === "") {
        nameSpan.innerHTML = "Unkown";
    } else {
        nameSpan.innerHTML = name;
    }

    // Removing the start game window 
    StartBackGround.remove();

    // Background music 
    backgroundMusic.play();

}

// Shuffle the orderRange Array
Shuffle(orderRange);

// Add order css property to game-blocks
blocks.forEach((block, index) => {

    // Add Css Order Property
    block.style.order = orderRange[index];

    // Add Clicking Event
    block.onclick = function () {

        // Flip The Block
        flip(block);

    }
})

// Functions 

// Shuffle Function
function Shuffle(arr) {

    let current = arr.length,
        temp,
        random;

    while (current > 0) {

        // Get random number
        random = Math.floor(Math.random() * current);

        // Decrease length --
        current--;

        // Saving the random values to the new shuffled array
        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;

    }

    return arr;

}

// Flip Function
function flip(selectedBlock) {

    // Add Class Flip
    selectedBlock.classList.add("flip")

    // Collect All Flipped Cards
    let allFlipped = blocks.filter(flippedBlock => flippedBlock.classList.contains("flip"))

    if (allFlipped.length === 2) {

        // Stop The Clicking Event
        stopClicking();

        // Matching Method
        match(allFlipped[0], allFlipped[1]);
    }

}

// Stop Clicking Function
function stopClicking() {

    // Add Class NO-Clicking on Main Container
    blocksContainer.classList.add("no-clicking");

    // Wait Durtion
    setTimeout(() => {

        // Remove Class No-Clicking
        blocksContainer.classList.remove("no-clicking");

    }, duration)

}

// Check Matched Block
function match(first, second) {

    if (first.dataset.tech === second.dataset.tech) {

        // Removing Flip Class
        first.classList.remove("flip")
        second.classList.remove("flip")

        // Adding Match Class
        first.classList.add("match")
        second.classList.add("match")

        // Correct Sound
        correctSound.play();

    } else {

        // Increase Wrong Times Number
        wrongTriesSpan.innerHTML = parseInt(wrongTriesSpan.innerHTML) + 1;

        setTimeout(() => {
            first.classList.remove("flip")
            second.classList.remove("flip")
        }, duration)

        // Wrong Sound
        wrongSound.play();
    }
}
