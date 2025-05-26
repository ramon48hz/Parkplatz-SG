const apiUrl = "parkdaten.json";

async function ladeParkdaten() {
  try {
    const response = await fetch(apiUrl);
    const daten = await response.json();
    return daten.results;
  } catch (error) {
    console.error("Fehler beim Laden der API-Daten:", error);
  }
}

async function zeigeParkhaus(name) {
  const daten = await ladeParkdaten();
  const parkhaus = daten.find(eintrag => eintrag.phname === name);

  if (!parkhaus) {
    alert("Parkhaus nicht gefunden");
    return;
  }

  document.getElementById("freiePlaetze").innerText = `${parkhaus.shortfree}\nfreie Plätze`;
  document.getElementById("auslastung").innerText = `${parkhaus.belegung_prozent}%\nAuslastung`;
  document.getElementById("karte").src = 
    `https://maps.google.com/maps?q=${parkhaus.standort.lat},${parkhaus.standort.lon}&z=15&output=embed`;
}

ladeParkdaten().then((daten) => {
  const container = document.getElementById("button-container");

  daten.forEach(ph => {
    const button = document.createElement("button");
    button.innerText = ph.phname;
    button.onclick = () => zeigeParkhaus(ph.phname);
    container.appendChild(button);
  });
});