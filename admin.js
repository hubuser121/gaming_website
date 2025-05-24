// Admin credentials
const ADMIN_USERNAME = "TLG_GAMING";
const ADMIN_PASSWORD = "9880117035";

const loginContainer = document.getElementById("login-container");
const adminPanel = document.getElementById("admin-panel");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginError = document.getElementById("loginError");

const tournamentListEl = document.getElementById("tournamentList");
const addTournamentBtn = document.getElementById("addTournamentBtn");

const tournamentNameInput = document.getElementById("tournamentName");
const tournamentRoomInput = document.getElementById("tournamentRoom");
const entryFeeInput = document.getElementById("entryFee");
const prizeInput = document.getElementById("prize");
const timeInput = document.getElementById("time");
const dateInput = document.getElementById("tournamentDate");
const descriptionInput = document.getElementById("description");

let tournaments = JSON.parse(localStorage.getItem("tournaments")) || [];
let editIndex = -1;

function renderTournaments() {
  tournamentListEl.innerHTML = "";

  if (tournaments.length === 0) {
    tournamentListEl.innerHTML = "<li>No tournaments added yet.</li>";
    return;
  }

  tournaments.forEach((tournament, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${tournament.name}</strong> - Room ${tournament.room} | 
        Entry Fee: ₹${tournament.entryFee} | Prize: ₹${tournament.prize} |
        Time: ${tournament.time} | Date: ${tournament.date}
      </span>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    tournamentListEl.appendChild(li);
  });

  // Delete handlers
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = e.target.getAttribute("data-index");
      tournaments.splice(idx, 1);
      localStorage.setItem("tournaments", JSON.stringify(tournaments));
      renderTournaments();
    });
  });

  // Edit handlers
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.target.getAttribute("data-index"));
      const t = tournaments[idx];
      tournamentNameInput.value = t.name;
      tournamentRoomInput.value = t.room;
      entryFeeInput.value = t.entryFee;
      prizeInput.value = t.prize;
      timeInput.value = t.time;
      dateInput.value = t.date;

      editIndex = idx;
      addTournamentBtn.textContent = "Update Tournament";
    });
  });
}

function login() {
  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    loginError.style.display = "none";
    showAdminPanel();
  } else {
    loginError.textContent = "Invalid username or password";
    loginError.style.display = "block";
  }
}

function showAdminPanel() {
  loginContainer.style.display = "none";
  adminPanel.style.display = "block";
  renderTournaments();
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  adminPanel.style.display = "none";
  loginContainer.style.display = "block";
  clearInputs();
}

function clearInputs() {
  tournamentNameInput.value = "";
  tournamentRoomInput.value = "";
  entryFeeInput.value = "";
  prizeInput.value = "";
  timeInput.value = "";
  dateInput.value = "";
  editIndex = -1;
  addTournamentBtn.textContent = "Add Tournament";
}

function addOrUpdateTournament() {
  const name = tournamentNameInput.value.trim();
  const room = tournamentRoomInput.value.trim();
  const entryFee = parseInt(entryFeeInput.value);
  const prize = parseInt(prizeInput.value);
  const time = timeInput.value.trim();
  const date = dateInput.value.trim();

  if (!name || !room || isNaN(entryFee) || isNaN(prize) || !time || !date) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (editIndex === -1) {
    tournaments.push({ name, room, entryFee, prize, time, date });
  } else {
    tournaments[editIndex] = { name, room, entryFee, prize, time, date };
  }

  localStorage.setItem("tournaments", JSON.stringify(tournaments));
  renderTournaments();
  clearInputs();
}

loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
addTournamentBtn.addEventListener("click", addOrUpdateTournament);

// Auto-login
if (localStorage.getItem("adminLoggedIn") === "true") {
  showAdminPanel();
}
