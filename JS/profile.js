//profile page display + edit
document.addEventListener("DOMContentLoaded", () => {
  //get current user and all stored users
  const currentUser = JSON.parse(sessionStorage.getItem("current_wave_user"));
  const users = JSON.parse(localStorage.getItem("wave_users")) || {};
  const msg = document.getElementById("message");

  //if logged in, display info; else show message
  if (currentUser && users[currentUser.email]) {
    const user = users[currentUser.email];
    document.getElementById("profileUsername").innerText = user.username;
    document.getElementById("profileEmail").innerText = currentUser.email;
    document.getElementById("profileAge").innerText = user.age || "N/A";
    document.getElementById("profileGender").innerText = user.gender || "N/A";
    document.getElementById("profileTopScore").innerText = user.topScore || 0;
    document.getElementById("profileGames").innerText = user.gamesPlayed || 0;
  } else {
    document.querySelector(".page-section").innerHTML = "<p>please log in to view your profile.</p>";
    return;
  }

  //handle profile edit
  document.getElementById("editProfileBtn").addEventListener("click", () => {
    const users = JSON.parse(localStorage.getItem("wave_users")) || {};
    const email = currentUser.email;
    const user = users[email];

    //ask user for new details
    const newUsername = prompt("enter new username:", user.username);
    const newAge = prompt("enter your age:", user.age);
    const newGender = prompt("enter your gender (male/female/other):", user.gender);

    //update if new values entered
    if (newUsername) user.username = newUsername;
    if (newAge) user.age = newAge;
    if (newGender) user.gender = newGender;

    //save updated info
    localStorage.setItem("wave_users", JSON.stringify(users));
    sessionStorage.setItem("current_wave_user", JSON.stringify({ email, username: user.username }));

    //update profile display
    document.getElementById("profileUsername").innerText = user.username;
    document.getElementById("profileAge").innerText = user.age;
    document.getElementById("profileGender").innerText = user.gender;

    //show success message
    msg.style.color = "lightgreen";
    msg.textContent = "profile updated successfully!";
  });
});
