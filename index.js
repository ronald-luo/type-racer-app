data = {
    dummyText: "haha you're so cute, i have a dod on uwu",
    counter: 0,
    time: 0,
    kill: {},
    words: 0,
};


(function firstKeyStroke () {
    document.addEventListener('keypress', timer,
    {once: true})
})();

(function keyChecker () {
    document.addEventListener('keypress', (e) => {
        if (data.counter === (data.dummyText.length - 1)) {
            clearInterval(data.kill)
            displayWPM()
            data.counter += 1
        } else {
            data.word += e.key
            console.log(data.counter)
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
    fetch('./node_modules/an-array-of-english-words/index.json')
    .then((response) => {
        return response.json()
    })
    .then((list) => chooseTwentyFive(list))
};

function chooseTwentyFive (words) {
    data.dummyText = "" // reset text

    for (let i = 0; i<10; i++) {
        randInt = Math.floor(Math.random() * words.length)
        data.dummyText += words[randInt] + " "
    }
    
    initalizeDummyText()
};

(function hardButton () {
    document.getElementById('hard').addEventListener('click', randomDummyTextGen)
    data.counter = 0;
    data.time = 0;
})();

(function easyButton () {
    document.getElementById('easy').addEventListener('click', () => {
        data.dummyText = "haha you're so cute, i have a dod on uwu"
    })
    data.counter = 0;
    data.time = 0;

    initalizeDummyText()
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

function timer () {
    let start = Date.now();
    let kill = setInterval(function() {
    let delta = Date.now() - start;

    console.log(Math.floor(delta / 1000));
    // // console.log(Math.floor(delta))
    // console.log(new Date().toUTCString());
    data.time = delta
    data.kill = kill
    
}, 1000)}

// Takes a paragraph, and the current count as input.
// Returns an array that contains the paragraph sliced in 2, right where the current count is.
function paragraphSlicer (text,i) {
    try {
        const first = text.slice(0,i)
        const current = text[i]
        const second = text.slice(i+1, text.length)
        return [first, current, second]

    } catch (e) {
        
    }
    // return [first, current, second]
}

// Checks the computers current letter against the users current letter.
// returns a boolean.
function letterComparer (pressed, current) {
    console.log(pressed === current)
    return (pressed === current)
}

function pressSpaceBar () {
    let temp = data.word
    data.word = ""
    console.log(temp)
}

function displayWPM () {
    let div = document.createElement('div')
    let container = document.querySelector('body')
    let wpm = (data.words * 60) / (data.time / 1000)
    let wpmFixed = wpm.toFixed(2)

    div.setAttribute('style', 'font-size: 10em; text-align: center;')
    div.textContent = `${wpmFixed}WPM`

    container.appendChild(div)
}

(function howManyWords(words) {
    let j = 0
    for (let i = 0; i<words.length;i++) {
        if (words[i] === " ") {
            j++
        }
    }

    data.words = (j + 1)

})(data.dummyText)