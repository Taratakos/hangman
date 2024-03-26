'use strict'

// Add HTML elements using JavaScript
let containerDiv = document.createElement('div');
let flexDiv = document.createElement('div');
let rightDiv = document.createElement('div');
let leftDiv = document.createElement('div');
let imgOfleft = document.createElement('img');
let imgUnderTitle = document.createElement('h1')
let inputAnswer = document.createElement('div');
let questionDiv = document.createElement('div');
let incorrectField = document.createElement('div');
let keyBoardArea = document.createElement('div');
let modalTabContainer = document.createElement('div');
let playAgainButton = document.createElement('button');
let incorrectCount = 0;

// Add CSS classes to the created elements
modalTabContainer.classList = 'modal-container'
playAgainButton.classList = 'loose-button'
containerDiv.classList = 'container';
flexDiv.classList = 'flex-container';
rightDiv.classList = 'right';
leftDiv.classList = 'left';
imgUnderTitle.classList = 'left-title';
questionDiv.classList = 'question';
questionDiv.id = 'question-field';
incorrectField.classList = 'incorrect-field';
keyBoardArea.classList = 'keyboard-container';
imgOfleft.classList = 'left-img';
inputAnswer.classList = 'answer-field'


// Append elements to the DOM
document.body.append(containerDiv);
document.body.append(modalTabContainer)
containerDiv.append(flexDiv);
flexDiv.append(leftDiv);
flexDiv.append(rightDiv);
leftDiv.append(imgOfleft);
leftDiv.append(imgUnderTitle);
rightDiv.append(inputAnswer);
rightDiv.append(questionDiv);
rightDiv.append(incorrectField);
incorrectField.innerHTML = `Incorrect guesses: <span id='incorrect-count'>${incorrectCount}/6</span>`
rightDiv.append(keyBoardArea);
imgOfleft.alt = 'hangman image';
imgOfleft.src = 'img/1.jpg';
imgUnderTitle.innerText = 'HANGMAN GAME';

// Create keyboard buttons
for (let i = 1; i < 27; i += 1) {
  keyBoardArea.append(document.createElement('div'));
}

// Define an array of letters
let lettersArr = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Select all keyboard buttons and add click event listeners
let keys = document.querySelectorAll(".keyboard-container div");
function addClickForKeys() {
  keys.forEach((el, i) => {
    el.innerText = `${lettersArr[i]}`;
    el.classList = "key-button";
    el.addEventListener("click", () => {
      if (el.style.opacity !== "0.5") {
        searchLetter(lettersArr[i]);
        console.log(el.style);
      }
      if (incorrectCount <= 6) el.style.opacity = "0.5";
    });
  });
}
addClickForKeys();

// Game process. Define an array of questions and answers
let questions = [
  { question: 'What is the capital of Ukraine?', answer: 'KYIV' },
  { question: 'What operating system was developed by Microsoft?', answer: 'WINDOWS' },
  { question: 'The most popular operating systems are Windows, MacOS and ...?', answer: 'LINUX' },
  { question: 'What is the name of Apple smartphones?', answer: 'IPHONE' },
  { question: 'What is the name of the program for editing the software code?', answer: 'VSCODE' },
  { question: 'The name of the most popular preprocessor?', answer: 'SCSS' },
  { question: 'The name of the school where you will be taught to programing for free?', answer: 'RSSCHOOL' },
  { question: 'What is the apple company logo?', answer: 'APPLE' },
  { question: 'This is a well-known brand of American electric cars?', answer: 'TESLA' },
  { question: 'Who invented the light bulb?', answer: 'EDISON' },
]

let randomArr = [];

// Function to generate a non-repeating random number
function generateNonRepeat(num) {
  let random = (Math.random() * num).toFixed();
  random = Number(random);
  if (!randomArr.includes(random)) {
    randomArr.push(random);
    return random;
  } else {
    if (randomArr.length < num) {
      return generateNonRepeat(num);
    } else {
      return false;
    }
  }
}

// Function to display a random question and initialize the game
let i;
let answerArr;
function pastPhrase() {
  i = generateNonRepeat(questions.length - 2);
  if (i.toString() === localStorage.getItem('randomIn')) i += 1;
  localStorage.setItem('randomIn', i);
  questionDiv.innerText = `${questions[i].question}`;
  // add word for input field
  for (let index = 0; index < questions[i].answer.length; index += 1) {
    inputAnswer.append(document.createElement('div'));
  }
  answerArr = questions[i].answer.split('');
}
pastPhrase()

