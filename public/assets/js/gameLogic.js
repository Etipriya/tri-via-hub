const isAnswer = async (event) => {
  event.preventDefault();

  const givenAnswer = event.target.getAttribute("data-answer");
  const questionID = event.currentTarget.id;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      id: questionID,
      givenAnswer,
    }),
  };

  const response = await fetch("/api/quiz/check-answer", options);

  const data = await response.json();

  if (response.status !== 200) {
    console.log("Failed to get answer");
  } else {
    console.log(data);
  }
};

$(".question").click(isAnswer);
