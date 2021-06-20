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
  const category = $();
};

const viewQuiz = async (event) => {
  const id = event.currentTarget.id;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    params: JSON.stringify({
      id,
    }),
  };
  const response = await fetch(`/api/quiz/${id}`, options);
  if (response.status !== 200) {
    console.log("Failed to get quiz");
  } else {
    window.location.replace(`/quiz/${id}`);
  }
};

$(".view-quiz").click(viewQuiz);
$("#quizSearch").submit(handleQuizSearch);
