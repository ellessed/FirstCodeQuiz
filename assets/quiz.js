// Returns an Element object which represents the element whose id property matches the specified string
var beginQuiz = document.getElementById("beginQuiz");
var saveScore = document.getElementById("saveScore");
var viewScores = document.getElementById("viewScores");
var playAgain = document.getElementById("playAgain");

var greeting = document.getElementById("greeting");
var quiz = document.getElementById("quiz");
var end = document.getElementById("end");

var options = document.getElementById("options");
var message = document.getElementById("message");

var timer = document.getElementById("timer");

var summary = document.getElementById("summary");

var secondsLeft = 0;
var score = 0;
var presentQuestion = 0;
var countdownTimer;
var Timeout;

function beginGame() {
  secondsLeft = 50;
  presentQuestion = 0;
  score = 0;

  timer.textContent = secondsLeft;
  timer.classList.remove("hidden");
  beginQuiz.classList.add("hidden");

  quiz.style.display = "block";
  end.style.display = "none";

  clearInterval(countdownTimer);
  countdownTimer = setInterval(function () {
    if (secondsLeft > 0) {
      timer.textContent = secondsLeft;
    } else {
      stopGame();
    }
    secondsLeft--;
  }, 1000);

  showQuestion();
}

function showQuestion() {
  if (presentQuestion >= questions.length) {
    endGame();
    return;
  }

  var question = questions[presentQuestion];
  document.getElementById("question").textContent = question.subject;

  options.innerHTML = "";

  for (var i = 0; i < question.choices.length; i++) {
    var option = document.createElement("button");
    option.textContent = question.choices[i];
    option.onclick = onSelectAnswer;
    option.classList.add("option");

    options.appendChild(option);
  }
}

function showMessage(msg, options) {
  message.textContent = msg;
  message.classList.remove("visually-hidden");
  message.classList.remove("correct");

  if (options.isCorrect) {
    message.classList.add("correct");
  }

  clearTimeout(Timeout);
  Timeout = setTimeout(function () {
    message.textContent = "Waiting for answer";
    message.classList.add("visually-hidden");
  }, 2000);
}

function showMessage(msg, options) {
  message.textContent = msg;
  message.classList.remove("visually-hidden");
  message.classList.remove("correct");

  if (options.isCorrect) {
    message.classList.add("correct");
  }

  clearTimeout(Timeout);
  Timeout = setTimeout(function () {
    message.textContent = "Waiting for answer";
    message.classList.add("visually-hidden");
  }, 2000);
}

function onSelectAnswer(e) {
  var correctAnswer = questions[presentQuestion].answer;
  var usersAnswer = e.target.textContent;
  //if the correct answer is equal to what the user has entered then the message pops up correct
  //else if it is not equal to, time is deducte and incorrect message is displayed
  if (correctAnswer === usersAnswer) {
    score++;
    showMessage("Correct!", { isCorrect: true });
  } else {
    score--;
    secondsLeft -= 5;
    showMessage("Incorrect", { isCorrect: false });
  }
  presentQuestion++;

  showQuestion();
}
function onviewScores(e) {
  window.location.href = "scores.html";
}

// returns the value of initials
function onSaveScore(e) {
  var initials = document.getElementById("initials").value;

  if (initials !== "") {
    localStorage.setItem(initials, score);

    document.getElementById("initials").value = "";

    window.location.href = "scores.html";
  }
}

//once the game has ended, time is cleared and score is defined
function endGame() {
  clearInterval(countdownTimer);
  timer.textContent = "";
  timer.classList.add("hidden");

  quiz.style.display = "none";
  end.style.display = "block";

  summary.textContent = "Your Score Is: " + score;
}

beginQuiz.addEventListener("click", beginGame);
saveScore.addEventListener("click", onSaveScore);
viewScores.addEventListener("click", onviewScores);
playAgain.addEventListener("click", beginGame);
