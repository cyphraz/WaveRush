//register new user with age & gender
document.addEventListener("DOMContentLoaded", () => {
  //get button and message element
  const registerBtn = document.getElementById("registerBtn");
  const msg = document.getElementById("registerMessage");

  //when register button clicked
  registerBtn.addEventListener("click", () => {
    //collect form values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;

    //get existing users or create empty object
    let users = JSON.parse(localStorage.getItem("wave_users")) || {};

    //check for empty fields
    if (!username || !email || !password || !confirmPassword || !age || !gender) {
      msg.style.color = "red";
      msg.textContent = "please fill in all fields!";
      return;
    }

    //check if passwords match
    if (password !== confirmPassword) {
      msg.style.color = "orange";
      msg.textContent = "passwords do not match!";
      return;
    }

    //check for duplicate email
    if (users[email]) {
      msg.style.color = "orange";
      msg.textContent = "account already exists!";
      return;
    }

    //save new user details
    users[email] = {
      username,
      password,
      age,
      gender,
      topScore: 0,
      gamesPlayed: 0,
      totalScore: 0
    };

    //update local storage
    localStorage.setItem("wave_users", JSON.stringify(users));

    //show success message
    msg.style.color = "lightgreen";
    msg.textContent = "account created successfully!";
    setTimeout(() => (window.location.href = "home.html"), 1500);
  });
});
