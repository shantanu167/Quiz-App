const questions = [
    {
        question: "Which is largest animal in the World?",
        answer: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the World?",
        answer: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the World?",
        answer: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: true},
            {text: "Thar", correct: false},
        ]
    },
    {
        question: "Which is the largest continent in the World?",
        answer: [
            {text: "Asia", correct: true},
            {text: "Antartica", correct: false},
            {text: "Africa", correct: false},
            {text: "America", correct: false},
        ]
    },
    {
        question: "Which is the smallest state in India?",
        answer: [
            {text: "Jammu & Kashmir", correct: false},
            {text: "Rajasthan", correct: false},
            {text: "Meghlaya", correct: false},
            {text: "Goa", correct: true},
        ]
    },
];

const questionElement = document.getElementById("que");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currQueIdx = 0;
let score = 0;

function startQuiz() {
    currQueIdx = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currQue = questions[currQueIdx];
    let questionNo = currQueIdx + 1;
    questionElement.innerHTML = questionNo + ". " + currQue.question;

    currQue.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currQueIdx++;
    if(currQueIdx < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currQueIdx < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});
startQuiz();