//declaring variables to use throught the program

//find input for word being entered
let input = document.querySelector("input")
//find submit button
let submit = document.querySelector(".submit")

//add event listener to input for enter key
input.addEventListener("keypress", function(evt){
    if (evt.keyCode === 13) {
        //prevent default, and click submit button
        evt.preventDefault();
       submit.click();
    }
})

//add event listener for submit button
submit.addEventListener("click", function(){
    //declare empty array to put word pieces into. 
    let wordArray = [];
    //assign input word to a variable
    let word = input.value;
    document.querySelector('.wordChoice').style.display = 'none';
    //loop through the word putting each letter in to an array seperately
    for (i = 0; i < word.length; i++) {
        wordArray.push(word[i]);
        let blank = document.createElement('P');
        let empty = document.createTextNode('__')
        blank.appendChild(empty);
        blank.className = `blank${i + 1}`
        document.querySelector('.blanks').appendChild(blank)
    }
    //print the array
    console.log(wordArray);
})