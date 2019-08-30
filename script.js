//declaring variables to use throught the program

//find input for word being entered
let input = document.querySelector("input");
//find submit button
let submit = document.querySelector(".submit");
//find reset button
let reset = document.querySelector(".reset");
//array of image links. These items will be used to define a style choice function yet to be created.
// mother array
let images = []
// children arrays
let defImages = ["./images/default/1.jpg", "./images/default/2.jpg", "./images/default/3.jpg", "./images/default/4.jpg", "./images/default/5.jpg", "./images/default/6.jpg", "./images/default/7.jpg"];
let seanImages = ["./images/sean/1.jpg", "./images/sean/2.jpg", "./images/sean/3.jpg", "./images/sean/4.jpg", "./images/sean/5.jpg", "./images/sean/6.jpg", "./images/sean/7.jpg"]
images.push(defImages)
images.push(seanImages)
//define default image style choice. 
let imageStyle = 0
//define starting point for images, and set the background
let imageCount = 0;
document.querySelector('.manhang').style.backgroundImage = `url('${images[imageStyle][imageCount]}')`;
// letterCount represents letters guessed right, this variable is used to check if player has won.
let letterCount = 0;
//define an empty array to store used letters
let usedLetter = [];
// define keys to be produced for visual keyboard, generate keyboard, with event listener
var alphabet = [];
function genCharArray(charA, charZ) {
    a = charA.charCodeAt(0);
    z = charZ.charCodeAt(0);
    //loop that adds features for each letter in the alphabet 
    for (; a <= z; ++a) {
        //capitalize each letter
        let capital = String.fromCharCode(a).toUpperCase()
        //series of commands that append keys to visual keyboard, including an event listener for each key.
        let key = document.createElement('p');
        let letter = document.createTextNode(`${capital}`)
        key.appendChild(letter);
        //given a class to make it easier to manipulate in the DOM
        key.className = `key ${String.fromCharCode(a)}`

        //add event listener to each key
        key.addEventListener('click', function (evt) {
            checkLetter = evt.target.innerText
            if (usedLetter.includes(checkLetter)) {
                return alert('you have already guessed that letter, please choose a different one.')
            } else {
                usedLetter.push(checkLetter)
            }
            //check if pressed letter is in word
            if (wordArray.includes(checkLetter)) {
                evt.target.style.backgroundColor = 'rgb(97, 204, 97)';
                //run through word and put letters in correct spots
                wordArray.forEach(function (element, i) {
                    if (element === checkLetter) {
                        letterCount++
                        document.querySelector(`.blank${i + 1}`).innerText = element
                        //CHECK IF WON
                        if (letterCount === wordArray.length) {
                            document.querySelector('.results').innerText = 'Congrats! You got it right!'
                            reset.style.display = 'block';
                            document.querySelector('.visualKeyboard').style.display = 'none';
                            document.body.removeEventListener('keypress', addKeyClick)
                            document.querySelector('.results').style.display = 'flex';
                            document.querySelector('.results').style.backgroundColor = 'rgb(97, 204, 97)';
                        }
                    }
                })
                //if letter is not in word, do this
            } else {
                evt.target.style.backgroundColor = 'rgb(255, 94, 94)';
                console.log('none of that letter')
                //increase image count
                imageCount++
                //change background image
                document.querySelector('.manhang').style.backgroundImage = `url('${images[imageStyle][imageCount]}')`
                //CHECK IF LOST
                if (imageCount + 1 >= images[imageStyle].length) {
                    document.querySelector('.results').innerText = 'YOU KILLED HIM! Try again.'
                    //loop to assign all letters 
                    wordArray.forEach(function (element, i) {
                        document.querySelector(`.blank${i + 1}`).innerText = element
                    })
                    reset.style.display = 'block';
                    document.querySelector('.visualKeyboard').style.display = 'none';
                    document.body.removeEventListener('keypress', addKeyClick)
                    document.querySelector('.results').style.display = 'flex';
                    document.querySelector('.results').style.backgroundColor = 'rgb(255, 94, 94)';
                    // document.querySelector(`.blank${i + 1}`).innerText = word[i]


                }

            }
        })
        document.querySelector('.visualKeyboard').appendChild(key)
    }
}
genCharArray('a', 'z');

