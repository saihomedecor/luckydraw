const form = document.getElementById("entryForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const participantsList = document.getElementById("participantsList");
const drawButton = document.getElementById("drawButton");
const winnerName = document.getElementById("winnerName");

let participants = [];

// Load saved participants
if (localStorage.getItem("participants")) {
  participants = JSON.parse(localStorage.getItem("participants"));
  renderList();
}

// Add entry
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (name && phone) {
    participants.push({ name, phone });
    localStorage.setItem("participants", JSON.stringify(participants));
    renderList();
    form.reset();
  }
});

// Render participant list
function renderList() {
  participantsList.innerHTML = "";
  participants.forEach((p, index) => {
    const li = document.createElement("li");
    li.textContent = `${p.name} (${p.phone})`;
    participantsList.appendChild(li);
  });
}

// Pick winner
drawButton.addEventListener("click", () => {
  if (participants.length === 0) {
    alert("No participants added!");
    return;
  }
  const randomIndex = Math.floor(Math.random() * participants.length);
  const winner = participants[randomIndex];
  winnerName.textContent = `${winner.name} (${winner.phone}) 🎉`;
});
