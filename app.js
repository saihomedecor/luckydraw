// app.js
const form = document.getElementById("entryForm");
const drawBtn = document.getElementById("drawBtn");
const winnerEl = document.getElementById("winner");

// Entry submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) {
    alert("Please fill all fields");
    return;
  }

  // Check if already entered
  const snapshot = await db.collection("entries").where("phone", "==", phone).get();
  if (!snapshot.empty) {
    alert("This phone number already has an entry!");
    return;
  }

  await db.collection("entries").add({ name, phone });
  alert("Entry submitted!");
  form.reset();
});

// Lucky draw
drawBtn.addEventListener("click", async () => {
  const snapshot = await db.collection("entries").get();
  const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  if (entries.length === 0) {
    alert("No entries found!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * entries.length);
  const winner = entries[randomIndex];

  winnerEl.textContent = `Winner: ${winner.name} (${winner.phone})`;

  // Remove winner so next time they don’t win again
  await db.collection("entries").doc(winner.id).delete();
});
