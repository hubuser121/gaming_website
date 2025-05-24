document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }

  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value;

      if (!username) {
        alert('Please enter a username.');
        return;
      }
      if (!password) {
        alert('Please enter a password.');
        return;
      }

      const users = getUsers();
      const user = users.find(u => u.username === username);

      if (!user) {
        alert('User not found. Please register first.');
        return;
      }

      if (user.password !== password) {
        alert('Incorrect password.');
        return;
      }

      // Successful login
      localStorage.setItem('loggedInUser', username);

      // Initialize userGames entry if not exists
      const allGames = JSON.parse(localStorage.getItem('userGames')) || {};
      if (!allGames[username]) {
        allGames[username] = [];
        localStorage.setItem('userGames', JSON.stringify(allGames));
      }

      alert('Login successful!');
      window.location.href = 'index.html';
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value.trim();
      const password = document.getElementById('registerPassword').value;

      if (!username || !password) {
        alert('Please enter both username and password.');
        return;
      }

      const users = getUsers();
      if (users.find(u => u.username === username)) {
        alert('Username already exists.');
        return;
      }

      users.push({ username, password });
      saveUsers(users);
      alert('Registration successful! You can now login.');
      registerForm.reset();
    });
  }
});