//add event listener to input for enter key
input.addEventListener("keypress", function (evt) {
    if (evt.keyCode === 13) {
        //prevent default, and click submit button
        evt.preventDefault();
        submit.click();
    }
})
//declare word and word array in global scope
let word;
let wordArray = [];
//add event listener for submit button
submit.addEventListener("click", function () {

    //assign input word to a variable
    word = input.value.toUpperCase();

    // attempting to add form verification
    var letters = /^[A-Za-z]+$/;
    if (!word.match(letters)) {
        return alert("you can only use letters in hangman! No special characters or spaces!");
    }
    document.querySelector('.wordChoice').style.display = 'none';
    document.querySelector('.blanks').style.display = 'flex';
    document.querySelector('.visualKeyboard').style.display = 'grid';
    //loop through the word putting each letter in to an array seperately
    for (i = 0; i < word.length; i++) {
        wordArray.push(word[i]);
        let blank = document.createElement('p');
        let empty = document.createTextNode('_')
        blank.appendChild(empty);
        blank.className = `blank${i + 1}`
        document.querySelector('.blanks').appendChild(blank)
    }
    document.body.addEventListener('keypress', addKeyClick)
})
// function must be named in order to be removed later
function addKeyClick(evt) {
    //add event listener to document to click visual keyboard on keypress.
    evt.preventDefault()
    document.querySelector(`.${evt.key}`).click()
}
//reset button returns all values to their starting values.
function resetMulti() {
    wordArray = [];
    usedLetter = [];
    document.querySelector('.wordChoice').style.display = 'block';
    document.querySelector('.visualKeyboard').style.display = 'none';
    input.value = '';
    document.body.removeEventListener('keypress', addKeyClick)
    document.querySelector('.blanks').style.display = 'none';
    document.querySelector('.blanks').innerHTML = null;
    reset.style.display = 'none';
    let children = document.querySelectorAll('.key')
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = 'cyan';
    }
    imageCount = 0;
    letterCount = 0;
    document.querySelector('.manhang').style.backgroundImage = `url('${images[imageStyle][0]}')`
    document.querySelector('.results').innerText = null;
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.results').style.backgroundColor = '#d1c5c5';
}
//add default reset button listener
reset.addEventListener('click', resetMulti)
//add event listeners for style buttons
document.querySelector('.defaultStyle').addEventListener('click', function () {
    imageStyle = 0;
    document.querySelector('.manhang').style.backgroundImage = `url('${images[imageStyle][imageCount]}')`;
    document.body.style.backgroundImage = "url('./images/sketch.png')"
    document.body.style.backgroundColor = "rgb(255, 231, 153)"
    document.body.style.fontFamily = "'Neucha', cursive"
})
document.querySelector('.seanStyle').addEventListener('click', function () {
    imageStyle = 1;
    document.querySelector('.manhang').style.backgroundImage = `url('${images[imageStyle][imageCount]}')`;
    document.body.style.backgroundImage = "url('./images/sack.png')";
    document.body.style.backgroundColor = "sandybrown"
    document.body.style.fontFamily = "'Amatic SC', cursive"
})
//reset for solo play
function resetSolo() {
    wordArray = [];
    usedLetter = [];
    document.body.removeEventListener('keypress', addKeyClick)
    document.querySelector('.blanks').style.display = 'none';
    document.querySelector('.blanks').innerHTML = null;
    reset.style.display = 'none';
    let children = document.querySelectorAll('.key')
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = 'cyan';
    }
    imageCount = 0;
    letterCount = 0;
    document.querySelector('.manhang').style.backgroundImage = `url('${images[imageStyle][0]}')`
    document.querySelector('.results').innerText = null;
    document.querySelector('.results').style.display = 'none';
    document.querySelector('.results').style.backgroundColor = '#d1c5c5';
    document.querySelector('.visualKeyboard').style.display = 'none';
    randomWord()
}
//event listener to trigger solo play
document.querySelector('.single').addEventListener('click', soloMode)
//solo mode toggle
function soloMode(){
    document.querySelector('.single').removeEventListener('click', soloMode)
    document.querySelector('.single').innerHTML = "Multi Player";
    document.querySelector('.single').style.backgroundColor = 'blue';
    randomWord()
    document.querySelector('.single').addEventListener('click', multiMode)
    document.querySelector('.wordChoice').style.display = 'none';
    reset.removeEventListener('click', resetMulti)
    reset.addEventListener('click', resetSolo)   
}
//multiplayer mode toggle
function multiMode(){
    document.querySelector('.single').removeEventListener('click', multiMode)
    document.querySelector('.single').innerHTML = "Single Player";
    document.querySelector('.single').style.backgroundColor = 'rgb(40, 241, 255)';
    document.querySelector('.single').addEventListener('click', soloMode)
    document.querySelector('.wordChoice').style.display = 'inline';
    reset.removeEventListener('click', resetSolo)
    reset.addEventListener('click', resetMulti)
    reset.click()
}
//define empty variable where we will store a word to define(webster)
let define = 'nothing';
//gets a random 'word' from wordsapi
function randomWord() {
    fetch("https://wordsapiv1.p.mashape.com/words/?random=true", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "8bbcf8b82bmsh5d4c78b130ba348p15915fjsnfb896b88221e"
        }
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            console.log(response.word)
            define = response.word
            word = response.word.toUpperCase()
            //check if word is single word, no characters
            var letters = /^[A-Za-z]+$/;
            //if false, try again
            if (!word.match(letters)) {
                return randomWord();
            } else {
                //check webster for word
                fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${define}?key=8d012909-4bf9-45f5-86df-ccdc1e275d84`)
                    .then(response => {
                        return response.json()
                    })
                    .then(response => {
                        console.log(response)
                        //if response returns large array(aka not a word), use first word
                        if (response.length === 20) {
                            console.log(response[0])
                            define = response[0]
                            word = response[0].toUpperCase()
                            webster()
                            console.log(word)
                            document.querySelector('.blanks').style.display = 'flex';
                            document.querySelector('.visualKeyboard').style.display = 'grid';
                            for (i = 0; i < word.length; i++) {
                                wordArray.push(word[i]);
                                let blank = document.createElement('p');
                                let empty = document.createTextNode('_')
                                blank.appendChild(empty);
                                blank.className = `blank${i + 1}`
                                document.querySelector('.blanks').appendChild(blank)
                            }
                            document.body.addEventListener('keypress', addKeyClick)
                            //else use word given
                        } else if (response.length === 1) {
                            console.log('its a real word', response[0].shortdef)
                            def = response[0].shortdef;
                            console.log(word)
                            document.querySelector('.blanks').style.display = 'flex';
                            document.querySelector('.visualKeyboard').style.display = 'grid';
                            for (i = 0; i < word.length; i++) {
                                wordArray.push(word[i]);
                                let blank = document.createElement('p');
                                let empty = document.createTextNode('_')
                                blank.appendChild(empty);
                                blank.className = `blank${i + 1}`
                                document.querySelector('.blanks').appendChild(blank)
                            }
                            document.body.addEventListener('keypress', addKeyClick)
                        }

                    })
            }

        })
        .catch(err => {
            console.log(err);
        });
}
document.querySelector('.define').addEventListener('click', webster)

function webster() {
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${define}?key=8d012909-4bf9-45f5-86df-ccdc1e275d84`)
        .then(response => {
            return response.json()
        })
        .then(response => {
            console.log(response[0].shortdef[0])
            shortdef = response[0].shortdef[0]

        })
}