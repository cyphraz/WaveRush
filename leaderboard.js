//load leaderboard after page content is ready
document.addEventListener("DOMContentLoaded", () => {
  //get current user from session storage
  const currentUser = JSON.parse(sessionStorage.getItem("current_wave_user"));
  //prevent guest or no user from viewing leaderboard
  if (!currentUser || currentUser.guest) return;

  //get leaderboard table element
  const table = document.getElementById("leaderboardTable");
  //get all users from local storage
  const users = JSON.parse(localStorage.getItem("wave_users")) || {};

  //sort users by top score in descending order
  const sorted = Object.entries(users)
    .map(([email, data]) => ({
      username: data.username,
      score: data.topScore || 0
    }))
    .sort((a, b) => b.score - a.score);

  //create and append table rows for each user
  sorted.forEach((user, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i + 1}</td><td>${user.username}</td><td>${user.score}</td>`;
    table.appendChild(row);
  });
});