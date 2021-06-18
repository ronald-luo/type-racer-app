let data = ""

let paragraph = document.getElementById('game-text')
dataStructure(paragraph)
console.log(paragraph.textContent)

function dataStructure () {
    

}

function wordComparer () {

}

function pressSpaceBar () {
    let temp = data
    data = ""
    console.log(temp)
}

document.addEventListener('keypress', (e) => {
    if (e.key === " ") {
        console.log('')
        pressSpaceBar()
    }
    else {
        data += e.key
    }
})

function logIt (e) {
    console.log(e.key)
}

