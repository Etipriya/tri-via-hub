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
  const type = $("#type-select").val();

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
      type,
    }),
  };

  const response = await fetch("/api/quiz/create", options);

  if (response.status !== 201) {
    console.log("Failed to create quiz!");
  } else {
    window.location.replace(`/quiz/create/question`);
  }
};

$("#quizSearch").submit(handleQuizSearch);
$("#create-quiz-form").submit(createQuizBase);
