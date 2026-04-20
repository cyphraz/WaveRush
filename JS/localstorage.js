/*js/localstorage.js
  centralized user account functions (no alerts, uses inline messages)
  functions: loginuser, registeruser, editprofile, logoutuser, loadprofileonpage
*/

//storagemanager handles saving/loading data
const StorageManager = {
  keyUsers: 'wave_users',
  keyCurrent: 'current_wave_user',

  //get all users
  getUsers() {
    try { return JSON.parse(localStorage.getItem(this.keyUsers)) || {}; }
    catch (e) { return {}; }
  },

  //save users to local storage
  setUsers(obj) {
    localStorage.setItem(this.keyUsers, JSON.stringify(obj));
  },

  //get currently logged-in user
  getCurrentUser() {
    try { return JSON.parse(localStorage.getItem(this.keyCurrent)); }
    catch (e) { return null; }
  },

  //set current user data
  setCurrentUser(userObj) {
    localStorage.setItem(this.keyCurrent, JSON.stringify(userObj));
  },

  //clear current user data
  clearCurrentUser() {
    localStorage.removeItem(this.keyCurrent);
  }
};

//login user with email, username, and password
function loginUser(email, password, username, messageEl) {
  const users = StorageManager.getUsers();
  if (users[email] && users[email].password === password && users[email].username === username) {
    StorageManager.setCurrentUser({ email, username });
    if (messageEl) {
      messageEl.style.color = "lightgreen";
      messageEl.innerText = "login successful! redirecting...";
    }
    return true;
  } else {
    if (messageEl) {
      messageEl.style.color = "red";
      messageEl.innerText = "invalid login credentials.";
    }
    return false;
  }
}

//register a new user
function registerUser(email, username, password, messageEl) {
  const users = StorageManager.getUsers();
  if (users[email]) {
    if (messageEl) { 
      messageEl.style.color = "orange"; 
      messageEl.innerText = "account already exists!"; 
    }
    return false;
  }
  users[email] = { username, password, topScore: 0 };
  StorageManager.setUsers(users);
  if (messageEl) { 
    messageEl.style.color = "lightgreen"; 
    messageEl.innerText = "registered successfully! you can now login."; 
  }
  return true;
}

//update user profile details
function updateProfile(oldEmail, newEmail, newUsername, messageEl) {
  const users = StorageManager.getUsers();
  if (!users[oldEmail]) {
    if (messageEl) { 
      messageEl.style.color = "red"; 
      messageEl.innerText = "original account not found."; 
    }
    return false;
  }
  if (newEmail !== oldEmail && users[newEmail]) {
    if (messageEl) { 
      messageEl.style.color = "orange"; 
      messageEl.innerText = "email already in use!"; 
    }
    return false;
  }

  users[newEmail] = {
    username: newUsername,
    password: users[oldEmail].password || "",
    topScore: users[oldEmail].topScore || 0
  };

  if (newEmail !== oldEmail) delete users[oldEmail];
  StorageManager.setUsers(users);
  StorageManager.setCurrentUser({ email: newEmail, username: newUsername });

  if (messageEl) { 
    messageEl.style.color = "lightgreen"; 
    messageEl.innerText = "profile updated!"; 
  }
  return true;
}

//logout user and clear session
function logoutUserUI(messageEl) {
  StorageManager.clearCurrentUser();
  if (messageEl) { 
    messageEl.style.color = "lightgreen"; 
    messageEl.innerText = "you have logged out."; 
  }
}
