data = {
    dummyText: "haha you're so cute, i have a dod on uwu",
    counter: 0,
    time: 0,
    killTimer: {},
    words: 0,
};

firstKeyStroke()
howManyWords(data.dummyText)

// adds keypress listener and starts timer on the first keystroke
function firstKeyStroke () {
    document.addEventListener('keypress', timer,
    {once: true})
};

// 
//  
(function keyChecker () {
    document.addEventListener('keypress', (e) => {
        if (data.counter === (data.dummyText.length - 1)) {
            clearInterval(data.killTimer)
            displayWPM()
        } else {
            // console.log(data.counter)
            letterComparer(e.key, data.dummyText[data.counter]) ? data.counter += 1 : data.counter += 0;
            displayLetter(data.counter)
        }
    })
})();

function initalizeDummyText () {
    let paragraph = document.getElementById('game-text')
    paragraph.textContent = data.dummyText
}

initalizeDummyText()

function randomDummyTextGen() {
    fetch('index.json')
    .then((response) => {
        return response.json()
    })
    .then((list) => chooseTwentyFive(list))
};

function chooseTwentyFive (words) {
    data.dummyText = "" // reset text
    let temp = ""

    for (let i = 0; i<5; i++) {
        randInt = Math.floor(Math.random() * words.length)
        temp += words[randInt] + " "
    }
    
    let result = temp.slice(0, temp.length - 1)
    data.dummyText = result
    howManyWords(data.dummyText)
    initalizeDummyText()
};

(function hardButton () {
    document.getElementById('hard').addEventListener('click', () => {
        firstKeyStroke()
        randomDummyTextGen()
        data.counter = 0;
        data.time = 0;
    })
})();

(function easyButton () {
    document.getElementById('easy').addEventListener('click', () => {
        firstKeyStroke()
        data.dummyText = "haha i have a crush on uwu"
        initalizeDummyText()
        data.counter = 0;
        data.time = 0;
        howManyWords(data.dummyText)
    })
})();

// uses the current count to determine which letter the user is currently on
// sliding window: break the paragraph at the current count, style it differently.
function displayLetter (count) {
    let paragraph = document.getElementById('game-text')
    const start = `<span style="color:green">`
    const end = '</span>'
    const specstart = `<span style="text-decoration: underline;">`
    const specend = '</span>'
    let result = paragraphSlicer(data.dummyText, count)
    if (result[1] === undefined) {
        result[1] = ""
    }
    
    paragraph.innerHTML = `${start}${result[0]}${end}${specstart}${result[1]}${specend}${result[2]}`
};

// Accurate timer that calls itself every 1000ms
// provides elapsed time and reference to itself
function timer () {
    let start = Date.now();
    let kill = setInterval(function() {
    let delta = Date.now() - start;

    // console.log(Math.floor(delta / 1000));
    // console.log(Math.floor(delta))
    // console.log(new Date().toUTCString());

    data.time = delta
    data.killTimer = kill
    
    }, 1000)
}

// Takes a paragraph, and the current count as input.
// Returns an array that contains the paragraph sliced in 2, right where the current count is.
function paragraphSlicer (text,i) {
    try {
        const first = text.slice(0,i)
        const current = text[i]
        const second = text.slice(i+1, text.length)
        return [first, current, second]

    } catch (e) {
        // do nothing
    }
}

// Checks the computers current letter against the users current letter.
// returns a boolean.
function letterComparer (pressed, current) {
    // console.log(pressed === current)
    return (pressed === current)
};

// displays wpm on the screen
function displayWPM () {
    let container = document.getElementById('wpm-container')
    let wpm = (data.words * 60) / (data.time / 1000) // questionable formula
    let wpmFixed = wpm.toFixed(2)

    container.textContent = `${wpmFixed}WPM`
}

// determines the number of words 
// 
function howManyWords(words) {
    let j = 0
    for (let i = 0; i<words.length;i++) {
        if (words[i] === " ") {
            j++
        }
    }

    data.words = (j + 1)

}