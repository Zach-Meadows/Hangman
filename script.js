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
            //check if letter has been guessed, if not, put it in usedLetter array
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
                }

            }
        })
        //after assigning all values to a single key, append it.
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

    //conditional for warp world
    if (input.value === '5rrr warp world') {
        keySequence = 12;
        return castWW({ key: 'd' });
    }
    //assign input word to a variable
    word = input.value.toUpperCase();

    // form validation checking for single word, letters only
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
//reset buttons returns all values to their starting values.

//reset for multiplayer
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
    document.querySelector('.definition').style.display = 'none'
    document.querySelector('.define').style.display = 'block'
    randomWord()
}

//add event listeners for style buttons

//style 1
document.querySelector('.defaultStyle').addEventListener('click', function () {
    imageStyle = 0;
    document.querySelector('.manhang').style.backgroundImage = `url('${images[imageStyle][imageCount]}')`;
    document.body.style.backgroundImage = "url('./images/sketch.png')"
    document.body.style.backgroundColor = "rgb(255, 231, 153)"
    document.body.style.fontFamily = "'Neucha', cursive"
})

//style 2
document.querySelector('.seanStyle').addEventListener('click', function () {
    imageStyle = 1;
    document.querySelector('.manhang').style.backgroundImage = `url('${images[imageStyle][imageCount]}')`;
    document.body.style.backgroundImage = "url('./images/sack.png')";
    document.body.style.backgroundColor = "sandybrown"
    document.body.style.fontFamily = "'Amatic SC', cursive"
})

//event listener to trigger solo play
document.querySelector('.single').addEventListener('click', soloMode)

//solo mode toggle
function soloMode() {
    document.querySelector('.blanks').innerHTML = '';
    console.log(document.querySelector('.blanks').innerHTML)
    wordArray = [];
    document.querySelector('.blanks').style.display = 'none';
    document.querySelector('.single').removeEventListener('click', soloMode)
    document.querySelector('.single').innerHTML = "Toggle Players</br><b>Single</b>";
    document.querySelector('.single').style.backgroundColor = 'green';
    randomWord()
    document.querySelector('.single').addEventListener('click', multiMode)
    document.querySelector('.wordChoice').style.display = 'none';
    reset.removeEventListener('click', resetMulti)
    reset.addEventListener('click', resetSolo)
    document.querySelector('.define').style.display = "block"
    document.querySelector('.definition').style.display = 'none'
}

