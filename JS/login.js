document.addEventListener("DOMContentLoaded", () => {

  //function to show quick messages under form
  function displayMessage(msg, color = "white", time = 2500) {
    const messageEl = document.getElementById("message");
    messageEl.textContent = msg;
    messageEl.style.color = color;
    setTimeout(() => (messageEl.textContent = ""), time);
  }

  //handle signup button
  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      let users = JSON.parse(localStorage.getItem("wave_users")) || {};

      if (!username || !email || !password) {
        displayMessage("all fields are required!", "red");
        return;
      }
      if (!email.includes("@")) {
        displayMessage("enter a valid email address.", "red");
        return;
      }
      if (users[email]) {
        displayMessage("account already exists!", "orange");
        return;
      }

      users[email] = { username, password, topScore: 0 };
      localStorage.setItem("wave_users", JSON.stringify(users));
      displayMessage("account created successfully!", "lightgreen");
    });
  }

  //handle login button
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const email = document.getElementById("email").value.trim();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      const users = JSON.parse(localStorage.getItem("wave_users")) || {};

      if (users[email] && users[email].password === password && users[email].username === username) {
        sessionStorage.setItem("current_wave_user", JSON.stringify({ email, username }));
        displayMessage("login successful! redirecting...", "lightgreen");
        setTimeout(() => window.location.href = "game.html", 1200);
      } else {
        displayMessage("invalid credentials.", "red");
      }
    });
  }

  //handle guest login
  const guestBtn = document.getElementById("guestBtn");
  if (guestBtn) {
    guestBtn.addEventListener("click", () => {
      sessionStorage.setItem("current_wave_user", JSON.stringify({ guest: true }));
      displayMessage("continuing as guest...", "yellow");
      setTimeout(() => window.location.href = "game.html", 1200);
    });
  }
});
