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
reset.addEventListener('click', function () {
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
})
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

document.querySelector('.magic').addEventListener('click', function () {
    fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": "8bbcf8b82bmsh5d4c78b130ba348p15915fjsnfb896b88221e"
        }
    })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(response => {
            console.log(response.word)
        })
        .catch(err => {
            console.log(err);
        });
})

// fetch("https://wordsapiv1.p.rapidapi.com/words/incredible/definitions", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
// 		"x-rapidapi-key": "8bbcf8b82bmsh5d4c78b130ba348p15915fjsnfb896b88221e"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.log(err);
// });