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

$("#quizSearch").submit(handleQuizSearch);