//multiplayer mode toggle
function multiMode() {
    document.querySelector('.single').removeEventListener('click', multiMode)
    document.querySelector('.single').innerHTML = "Toggle Players</br><b>Multi</b>";
    document.querySelector('.single').style.backgroundColor = 'rgb(40, 241, 255)';
    document.querySelector('.single').addEventListener('click', soloMode)
    document.querySelector('.wordChoice').style.display = 'inline';
    reset.removeEventListener('click', resetSolo)
    reset.addEventListener('click', resetMulti)
    document.querySelector('.define').style.display = "none"
    document.querySelector('.definition').style.display = 'none'
    reset.click()
}
//define empty variable where we will store a word to define using webster()
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
            //save the word in a variable for use
            define = response.word
            //uppercase to keep consistent with wordArray checking
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
                        //variable defined using regular expressions for response validation
                        var letters = /^[A-Za-z]+$/;
                        console.log(response)
                        //if response returns large array(aka not a word according to webster), use first word
                        if (response.length > 1) {
                            console.log(response[0])
                            //if check made to accomodate varying responses
                            if (response.length > 3) {
                                //check if webster returned a word with just letters
                                if (!response[0].match(letters)) {
                                    console.log('webster returned more than just one word')
                                    //try again
                                    return randomWord()
                                } else {
                                    //set word to equal first entry
                                    define = response[0]
                                }
                                //else, if response > 1 & < 20
                            } else {
                                //check if webster returned a word with just letters
                                if (!response[0].meta.id.match(letters)) {
                                    console.log('webster returned more than just one word')
                                    //if not, try again
                                    return randomWord()
                                }
                                //otherwise save the word
                                define = response[0].meta.id
                            }
                            //save word to be put in to wordArray to be compared later
                            word = define.toUpperCase()
                            //get the definition
                            webster()
                            console.log(word)
                            //we've got a word, show the blanks, and keyboard
                            document.querySelector('.blanks').style.display = 'flex';
                            document.querySelector('.visualKeyboard').style.display = 'grid';
                            //make blanks for each letter
                            for (i = 0; i < word.length; i++) {
                                wordArray.push(word[i]);
                                let blank = document.createElement('p');
                                let empty = document.createTextNode('_')
                                blank.appendChild(empty);
                                blank.className = `blank${i + 1}`
                                document.querySelector('.blanks').appendChild(blank)
                            }
                            //turn the keyboard listener on
                            document.body.addEventListener('keypress', addKeyClick)

                            //else use word given
                        } else if (response.length === 1) {
                            console.log('its a real word', response[0].shortdef)
                            console.log(word)
                            //we've got a word, show blanks and keyboard
                            document.querySelector('.blanks').style.display = 'flex';
                            document.querySelector('.visualKeyboard').style.display = 'grid';
                            //make blanks for each letter
                            for (i = 0; i < word.length; i++) {
                                wordArray.push(word[i]);
                                let blank = document.createElement('p');
                                let empty = document.createTextNode('_')
                                blank.appendChild(empty);
                                blank.className = `blank${i + 1}`
                                document.querySelector('.blanks').appendChild(blank)
                            }
                            //turn keyboard listener on
                            document.body.addEventListener('keypress', addKeyClick)
                        }

                    })
            }

        })
        .catch(err => {
            console.log(err);
        });
}
//function to show definition section in html
function showdef() {
    document.querySelector('.definition').style.display = 'block'
    document.querySelector('.define').style.display = 'none'
}
//add event listeners to description button
document.querySelector('.define').addEventListener('click', showdef)
document.querySelector('.define').addEventListener('click', webster)

