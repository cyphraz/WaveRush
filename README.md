# WaveRush
WaveRush is a browser-based typing speed game with an ocean theme. Players are shown sentences and must type them correctly before the timer runs out. The project includes a full front-end account flow (register, login, guest mode, profile), a leaderboard, and persistent stats stored in browser storage - no backend required.
Overview
--------
WaveRush challenges players to type ocean-themed sentences as fast and accurately as
possible within a time limit. Difficulty levels adjust both the sentence complexity and
the available time. A streak bonus system rewards consistent accuracy, and all scores
and stats are saved locally across sessions.

Features
--------
* Sentence-based typing gameplay rendered in the browser
* Three difficulty levels:
    * Easy   — short sentences, 30-second timer
    * Medium — longer sentences, 25-second timer
    * Hard   — complex sentences with punctuation, 20-second timer
* Timer that decreases slightly with each correct sentence (pressure mechanic)
* Streak bonus: every 3 consecutive correct sentences awards +5 extra points
* Score calculated per sentence based on length
* No-repeat sentence system — sentences do not repeat until the full bank is exhausted
* Play Again button to restart without reloading the page
* Top score displayed live on the game page
* Authentication pages (front-end only):
    * Register — collects username, email, password, age, and gender
    * Login    — validates credentials and stores session; supports guest mode
    * Logout   — clears session storage
* Profile page — displays username, email, age, gender, top score, and games played;
  allows inline editing via prompts
* Leaderboard — ranks all registered users by top score (guests excluded)

How to Play
-----------
1. Open home.html in your browser.
2. Register a new account on the Register page, or use "Play as Guest" on the login page.
3. Select a difficulty level and click Start.
4. Type each sentence displayed exactly as shown — submission is automatic on a full match.
5. Score as many points as possible before the timer reaches zero.
6. Click Play Again to try for a higher score.
7. View your ranking on the Leaderboard (registered users only).

Tech Stack
----------
* HTML5
* CSS3
* JavaScript (ES6, plain script tags — no bundler or module system)
* Browser localStorage / sessionStorage

Project Structure
-----------------
  HTML/
    home.html          - login page (entry point)
    register.html      - account registration
    game.html          - typing game
    leaderboard.html   - score rankings
    profile.html       - user profile and edit

  JS/
    game.js            - core game logic (sentences, timer, scoring, streaks)
    login.js           - login and guest login handlers
    register.js        - registration form handler
    leaderboard.js     - leaderboard table builder
    localstorage.js    - StorageManager utility + shared auth functions
    profile.js         - profile display and inline edit
    logout.js          - logout handler

  CSS/
    start.css          - global styles

  assets/
    ocean-7554.gif     - background animation

  Fonts/
    Winkle-Regular.ttf - custom display font

Run Locally
-----------
Because pages use relative links, the project can open directly in a browser:

  1. Download or unzip the project folder.
  2. Open HTML/home.html in your browser.
  3. Register an account, then log in to play.

Optional (recommended) — run with a local static server to avoid any path issues:

  # Python
  python -m http.server 8000
  Then open: http://localhost:8000/HTML/home.html

  # Node.js
  npx serve .
  Then open the URL shown in the terminal.

Data Storage
------------
All data is stored in browser storage under these keys:

  localStorage:
    wave_users          - object keyed by email; stores username, password, age,
                          gender, topScore, gamesPlayed, and totalScore per user
    current_wave_user   - persisted login set by localstorage.js

  sessionStorage:
    current_wave_user   - set on login as { email, username }, or { guest: true }
                          for guest sessions

Notes
-----
* This is a fully client-side project with no backend.
* Passwords are stored in plain text in localStorage. This is suitable for a local
  demo or coursework submission only — not for production use.
* Guest users can play the game but cannot access the leaderboard or save scores.
* The profile edit feature uses browser prompt() dialogs for input.
