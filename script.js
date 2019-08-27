//declaring variable to use throught the program
let input = document.querySelector("input")

input.addEventListener("keypress", function(evt){
    if (evt.keyCode === 13) {
        let wordArray = [];
        let word = input.value;
        for (i = 0; i < word.length; i++) {
            wordArray.push(word[i])
        }
        console.log(wordArray);
    }
})