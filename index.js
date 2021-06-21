let data = {
    dummyText: "",
    counter: 0,
    time: 0,
    killTimer: {},
    words: 10,
};

// form logic:
const handleForm = (e) => {
    // console.log(e)
    // e.preventDefault() // stops form submission
    let num = document.getElementById("word-length").value
    data.words = Number(num)
    // console.log(data.words)
};

initializePage(0, 8);

(function hardButton () {
    document.getElementById('hard').addEventListener('click', () => {
        handleForm()
        initializePage(15, 40)
    })
})();

(function mediumButton () {
    document.getElementById('medium').addEventListener('click', () => {
        handleForm()
        initializePage(8, 15)
    })
})();

(function easyButton () {
    document.getElementById('easy').addEventListener('click', () => {
        handleForm()
        initializePage(0,8)
    })
})();

(function settingsButton () {
    document.getElementById('settings').addEventListener('click', displaySettings)
})();

function displaySettings () {
    let menu = document.querySelector('.menu')
    menu.classList.toggle('visibility')
}

// checks keypresses and updates counter by 1 if the expected letter === current letter.
// kills the timer when the user reaches the length of the sentence
(function keyChecker () {
    document.addEventListener('keypress', (e) => {
        if (data.counter === 1) {    
            document.addEventListener('keypress', timer, {once: true})
        }

        // clear timer, display WPM
        if (data.counter === (data.dummyText.length - 1)) {
            clearInterval(data.killTimer)
            displayWPM()
        // compare letter, update counter, display letter
        } else {
            letterComparer(e.key, data.dummyText[data.counter]) ? data.counter += 1 : data.counter += 0;
            displayUserLetter(data.counter)
        }
    })
})();

// Displays data.dummyText on the screen.
function displayDummyText () {
    let paragraph = document.getElementById('game-text')
    paragraph.textContent = data.dummyText
}

// fetches a huge list of random words
function randomDummyTextGen(min, max) {
    fetch('index.json')
    .then((response) => {
        return response.json()
    })
    .then((list) => chooseHowManyWords(list, min, max))
};

// chooses random words from wordList
function chooseHowManyWords (words, min, max) {
    data.dummyText = "" // reset text
    let temp = []

    while (temp.length < data.words) {
        let randInt = Math.floor(Math.random() * words.length)
        let word = words[randInt]
        if (word.length >= min && word.length <= max) {
            temp.push(word)
        }
    }
    
    let result = temp.join(" ")

    data.dummyText = result
    // howManyWords(data.dummyText)
    displayDummyText()
};

function initializePage (min, max) {
    // firstKeyStrokeTimer()
    randomDummyTextGen(min, max)
    // howManyWords(data.dummyText)
    displayDummyText()
    data.counter = 0;
    data.time = 0;
};

// uses the current count to determine which letter the user is currently on
// sliding window: break the paragraph at the current count, style it differently.
function displayUserLetter (count) {
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
    
    }, 100) // captures every 100ms 
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
    let wpm = (howManyWords(data.dummyText) * 60) / (data.time / 1000) // formula for wpm (60s = 1min ; ms -> s)
    let wpmFixed = wpm.toFixed(2) // brings answer to 2 decimal points

    container.textContent = `${wpmFixed}WPM`
}

// determines the number of words in a string.
function howManyWords(sentence) {
    return sentence.split(" ").length
}