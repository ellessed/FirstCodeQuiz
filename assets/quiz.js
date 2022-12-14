var beginQuiz = document.getElementById("beginQuiz");
var saveScore = document.getElementById("saveScore");
var viewScores = document.getElementById("viewScores");
var playAgain = document.getElementById("playAgain");

var greeting = document.getElementById("greetig");
var codeQuiz = document.getElementById("code-quiz");
var end = document.getElementById("end");

var options = document.getElementById("options");
var message = document.getElementById("message");

var timer = document.getElementById("timer");
var summary = document.getElementById("summary");

var secondsLeft = 0;
var score = 0;
var presentQuestion = 0;
var countdownTimer;

//  Stop the Countdown Timer
// Clear the timer
// Hide the question and display the result
// Show the Score
function endGame() {
  stopInterval(countdownTimer);
  timer.textContent = "";
  codeQuiz.style.display = "none";
  end.style.display = "flex";
  summary.textContent = "Your score is" + score;
}

function onSaveScore(e) {
  var initials = document.getElementById("initials").value;
  if (initials !== "") {
    localStorage.setItem(initials, score);
    document.getElementById("initals").value = "";
  }
}
function onViewScores(e) {
  window.location.href = "scores.html";
}

function onSelectAnswer(e) {
  var rightAnswer = questions[presentQuestion].answers;
  var userAnswer = e.target.textContent;
  console.log(rightAnswer);
  console.log(userAnswer);
  if (rightAnswer === userAnswer) {
    score++;
    displayMessage("Correct");
  } else {
    score--;
    displayMessage("Incorrect");
    secondsLeft -= 5;
  }

  // Call up the next question
  displayQuestion();
}
// Show message and clear the message after 2seconds
function displayMessage(msg) {
  message.textContent = msg;
  setTimeout(function () {
    message.textContent = " ";
  }, 2000);
}
// Increment to get the next question
function displayQuestion() {
  console.log("current question is" + presentQuestion);
  if (presentQuestion >= questions.length) {
    stopGame();
    return;
  }
  var question = questions[presentQuestion];
  document.getElementById("question").textContent = question.subject;
  console.log(question.subject);
  options.innerHTML = "";
  for (var i = 0; i < question.options.length; i++) {
    var option = document.createElement("div");
    option.textContent = question.options[i];
    option.onclick = onSelectAnswer;
    option.classList.add("option");

    options.appendChild(option);
  }
  presentQuestion++;
}

function onStartGame() {
  secondsLeft = 75;
  presentQuestion = 0;
  score = 0;
  countdownTimer = setInterval(function () {
    if (secondsLeft > 0) {
      timer.textContent = secondsLeft;
    } else {
      stopGame();
    }
    secondsLeft--;
  }, 2000);

  document.getElementById("greeting").style.display = "none";
  end.style.display = "none";
  codeQuiz.style.display = "flex";

  displayQuestion();
}

beginQuiz.addEventListener("click", onStartGame);
saveScore.addEventListener("click", onSaveScore);
viewScores.addEventListener("click", onViewScores);
playAgain.addEventListener("click", onStartGame);
