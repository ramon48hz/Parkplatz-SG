const apiUrl = "https://daten.stadt.sg.ch/api/explore/v2.1/catalog/datasets/freie-parkplatze-in-der-stadt-stgallen-pls/records?limit=20";

async function ladeParkdaten() {
  try {
    const response = await fetch(apiUrl);
    const daten = await response.json();
    return daten.results;
  } catch (error) {
    console.error("Fehler beim Laden der API-Daten:", error);
    return [];
  }
}

async function zeigeParkhaus(name) {
  const daten = await ladeParkdaten();
  const parkhaus = daten.find(eintrag => eintrag.phname === name);

  if (!parkhaus) {
    alert("Parkhaus nicht gefunden");
    return;
  }

  // Freie Plätze aktualisieren
  document.getElementById("freiePlaetze").innerText = `${parkhaus.shortfree}\nfreie Plätze`;

  // Auslastung aktualisieren
  const auslastungEl = document.getElementById("auslastung");
  const belegung = parkhaus.belegung_prozent;

  auslastungEl.innerText = `${belegung ?? "--"}%\nAuslastung`;

  // Alle möglichen Farben zuerst entfernen
  auslastungEl.classList.remove("green", "yellow", "red", "blue");

  if (belegung == null) {
    auslastungEl.classList.add("blue");
  } else if (belegung <= 50) {
    auslastungEl.classList.add("green");
  } else if (belegung <= 80) {
    auslastungEl.classList.add("yellow");
  } else {
    auslastungEl.classList.add("red");
  }

  // Karte aktualisieren
  document.getElementById("karte").src =
    `https://maps.google.com/maps?q=${parkhaus.standort.lat},${parkhaus.standort.lon}&z=15&output=embed`;
}

// Buttons generieren
ladeParkdaten().then((daten) => {
  const container = document.getElementById("button-container");
  container.innerHTML = "";

  daten.forEach(ph => {
    const button = document.createElement("button");
    button.innerText = ph.phname;

    button.onclick = () => {
      // Alle anderen Buttons zurücksetzen
      const alleButtons = container.querySelectorAll("button");
      alleButtons.forEach(btn => btn.classList.remove("active"));
      // Aktiven Button markieren
      button.classList.add("active");

      // Parkhausdaten anzeigen
      zeigeParkhaus(ph.phname);
    };

    container.appendChild(button);
  });
});
