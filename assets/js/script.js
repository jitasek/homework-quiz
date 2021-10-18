// import { questions } from "./js/questions.js";
// Initiations:
var startEl = document.querySelector("#start"); // introductory text
var quizEl = document.querySelector("#quiz"); // section for questions
var questionEl = document.querySelector("#question"); // question text itself
var scoreEl = document.querySelector("#score"); // final score

var timerEl = document.querySelector("#timer"); // time
var questionCount = 0; // how many questions answered already
var corrWroEl = document.querySelector("#corr-wro");
var endEl = document.querySelector("#end");
var userInitials = document.querySelector("#initials");
var highScoresEl = document.querySelector("#highscores");
var scoreListEl = document.querySelector("#score-list");
var scoreList = []; // array of scores
//var count = 15;

// Buttons:
var viewScoresBtn = document.querySelector("#view-highscores");
var startBtn = document.querySelector("#start-quiz"); // starts the quiz
var option1Btn = document.querySelector("#option1"); // answer option 1
var option2Btn = document.querySelector("#option2");
var option3Btn = document.querySelector("#option3");
var option4Btn = document.querySelector("#option4");
var optionBtn = document.querySelectorAll(".option-btn");
var submitBtn = document.querySelector("#submit-score");
var goBackBtn = document.querySelector("#goback");
var clearScoresBtn = document.querySelector("#clearscores");

console.log(questions);

// Functions, eventListeners:
quizEl.style.display = "none";
endEl.style.display = "none";
scoreEl.style.display = "none";
highScoresEl.style.display = "none";

var countDown;
// Timer function
startCountDown = function () {
  var count = 15;
  timerEl.textContent = "Time: " + count;
  // define the countdown function
  countDown = setInterval(function () {
    timerEl.textContent = "Time: " + count; // display the count value in html
    count--; // decrement the count value

    if (count < -1) {
      clearInterval(countDown); // kill timer
      quizEl.style.display = "none";
      timerEl.textContent = "Time: 0"; // reset the timer element
      quizEl.getElementsByClassName.display = "none"; // questions section disappears
      endEl.style.display = "block";
      scoreEl.textContent = count;
    }
  }, 1000);
};
//startCountDown();  TEST

// Display the questions & start the quiz

function displayQuestions() {
  startEl.style.display = "none";
  quizEl.style.display = "block";
  //questionCount = 0;

  startCountDown();
  showQuestion();
}

// Show the questions
function showQuestion() {
  if (questionCount < questions.length) {
    questionEl.textContent = questions[questionCount].question;
    option1Btn.textContent = questions[questionCount].options[0];
    option2Btn.textContent = questions[questionCount].options[1];
    option3Btn.textContent = questions[questionCount].options[2];
    option4Btn.textContent = questions[questionCount].options[3];
  } else {
    clearInterval(countDown); // kill timer
    quizEl.style.display = "none";
    timerEl.textContent = "Time: 0"; // reset the timer element
    quizEl.getElementsByClassName.display = "none"; // questions section disappears
    endEl.style.display = "block";
  }
}

// EventListeners
startBtn.addEventListener("click", displayQuestions);

optionBtn.forEach((item) => {
  item.addEventListener("click", checkAnswer);
});

submitBtn.addEventListener("click", addScore);

// Function: Check the answers

function checkAnswer(event) {
  event.preventDefault();

  corrWroEl.style.display = "block";
  var p = document.createElement("p");
  corrWroEl.appendChild(p);

  // corrwro disappear after 1 second
  setTimeout(function () {
    p.style.display = "none";
  }, 1000);

  // checks if correct / wrong

  if (questions[questionCount].correctAnswer === event.target.value) {
    p.textContent = "Correct!";
  } else if (questions[questionCount].correctAnswer !== event.target.value) {
    count = countDown - 2;
    p.textContent = "Wrong!";
  }

  // questions index increases
  if (questionCount < questions.length) {
    questionCount++;
  }

  showQuestion(questionCount);
}

// Function: storing scores locally, sorting them

function addScore(event) {
  event.preventDefault();
  endEl.style.display = "none";
  highScoresEl.style.display = "block";

  var init = userInitials.value.toUpperCase();
  scoreList.push({ initials: init, score: countDown });

  scoreList = scoreList.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });

  scoreListEl.innerHTML = "";
  for (var i = 0; i < scoreList.length; i++) {
    var li = document.createElement("li");
    li.textContent = scoreList[i].initials + ": " + scoreList[i].score;
    scoreListEl.append(li);
  }

  storeScores();
  displayScores();
}

//

function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

// Function: retrieving stored scores from localStorage
function displayScores() {
  var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
}

// Function: Clear the scores
function clearScores() {
  localStorage.clear();
  scoreEl.innerHTML = "";
}

// Go Back
goBackBtn.addEventListener("click", function () {
  highScoresEl.style.display = "none";
  startEl.style.display = "block";
  count = 15;
  timerEl.textContent = "Time: " + count;
});

// Clear scores
clearScoresBtn.addEventListener("click", clearScores);

// Function: View high scores
viewScoresBtn.addEventListener("click", function () {
  startEl.style.display = "none";
  if (highScoresEl.style.display === "none") {
    highScoresEl.style.display = "block";
  } else if (highScoresEl.style.display === "block") {
    highScoresEl.style.display = "none";
  } else {
    return alert("No scores to show.");
  }
});
