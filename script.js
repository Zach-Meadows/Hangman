//declaring variables to use throught the program

//find input for word being entered
let input = document.querySelector("input")
//find submit button
let submit = document.querySelector(".submit")
//find reset button
let reset = document.querySelector(".reset")
//array of image links
let images = ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg", "./images/4.jpg", "./images/5.jpg", "./images/6.jpg", "./images/7.jpg"]
//define starting point for images, and set the background
let imageCount = 0
document.querySelector('.manhang').style.backgroundImage = `url('${images[imageCount]}')`
// letterCount represents letters guessed right, this variable is used to check if player has won.
let letterCount = 0
// define keys to be produced for visual keyboard, generate keyboard, with event listener
var alphabet = []
function genCharArray(charA, charZ) {
    a = charA.charCodeAt(0);
    z = charZ.charCodeAt(0);
    for (; a <= z; ++a) {
        let capital = String.fromCharCode(a).toUpperCase()
        let key = document.createElement('p');
        let letter = document.createTextNode(`${capital}`)
        key.appendChild(letter);
        key.className = `key ${String.fromCharCode(a)}`
        //add event listener to each key
        key.addEventListener('click', function (evt) {
            checkLetter = evt.target.innerText
            evt.target.style.zIndex = '-1';
            //check if pressed letter is in word
            if (wordArray.includes(checkLetter)) {
                evt.target.style.backgroundColor = 'green';
                //run through word and put letters in correct spots
                wordArray.forEach(function (element, i) {
                    if (element === checkLetter) {
                        letterCount++
                        document.querySelector(`.blank${i + 1}`).innerText = element
                        //CHECK IF WON
                        if (letterCount === wordArray.length) {
                            console.log('Congrats You got it right!')
                            reset.style.display = 'block';
                        }
                    }
                })
                //if letter is not in word, do this
            } else {
                evt.target.style.backgroundColor = 'red';
                console.log('none of that letter')
                //increase image count
                imageCount++
                //change background image
                document.querySelector('.manhang').style.backgroundImage = `url('${images[imageCount]}')`
                //CHECK IF LOST
                if (imageCount + 1 >= images.length) {
                    console.log('you fucked, he dead')
                    //loop to assign all letters 
                    wordArray.forEach(function (element, i) {
                        document.querySelector(`.blank${i + 1}`).innerText = element
                    })
                    // document.querySelector(`.blank${i + 1}`).innerText = word[i]

                    reset.style.display = 'block';
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
    if (word === '') {
        return alert('Please enter a word, input cannot be empty')
    }
    // for (let i = 0; i < word.length; i++) {
    //     if (word[i] === ';' || word[i] === ':' || word) {
    //         re
    //     }
    // }
    document.querySelector('.wordChoice').style.display = 'none';
    document.querySelector('.visualKeyboard').style.display = 'grid';
    //loop through the word putting each letter in to an array seperately
    for (i = 0; i < word.length; i++) {
        wordArray.push(word[i]);
        let blank = document.createElement('p');
        let empty = document.createTextNode('__')
        blank.appendChild(empty);
        blank.className = `blank${i + 1}`
        document.querySelector('.blanks').appendChild(blank)
    }
    //print the array
    console.log(wordArray);
    document.body.addEventListener('keypress', addKeyClick)
})
function addKeyClick(evt) {
    //add event listener to document to click visual keyboard on keypress.
    evt.preventDefault()
    document.querySelector(`.${evt.key}`).click()
}
//reset button returns all values to their starting values.
reset.addEventListener('click', function () {
    wordArray = [];
    document.querySelector('.wordChoice').style.display = 'block';
    document.querySelector('.visualKeyboard').style.display = 'none';
    input.value = '';
    document.body.removeEventListener('keypress', addKeyClick)
    document.querySelector('.blanks').innerHTML = null;
    reset.style.display = 'none';
    let children = document.querySelectorAll('.key')
    for (let i = 0; i < children.length; i++) {
        children[i].style.backgroundColor = 'cyan';
        children[i].style.zIndex = 1;
    }
    imageCount = 0;
    letterCount = 0;
    document.querySelector('.manhang').style.backgroundImage = `url('${images[0]}')`
})
