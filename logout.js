//logout button control
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const logoutLi = document.getElementById("logoutLi");

  //hide logout by default
  if (logoutLi) logoutLi.style.display = "none";

  //get current user session
  const currentUser = JSON.parse(sessionStorage.getItem("current_wave_user"));

  //show logout only if user is logged in and not guest
  if (currentUser && !currentUser.guest) {
    logoutLi.style.display = "inline";
  }

  //logout action
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("current_wave_user");
      alert("logged out successfully!");
      window.location.href = "home.html";
    });
  }
});