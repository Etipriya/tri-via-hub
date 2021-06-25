const handleQuizSearch = async (event) => {
  event.preventDefault();

  const searchQuery = $("#searchQuery").val();

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    query: JSON.stringify({
      title: searchQuery,
    }),
  };

  const response = await fetch("/api/quiz/search", options);

  if (response.status !== 200) {
    console.log("Failed to search!");
  } else {
    window.location.replace(`/quiz/search?title=${searchQuery}`);
  }
};

const createQuizBase = async (event) => {
  event.preventDefault();

  const title = $("#quiz-title").val();
  const category_id = $("#category-select").val();
  const difficulty = $("#difficulty-select").val();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      title,
      category_id,
      difficulty,
    }),
  };

  const response = await fetch("/api/quiz/create", options);

  if (response.status !== 201) {
    console.log("Failed to create quiz!");
  } else {
    window.location.replace(`/quiz/create/question`);
  }
};

const createQuizQuestion = async (event) => {
  event.preventDefault();

  const question = $("#question").val();
  const correct_option = $("#correct-option").val();
  const option2 = $("#option2").val();
  const option3 = $("#option3").val();
  const option4 = $("#option4").val();

  const answersArray = [];

  answersArray.push(correct_option, option2, option3, option4);

  console.log(answersArray);

  const questionOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      question,
      correct_option,
    }),
  };

  const response = await fetch("/api/quiz/create/question", questionOptions);

  const answersOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      option: JSON.stringify(answersArray),
    }),
  };

  const answerResponse = await fetch(
    "/api/quiz/create/question/answer",
    answersOptions
  );

  if (response.status !== 201) {
    console.log("Failed to create quiz!");
  } else {
    window.location.replace(`/quiz/create/question`);
  }
};

const finishCreateQuiz = (event) => {
  event.preventDefault();

  window.location.replace(`/quiz`);
};

const deleteQuiz = async (event) => {
  const id = event.currentTarget.id;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      id,
    }),
  };

  const response = await fetch(`/api/quiz/${id}`, options);

  if (response.status !== 200) {
    console.log("FAILED TO UPDATE POST");
  } else {
    window.location.replace("/dashboard");
  }
};

const generateQuiz = () => {
  const title = $("#quiz-title").val();
  const category_id = $("#category-select").val();
  const difficulty = $("#difficulty-select").val();

  window.location.replace(
    `/quiz/generate?title=${title}&category=${category_id}&difficulty=${difficulty}`
  );
};

$("[name='delete-btn']").click(deleteQuiz);
$("#quizSearch").submit(handleQuizSearch);
$("#create-btn").click(createQuizBase);
$("#generate-btn").click(generateQuiz);
$("#questionForm").submit(createQuizQuestion);
$("#doneCreate").click(finishCreateQuiz);
