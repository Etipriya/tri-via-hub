let score = 0;
let timerValue = $(".quizQuestion").length * 10;

const isAnswer = async (event) => {
  const button = $(event.target);
  const question = $(event.currentTarget);

  const givenAnswer = button.attr("data-answer");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      id: question.attr("id"),
      givenAnswer,
    }),
  };

  const response = await fetch("/api/quiz/check-answer", options);

  const { success } = await response.json();

  if (response.status !== 200) {
    console.log("Failed to get answer");
    // to do error handling
  } else {
    if (success) {
      question.find("ul").replaceWith(
        `<div class="alert alert-success" role="alert">
          Correct
        </div>`
      );
      score += 3;
    } else {
      question.find("ul").replaceWith(
        `<div class="alert alert-danger" role="alert">
          Incorrect
        </div>`
      );
      score -= 1;
    }
  }

  if (score < 0) {
    score = 0;
  }
};

const sendScore = async () => {
  const quizId = $(".view-quiz").attr("id");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      score,
      quiz_id: quizId,
    }),
  };

  const response = await fetch(`/api/quiz/${quizId}/score`, options);

  timerValue = 0;

  if (response.status !== 201) {
    console.log("Failed to save score");
  } else {
    console.log("score saved");
  }
};

// Declaring timer
const startTimer = () => {
  const callback = () => {
    // if timer is active and game is still active
    $("#timer").text(timerValue);
    console.log(timerValue);

    if (timerValue > 0) {
      timerValue = timerValue - 1;
    }

    if (timerValue === 0) {
      clearInterval(timer);
      sendScore();
    }
  };
  const timer = setInterval(callback, 1000);
};

const startQuiz = () => {
  startTimer();
};

$(".question").click(isAnswer);
$(document).ready(startQuiz);
$("[name='finish-btn']").click(sendScore);
