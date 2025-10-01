const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestion = [
    {
        question: "Apa ibu kota Indonesia?",
        answers: [
            {text: "Jakarta", correct: true},
            {text: "Bandung", correct: false},
            {text: "Surabaya", correct: false},
            {text: "Medan", correct: false},
        ]
    },
    {
        question: "Apa mata uang resmi Indonesia?",
        answers: [
            {text: "Dollar", correct: false},
            {text: "Rupe", correct: false},
            {text: "Rupiah", correct: true},
            {text: "Ringgit", correct: false},
        ]
    },
    {
        question: "Siapa presiden negara indonesia sekarang?",
        answers: [
            {text: "Pak Habibie", correct: false},
            {text: "Bu Megawati", correct: false},
            {text: "Pak Soeharto", correct: false},
            {text: "Pak Prabowo", correct: true},
        ]
    },
    {
        question: "Apa nama kota paling maju di Indonesia",
        answers: [
            {text: "Gedog Wetan", correct: true},
            {text: "Malang", correct: false},
            {text: "Turen", correct: false},
            {text: "Undaan", correct: false},
        ]
    },
    {
        question: "Siapakah orang paling ganteng sedunia?",
        answers: [
            {text: "Revaldo", correct: true},
            {text: "Feriansyah", correct: false},
            {text: "Sena", correct: false},
            {text: "Yudha", correct: false},
        ]
    },
]

// Variabel untuk melacak state quiz
let currentQuestionIndex = 0;
let score = 0;

// Fungsi untuk memulai quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
}

// Fungsi untuk menampilkan pertanyaan
function showQuestion() {
    const currentQuestion = quizQuestion[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Update nomor pertanyaan
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestionsSpan.textContent = quizQuestion.length;
    scoreSpan.textContent = score;

    // Kosongkan container jawaban
    answersContainer.innerHTML = "";

    // Buat tombol jawaban
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.textContent = answer.text;
        button.addEventListener("click", () => selectAnswer(answer.correct, button));
        answersContainer.appendChild(button);
    });

    updateProgress();
}

// Fungsi untuk menangani pilihan jawaban
function selectAnswer(isCorrect, selectedButton) {
    // Nonaktifkan semua tombol jawaban
    const answerButtons = document.querySelectorAll(".answer-btn");
    answerButtons.forEach(button => {
        button.disabled = true;
        button.style.cursor = "not-allowed";
    });

    // Highlight jawaban yang dipilih
    if (isCorrect) {
        selectedButton.style.backgroundColor = "#4CAF50"; // Hijau untuk benar
        score++;
    } else {
        selectedButton.style.backgroundColor = "#f44336"; // Merah untuk salah
    }

    // Lanjut ke pertanyaan berikutnya setelah delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestion.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

// Fungsi untuk menampilkan hasil
function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;
    maxScoreSpan.textContent = quizQuestion.length;

    // Tentukan pesan hasil
    const percentage = (score / quizQuestion.length) * 100;
    if (percentage >= 80) {
        resultMessage.textContent = "Luar biasa! Skor Anda sangat baik!";
        resultMessage.style.color = "#4CAF50";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Bagus! Anda lulus!";
        resultMessage.style.color = "#2196F3";
    } else {
        resultMessage.textContent = "Coba lagi! Anda perlu belajar lebih banyak.";
        resultMessage.style.color = "#f44336";
    }
}

// Fungsi untuk mengulang quiz
function restartQuiz() {
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
    currentQuestionIndex = 0;
    score = 0;
}

// Fungsi untuk update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestion.length) * 100;
    progressBar.style.width = progress + "%";
}

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
