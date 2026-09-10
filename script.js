const questions = [
    {
        question: "Which language is used to create the structure of a web page?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: "HTML"
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "SQL", "Java"],
        answer: "CSS"
    },
    {
        question: "Which language is used to add interactivity to web pages?",
        options: ["Python", "JavaScript", "SQL", "HTML"],
        answer: "JavaScript"
    },
    {
        question: "Which of these is a programming language?",
        options: ["HTML", "CSS", "Python", "HTTP"],
        answer: "Python"
    },
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Simple Question Language",
            "System Query List",
            "Structured Question List"
        ],
        answer: "Structured Query Language"
    }
];

let currentQuestion = 0;
let score = 0;

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function showQuestion() {
    const question = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) + " of " + questions.length;

    questionElement.textContent = question.question;

    optionsElement.innerHTML = "";

    question.options.forEach(option => {
        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = function () {
            checkAnswer(option, button);
        };

        optionsElement.appendChild(button);
    });

    nextButton.style.display = "none";
}

function checkAnswer(selectedAnswer, selectedButton) {

    const correctAnswer = questions[currentQuestion].answer;
    const allButtons = optionsElement.querySelectorAll("button");

    allButtons.forEach(button => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.style.background = "#90EE90";
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        selectedButton.style.background = "#FF9999";
    }

    nextButton.style.display = "inline-block";
}

nextButton.onclick = function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionNumber.textContent = "Quiz Completed!";
        questionElement.textContent = "🎉 Well Done!";
        optionsElement.innerHTML = "";

        nextButton.style.display = "none";

        scoreElement.textContent =
            "Your Score: " + score + " / " + questions.length;
    }
};

showQuestion();