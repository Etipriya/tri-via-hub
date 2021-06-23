let score = 0;

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
      score += 1;
    } else {
      question.find("ul").replaceWith(
        `<div class="alert alert-danger" role="alert">
          Incorrect
        </div>`
      );
      score -= 1;
    }
    console.log(score);
  }
};

const startQuiz = () => {
  setInterval(() => {
    console.log("hello");
  }, 1000);
};

$(".question").click(isAnswer);
$(document).ready(startQuiz);
