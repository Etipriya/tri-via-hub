const isAnswer = (event) => {
  event.preventDefault();

  console.log("target", event.target);
  console.log("current target", event.currentTarget);
};

$(".question").click(isAnswer);