//finds definiton and puts it into definition section
function webster() {
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${define}?key=8d012909-4bf9-45f5-86df-ccdc1e275d84`)
        .then(response => {
            return response.json()
        })
        .then(response => {
            console.log(response[0].shortdef[0])
            document.querySelector('.definition').innerHTML = response[0].shortdef[0]
        })
}

//----------------ADD MAGIC MODE!----------------------
//-----------------------------------------------------

//copied code and added 'magic' to differentiate
let revealCard = ['.PT', '.setSymbol', '.cmc', '.artist', '.type', '.art', '.cardText']
let piecesRevealed = 0;
let magicLetterCount = 0;
//define an empty array to store used letters
let magicUsedLetter = [];
// define MAGIC KEYBOARD
function magicKey(charA, charZ) {
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
        key.className = `magickey magic${String.fromCharCode(a)}`
        //add event listener to each key
        key.addEventListener('click', function (evt) {
            checkLetter = evt.target.innerText
            //check if letter has been guessed, if not, put it in usedLetter array
            if (magicUsedLetter.includes(checkLetter)) {
                return alert('you have already guessed that letter, please choose a different one.')
            } else {
                magicUsedLetter.push(checkLetter)
            }
            //check if pressed letter is in word
            if (magicWordArray.includes(checkLetter)) {
                evt.target.style.backgroundColor = 'rgb(97, 204, 97)';
                //run through word and put letters in correct spots
                magicWordArray.forEach(function (element, i) {
                    if (element === checkLetter) {
                        magicLetterCount++
                        document.querySelector(`.magicblank${i + 1}`).innerText = element
                        //CHECK IF WON
                        if (magicLetterCount === magicWordArray.length) {
                            for (let i = 0; i < document.querySelector('.magic').children.length; i++) {
                                document.querySelector('.magic').children[i].style.display = 'none'
                            }
                            document.querySelector('.magicblanks').style.border = "solid rgb(43, 216, 0) 5px"
                            document.querySelector('.magic').style.border = "solid rgb(43, 216, 0) 5px"
                            document.querySelector('.newCard').removeEventListener('click', randomCard)
                            document.querySelector('.newCard').innerHTML = 'new card in 3 seconds'
                            document.querySelector('.newCard').style.backgroundColor = 'red';
                            setTimeout(twoSeconds, 1000)
                            setTimeout(oneSecond, 2000)
                            setTimeout(newCardTimed, 3000)
                            // document.querySelector('.magicvisualKeyboard').style.display = 'none';
                            // document.body.removeEventListener('keypress', magicAddKeyClick)
                        }
                    }
                })
                //if letter is not in word, do this
            } else {
                evt.target.style.backgroundColor = 'rgb(255, 94, 94)';
                document.querySelector(`${revealCard[piecesRevealed]}`).style.display = 'none';
                piecesRevealed++
                //CHECK IF LOST
                if (piecesRevealed === revealCard.length) {
                    for (let i = 0; i < document.querySelector('.magic').children.length; i++) {
                        document.querySelector('.magic').children[i].style.display = 'none'
                    }
                    //loop to assign all letters 
                    magicWordArray.forEach(function (element, i) {
                        document.querySelector(`.magicblank${i + 1}`).innerText = element
                    })
                    document.querySelector('.magicblanks').style.border = "solid red 5px"
                    document.querySelector('.magic').style.border = "solid red 5px"
                    document.querySelector('.newCard').removeEventListener('click', randomCard)
                    document.querySelector('.newCard').innerHTML = 'new card in 3 seconds'
                    document.querySelector('.newCard').style.backgroundColor = 'red';
                    setTimeout(twoSeconds, 1000)
                    setTimeout(oneSecond, 2000)
                    setTimeout(newCardTimed, 3000)
                    // document.body.removeEventListener('keypress', magicAddKeyClick);
                }

            }
        })
        //after assigning all values to a single key, append it.
        document.querySelector('.magicvisualKeyboard').appendChild(key)
    }
}
magicKey('a', 'z');

//functions defined for timeouts to change button text
function twoSeconds() {
    document.querySelector('.newCard').innerHTML = "New Card in 2 seconds";
}
function oneSecond() {
    document.querySelector('.newCard').innerHTML = "New Card in 1 second";
}

function magicAddKeyClick(evt) {
    //add event listener to document to click visual keyboard on keypress.
    evt.preventDefault()
    document.querySelector(`.magic${evt.key}`).click()
}

//hidden magic mode code
document.body.addEventListener('keydown', castWW)
let keySequence = 0;
function castWW(evt) {
    let warpWorld = ['5', 'r', 'r', 'r', 'w', 'a', 'r', 'p', 'w', 'o', 'r', 'l', 'd'];
    if (evt.key === '5') {
        keySequence = 1;
    }
    else if (evt.key === warpWorld[keySequence]) {
        keySequence++
    } else {
        keySequence = 0;
    }
    if (keySequence === warpWorld.length) {
        console.log('cast warp world');
        document.body.style.backgroundImage = "url('./images/warpworld.jpg')"
        randomCard()
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.card').style.display = 'flex'
        document.getElementsByTagName('footer')[0].style.display = 'none';
        document.getElementsByTagName('h1')[0].innerHTML = 'Magic Card Guessing Game'
        document.getElementsByTagName('h1')[0].style.color = 'cyan';
        document.getElementsByTagName('h1')[0].style.textShadow = '3px 1px 0 blue'
        document.getElementsByTagName('h2')[0].style.color = 'cyan';
        document.getElementsByTagName('h2')[0].style.textShadow = '3px 1px 0 blue'
        document.body.removeEventListener('keydown', castWW)
        document.body.removeEventListener('keydown', konamiCode)
        setTimeout(addKeyboard, 1000)

    }
}
function addKeyboard() {
    document.body.addEventListener('keypress', magicAddKeyClick)
}
//konami code breadcrumb
let kCount = 0;
document.body.addEventListener('keydown', konamiCode)
function konamiCode(evt) {
    let konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter']

    if (evt.key === 'ArrowUp' && kCount != 1) {
        kCount = 1;
    } else if (evt.key === konami[kCount]) {
        kCount++
    } else {
        kCount = 0;
    }
    if (kCount === konami.length) {
        document.querySelector(".modal-content").children[1].innerHTML = "Your mind must be warped if you think that's the right code.</br>What world do you think this is?"
        modal.style.display = "block"
    }
}
//webster breadcrumb
document.querySelector(".logo").addEventListener('click', websterWW)
let websterWarp = 0;
function websterWW() {
    if (websterWarp < 8) {
        websterWarp++
    } 
    if (websterWarp === 8) {
        document.querySelector(".modal-content").children[1].innerHTML ="Each player shuffles all permanents they own into their library, then reveals that many cards from the top of their library. Each player puts all artifact, creature, and land cards revealed this way onto the battlefield, then does the same for enchantment cards, then puts all cards revealed this way that weren't put onto the battlefield on the bottom of their library."
        modal.style.display = "block"
        document.querySelector(".logo").removeEventListener('click', websterWW)
    }
}


let magicWord = '';
let magicWordArray = [];
//random card fetch (modern only)
function randomCard() {
    document.querySelector('.magic').style.border = "solid black 1px"
    document.querySelector('.magicblanks').style.border = "solid #f8f7f7 2px"
    piecesRevealed = 0;
    usedLetter = [];
    magicUsedLetter = [];
    for (let i = 0; i < document.querySelector('.magic').children.length; i++) {
        document.querySelector('.magic').children[i].style.display = 'flex'
    }
    magicWordArray = [];
    document.querySelector('.magicblanks').innerHTML = null;
    let children = document.querySelectorAll('.magickey')
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = 'cyan';
    }
    magicLetterCount = 0;

    fetch('https://api.scryfall.com/cards/random')
        .then(response => {
            return response.json()
        })
        .then(response => {
            if (response.legalities.modern === 'not_legal') {
                return randomCard()
            }
            magicWord = response.name.toUpperCase();

            document.querySelector('.magic').style.backgroundImage = `url('${response.image_uris.normal}')`
            // code copy from submit event listener
            var letters = /^[A-Za-z]+$/;

            document.querySelector('.magicblanks').style.display = 'flex';
            document.querySelector('.visualKeyboard').style.display = 'grid';
            // let gridStart = 1;
            //loop through the word putting each letter in to an array seperately
            for (i = 0; i < magicWord.length; i++) {
                magicWordArray.push(magicWord[i]);
                let blank = document.createElement('p');
                let empty;
                if (magicWord[i].match(letters)) {
                    empty = document.createTextNode('_')
                    // blank.style.gridRowStart = gridStart
                } else if (magicWord[i] === " ") {
                    empty = document.createTextNode(``)
                    magicLetterCount++
                    // gridStart++
                    // blank.style.gridRowStart = gridStart
                    blank.style.margin = "20px";
                } else {
                    magicLetterCount++
                    // blank.style.gridRowStart = gridStart
                    empty = document.createTextNode(`${magicWord[i]}`)
                }
                blank.appendChild(empty);
                blank.className = `magicP magicblank${i + 1}` // may want to space out the number? ---------------
                document.querySelector('.magicblanks').appendChild(blank)
            }
            document.body.addEventListener('keypress', addKeyClick)
        })
        .catch(err => console.log(err))
}
document.querySelector('.newCard').addEventListener('click', randomCard)

// reset new card button after timer
function newCardTimed() {
    document.querySelector('.newCard').innerHTML = "New Card (modern only)";
    document.querySelector('.newCard').style.backgroundColor = 'black';
    document.querySelector('.newCard').addEventListener('click', randomCard)
    document.querySelector('.newCard').click()
}

//modal code
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//END modal code