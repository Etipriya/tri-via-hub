const axios = require("axios");

const getApiQuestions = async (params = {}) => {
  try {
    const response = await axios.get("https://opentdb.com/api.php", { params });
    const { data } = response;
    const generatedQuizQuestions = data.results;
    return generatedQuizQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = getApiQuestions;
