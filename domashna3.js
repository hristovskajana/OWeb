const words = ["river", "stone", "brick", "flame", "storm", "plant", "cloud", "grass", "ocean", "night"];
let chosenWord, attempts, wordDisplay;

function startNewGame() {
    document.getElementById('message').innerText = '';
    document.getElementById('letter-input').value = '';
    document.getElementById('new-game').style.display = 'none';

    chosenWord = words[Math.floor(Math.random() * words.length)];
    attempts = 5;
    
    wordDisplay = chosenWord.split('').map((char, index) => {
        if (index < 2) {
            return char;
        }
        return '_';
    }).join(' ');
    document.getElementById('word-display').innerText = wordDisplay;
    document.getElementById('attempts-left').innerText = `Обиди: ${attempts}`;
}

function checkLetter() {
    const inputLetter = document.getElementById('letter-input').value.toLowerCase();

    if (inputLetter.length !== 1 || !/[a-z]/.test(inputLetter)) {
        alert("Внесете валидна буква.");
        return;
    }

    let updatedWord = wordDisplay.split(' ');
    let correctGuess = false;
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === inputLetter && updatedWord[i] === '_') {
            updatedWord[i] = inputLetter;
            correctGuess = true;
        }
    }

    if (correctGuess) {
        wordDisplay = updatedWord.join(' ');
        document.getElementById('word-display').innerText = wordDisplay;

        // Check if word is fully guessed
        if (!updatedWord.includes('_')) {
            document.getElementById('message').innerText = "Успешно го погодивте зборот!";
            document.getElementById('new-game').style.display = 'inline-block';
        }
    } else {
        attempts--;
        document.getElementById('attempts-left').innerText = `Обиди: ${attempts}`;

        if (attempts === 0) {
            document.getElementById('message').innerText = `Не успеавте да го погодите зборот. Зборот беше: ${chosenWord}`;
            document.getElementById('new-game').style.display = 'inline-block';
        }
    }

    document.getElementById('letter-input').value = '';
}

startNewGame();
