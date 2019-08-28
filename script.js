//declaring variables to use throught the program

//find input for word being entered
let input = document.querySelector("input")
//find submit button
let submit = document.querySelector(".submit")
//array of image links
let images = ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg", "./images/4.jpg", "./images/5.jpg", "./images/6.jpg", "./images/7.jpg"]
//define starting point for images
let imageCount = 0
document.querySelector('.manhang').style.backgroundImage = `url('${images[imageCount]}')`
// letterCount represents letters guessed right, this variable is used to check if player has won.
let letterCount = 0;
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
            //check if pressed letter is in word
            if (wordArray.includes(checkLetter)) {
                evt.target.style.backgroundColor = 'green';
                //run through word and put letters in correct spots
                wordArray.forEach(function (element, i) {
                    if (element === checkLetter) {
                        letterCount++
                        document.querySelector(`.blank${i + 1}`).innerText = element
                        if (letterCount === wordArray.length) {
                            console.log('Congrats You got it right!')
                        }
                    }
                });
            } else {
                evt.target.style.backgroundColor = 'red';
                //if letter not in word, do this stuff
                console.log('none of that letter')
                //increase image count
                imageCount++
                //only allow image to change if we haven't reached the end.
                if (imageCount + 1 >= images.length) {
                    document.querySelector('.manhang').style.backgroundImage = `url('${images[imageCount]}')`
                    return console.log('you fucked, he dead')
                } else {
                    //change image to increased number    
                    document.querySelector('.manhang').style.backgroundImage = `url('${images[imageCount]}')`
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
let wordArray = [];
//add event listener for submit button
submit.addEventListener("click", function () {
    //declare empty array to put word pieces into. 

    //assign input word to a variable
    let word = input.value;
    document.querySelector('.wordChoice').style.display = 'none';
    document.querySelector('.visualKeyboard').style.display = 'grid';
    //loop through the word putting each letter in to an array seperately
    for (i = 0; i < word.length; i++) {
        let capital = word[i].toUpperCase()
        wordArray.push(capital);
        let blank = document.createElement('p');
        let empty = document.createTextNode('__')
        blank.appendChild(empty);
        blank.className = `blank${i + 1}`
        document.querySelector('.blanks').appendChild(blank)
    }
    //print the array
    console.log(wordArray);
    //add event listener to document to click visual keyboard on keypress.
    document.body.addEventListener('keypress', function (evt) {
        evt.preventDefault()
        document.querySelector(`.${evt.key}`).click()
    })

})