// Variable for game logic
let checkIsExist = false;
let checkArrForSearch = [1];
let winnerCounter = 0;
let answerLetter = document.querySelectorAll('.answer-field div');
let memoryArr = [1];
let checkIfUserWin = false;

// Function to search for a letter in the answer
function searchLetter(letterName) {
  checkArrForSearch.forEach((el) => {
    if (el === letterName) {
      checkIsExist = true;
    }
  });
  if (checkIsExist) {
    checkIsExist = false;
    return;
  }
  checkArrForSearch.push(letterName);
  answerLetter = document.querySelectorAll('.answer-field div');
  let currentPosition;
  answerArr.forEach((a, b) => {
    if (a === letterName) {
      currentPosition = b;
      answerLetter[b].style.color = 'green';
      answerLetter[b].innerText = letterName;
      answerLetter[b].style.border = 'none';
      winnerCounter += 1;
    }
  });

  // User wins
  if (winnerCounter === answerArr.length) {
    console.log('User wins !!!');
    checkIfUserWin = true;
    winnerCounter = 0;
    modalTabContainer.style.display = 'flex';
    modalTabContainer.innerHTML = `<h2 class ='loose-title'>You win! Congrats!</h2>
    <span class='secret-word'>Secret word was: ${answerArr.join('')}</span>`;
    playAgainButton.innerText = "Play again";
    modalTabContainer.append(playAgainButton);
  }
  if (answerArr[currentPosition] === letterName && memoryArr[memoryArr.length - 1] !== letterName) {
    let indexCounter = 0;
    while (indexCounter < memoryArr.length) {
      if (memoryArr[indexCounter] === letterName) return;
      indexCounter += 1;
    }

    memoryArr.push(letterName);
  }
  if (answerArr[currentPosition] !== letterName && memoryArr[memoryArr.length - 1] !== letterName) {
    let whileIndex = 0;
    while (whileIndex < memoryArr.length) {
      if (memoryArr[whileIndex] === letterName) return;
      whileIndex += 1;
    }
    // traceability of incorrect attempts
    incorrectCount += 1;
    incorrectField.innerHTML = `Incorrect guesse: <span id='incorrect-cound'> ${incorrectCount}/6</span>`;
    if (incorrectCount <= 6) {
      imgOfleft.src = `icons/${incorrectCount}.svg`
    }
    memoryArr.push(letterName);
  }

  // when user loose all possible attempts
  if (incorrectCount === 6) {
    winnerCounter = 0;
    answerLetter.forEach((el, index) => {
      if (el.innerText) {
        el.style.color = 'green';
      }
      if (!el.innerText) {
        el.innerText = answerArr[index];
        el.style.color = 'red';
        el.style.border = 'none';
      }
    });

    console.log('User loose');
    modalTabContainer.style.display = 'flex';
    modalTabContainer.innerHTML = `<h2 class='loose-title'>You losse :(</h2>
    <span class='secret-word'>Secret word is: ${answerArr.join('')}</span>`;
    playAgainButton.innerHTML = 'Play again';
    modalTabContainer.append(playAgainButton);
  }
}

// Game again 
function showModal() {
  checkArrForSearch = [1];
  modalTabContainer.style.display = 'none';
  incorrectCount = 0;
  imgOfleft.src = 'img/1.jpg';
  incorrectField.innerHTML = `Incorrect guesse: <span id='incorrect-cound'> ${incorrectCount}/6 </span>`;
  answerLetter.forEach((el) => {
    el.innerHTML = '';
  });
  memoryArr = [1];
  keys.forEach((el) => {
    el.style.opacity = '1';
    checkIfUserWin = false;
    pastPhrase();
  })
}
playAgainButton.addEventListener('click', showModal);

// Physicla keyboard event
document.addEventListener('keydown', (e) => {
  if (checkIfUserWin) {
    return;
  }
  if (incorrectCount === 6) {
    return;
  }
  if (e.key === 'CapsLock') {
    return
  }
  if (e.key === 'Shift') {
    return;
  }
  if (e.key === 'Control') {
    return
  }

  searchLetter(e.key.toUpperCase());
  keys.forEach((el) => {
    if (el.innerText === e.key.toUpperCase()) {
      if (incorrectCount <= 6) el.style.opacity = '0.5'
    }
  });
});