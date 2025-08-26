// Entry submit karne ka code
document.getElementById("entryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !phone) return alert("Please enter details");

  // Duplicate check
  const snapshot = await db.collection("entries")
    .where("phone", "==", phone)
    .get();

  if (!snapshot.empty) {
    alert("❌ Aap pehle se entry kar chuke ho!");
    return;
  }

  await db.collection("entries").add({ name, phone });
  alert("✅ Entry submitted successfully!");
});

// Winner select karna
document.getElementById("drawBtn").addEventListener("click", async () => {
  const snapshot = await db.collection("entries").get();
  if (snapshot.empty) {
    alert("No entries yet!");
    return;
  }

  const entries = [];
  snapshot.forEach(doc => entries.push(doc.data()));

  const randomIndex = Math.floor(Math.random() * entries.length);
  const winner = entries[randomIndex];

  document.getElementById("winner").innerText =
    `🏆 Winner: ${winner.name} (${winner.phone})`;
});
