//declaring variables to use throught the program

//find input for word being entered
let input = document.querySelector("input")
//find submit button
let submit = document.querySelector(".submit")
// define keys to be produced for visual keyboard, generate keyboard, with event listener
var alphabet = [] 
function genCharArray(charA, charZ) {
    a = charA.charCodeAt(0);
    z = charZ.charCodeAt(0);
    for (; a <= z; ++a) {
        let capital = String.fromCharCode(a).toUpperCase()
        let key = document.createElement('div');
        let letter = document.createTextNode(`${capital}`)
        key.appendChild(letter);
        key.className = `key ${String.fromCharCode(a)}`
        //add event listener to each key
        key.addEventListener('click', function(evt){
            evt.target.style.backgroundColor = 'red';
            checkLetter = evt.target.innerText
            if (wordArray.includes(checkLetter)) {
                wordArray.forEach(function(element, i) {
                    console.log(i)
                    if (element === checkLetter) {
                        document.querySelector(`.blank${i + 1}`).innerText = element
                    }
                });
            } else {
                console.log('none of that letter')
            }
        })
        document.querySelector('.visualKeyboard').appendChild(key)
    }
}
genCharArray('a', 'z');

//add event listener to input for enter key
input.addEventListener("keypress", function(evt){
    if (evt.keyCode === 13) {
        //prevent default, and click submit button
        evt.preventDefault();
       submit.click();
    }
})
let wordArray = [];
//add event listener for submit button
submit.addEventListener("click", function(){
    //declare empty array to put word pieces into. 
   
    //assign input word to a variable
    let word = input.value;
    document.querySelector('.wordChoice').style.display = 'none';
    document.querySelector('.visualKeyboard').style.display = 'grid';
    //loop through the word putting each letter in to an array seperately
    for (i = 0; i < word.length; i++) {
        let capital = word[i].toUpperCase()
        wordArray.push(capital);
        let blank = document.createElement('P');
        let empty = document.createTextNode('__')
        blank.appendChild(empty);
        blank.className = `blank${i + 1}`
        document.querySelector('.blanks').appendChild(blank)
    }
    //print the array
    console.log(wordArray);
    //add event listener to document to click visual keyboard on keypress.
    document.body.addEventListener('keypress', function(evt){
        evt.preventDefault()
        document.querySelector(`.${evt.key}`).click()
    })

})
