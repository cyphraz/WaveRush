//waverush typing game (final coursework version)
//features: sentences + difficulty + timer + streak + stats + no repeats + play again

document.addEventListener("DOMContentLoaded", () => {
  //sentence banks by difficulty
  const easysentences = [
    "Ride the waves fast",
    "The ocean is calm",
    "Surf with the tide",
    "Catch the wave now",
    "Sail to the shore",
    "Blue waters ahead"
  ];

  const mediumsentences = [
    "The ocean current flows fast today",
    "Pirates sail across calm blue waters",
    "Waves crash against the golden shore",
    "Seagulls fly high above the reef",
    "The sailor ties ropes on the deck",
    "Deep below the sea, whales roam free"
  ];

  const hardsentences = [
    "Captain, brace yourself—the storm approaches!",
    "Whales leap high; tides rise without warning!",
    "Lightning flashes as the pirate ship drifts.",
    "The sailor shouted, 'Hold tight, the wind is fierce!'",
    "Raging waves struck hard; the mast began to fall!",
    "Thunder roared, yet the brave crew sailed onward!"
  ];

  //dom elements
  const wordDisplay = document.getElementById("word-display");
  const inputWord = document.getElementById("inputWord");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");
  const messageEl = document.getElementById("message");
  const startBtn = document.getElementById("startBtn");
  let diffSelect = document.getElementById("difficulty");

  //ensure difficulty select exists
  if (!diffSelect) {
    diffSelect = document.createElement("select");
    diffSelect.id = "difficulty";
    diffSelect.innerHTML = `
      <option value="easy">Easy 🌊</option>
      <option value="medium">Medium 🌪️</option>
      <option value="hard">Hard 🌋</option>
    `;
    startBtn.before(diffSelect);
  }

  //load user + show top score
  let currentUser = JSON.parse(sessionStorage.getItem("current_wave_user"));
  let users = JSON.parse(localStorage.getItem("wave_users")) || {};
  if (currentUser && users[currentUser.email]) {
    document.getElementById("topScore").innerText = users[currentUser.email].topScore || 0;
  }

  //game state
  let score = 0;
  let timeLeft = 30;
  let timer;
  let playing = false;
  let streak = 0;
  let difficulty = "easy";
  let usedSentences = [];

  //start game
  function startGame() {
    if (playing) return;
    playing = true;
    score = 0;
    streak = 0;
    usedSentences = [];
    difficulty = diffSelect.value;
    messageEl.textContent = "Start typing!";
    inputWord.disabled = false;
    inputWord.value = "";
    scoreEl.textContent = score;

    //timer based on difficulty
    timeLeft = difficulty === "easy" ? 30 : difficulty === "medium" ? 25 : 20;
    timeEl.textContent = timeLeft;

    nextSentence();
    inputWord.focus();

    timer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) endGame();
    }, 1000);
  }

  //get next sentence (no repeats)
  function nextSentence() {
    let list = easysentences;
    if (difficulty === "medium") list = mediumsentences;
    else if (difficulty === "hard") list = hardsentences;

    if (usedSentences.length === list.length) usedSentences = [];

    const available = list.filter(s => !usedSentences.includes(s));
    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];

    wordDisplay.textContent = chosen;
    usedSentences.push(chosen);
  }

  //check input
  inputWord.addEventListener("input", () => {
    const currentSentence = wordDisplay.textContent.trim().toLowerCase();
    const typed = inputWord.value.trim().toLowerCase();

    if (typed === currentSentence) {
      streak++;
      let baseScore = 10 + Math.floor(currentSentence.length / 3);
      if (streak % 3 === 0) {
        baseScore += 5;
        messageEl.textContent = "🔥 Streak Bonus +5!";
        setTimeout(() => (messageEl.textContent = ""), 800);
      }
      score += baseScore;
      scoreEl.textContent = score;
      inputWord.value = "";
      nextSentence();

      //optional difficulty scaling
      timeLeft = Math.max(5, timeLeft - (difficulty === "hard" ? 2 : 1));
    }
  });

  //end game
  function endGame() {
    clearInterval(timer);
    playing = false;
    inputWord.disabled = true;
    messageEl.textContent = `Game Over! Final Score: ${score}`;
    saveStats();
  }

  //save stats
  function saveStats() {
    if (!currentUser || currentUser.guest) return;
    const email = currentUser.email;
    const user = users[email];
    if (!user) return;

    user.topScore = Math.max(user.topScore || 0, score);
    user.gamesPlayed = (user.gamesPlayed || 0) + 1;
    user.totalScore = (user.totalScore || 0) + score;
    localStorage.setItem("wave_users", JSON.stringify(users));
    document.getElementById("topScore").innerText = user.topScore;
  }

  //play again button (added dynamically)
  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Play Again";
  restartBtn.style.marginTop = "10px";
  restartBtn.id = "restartBtn";
  startBtn.after(restartBtn);

  restartBtn.addEventListener("click", startGame);
  startBtn.addEventListener("click", startGame);
});