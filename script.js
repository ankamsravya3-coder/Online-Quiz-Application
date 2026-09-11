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
let userName = "";
let userEmail = "";

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxnqigrC9O0BRgglHGdEEAijGi6gnNdZwobh4-GlZIL-srn6a38Ah40bmCRh3GzTKfCNg/exec";

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

const userDetails = document.getElementById("user-details");
const quiz = document.getElementById("quiz");
const startButton = document.getElementById("start-btn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

startButton.onclick = function () {

    userName = nameInput.value.trim();
    userEmail = emailInput.value.trim();

    if (userName === "" || userEmail === "") {
        alert("Please enter your name and email.");
        return;
    }

    userDetails.style.display = "none";
    quiz.style.display = "block";

    showQuestion();
};

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

        // Send response to Google Sheets
        const formData = new URLSearchParams();

        formData.append("name", userName);
        formData.append("email", userEmail);
        formData.append("score", score + " / " + questions.length);

        fetch(WEB_APP_URL, {
            method: "POST",
            body: formData
        })
        .then(() => {
            console.log("Response submitted successfully.");
        })
        .catch(error => {
            console.log("Error submitting response:", error);
        });
    }
};
