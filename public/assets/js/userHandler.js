const handleSignup = async (event) => {
  event.preventDefault();

  console.log("Here");

  const first_name = $("#first_name").val();
  const last_name = $("#last_name").val();
  const username = $("#username").val();
  const email = $("#email").val();
  const password = $("#password").val();

  if (!first_name || !last_name || !username || !email || !password) {
    console.log("You must complete all fields");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password,
    }),
  };

  const response = await fetch("/auth/signup", options);

  if (response.status !== 201) {
    console.log("FAILED TO CREATE USER");
  } else {
    window.location.replace("/dashboard");
  }
};

$("#signupForm").submit(handleSignup);
