fetch("parkdaten.json")
  .then(response => response.json())
  .then(data => {
    console.log("✅ Daten geladen:", data);
  })
  .catch(error => {
    console.error("❌ Fehler beim Laden:", error);
  });