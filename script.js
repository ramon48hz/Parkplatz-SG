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

  const infoBox = document.getElementById("parkhaus-info");
  const freiePlaetzeEl = document.getElementById("freiePlaetze");
  const auslastungEl = document.getElementById("auslastung");

  if (parkhaus.phstate === "nicht verfügbar") {
    freiePlaetzeEl.style.display = "none";
    auslastungEl.style.display = "none";

    let geschlossenMsg = document.getElementById("geschlossen-msg");
    if (!geschlossenMsg) {
      geschlossenMsg = document.createElement("div");
      geschlossenMsg.id = "geschlossen-msg";
      geschlossenMsg.innerText = "Parkhaus geschlossen";
      geschlossenMsg.style.color = "#dc3545";
      geschlossenMsg.style.fontSize = "24px";
      geschlossenMsg.style.fontWeight = "bold";
      geschlossenMsg.style.marginTop = "20px";
      geschlossenMsg.style.textAlign = "center";
      infoBox.appendChild(geschlossenMsg);
    } else {
      geschlossenMsg.style.display = "block";
    }

    document.getElementById("karte").src = "";
    return;
  }

  document.getElementById("karte").src =
    `https://maps.google.com/maps?q=${parkhaus.standort.lat},${parkhaus.standort.lon}&z=15&output=embed`;

  const geschlossenMsg = document.getElementById("geschlossen-msg");
  if (geschlossenMsg) geschlossenMsg.style.display = "none";

  freiePlaetzeEl.style.display = "flex";
  auslastungEl.style.display = "flex";

  freiePlaetzeEl.innerText = `${parkhaus.shortfree}\nfreie Plätze`;
  freiePlaetzeEl.className = "bubble blue";

  const belegung = parkhaus.belegung_prozent;
  auslastungEl.innerText = `${belegung ?? "--"}%\nAuslastung`;
  auslastungEl.className = "bubble";

  if (belegung == null) {
    auslastungEl.classList.add("blue");
  } else if (belegung <= 50) {
    auslastungEl.classList.add("green");
  } else if (belegung <= 80) {
    auslastungEl.classList.add("yellow");
  } else {
    auslastungEl.classList.add("red");
  }
}

ladeParkdaten().then((daten) => {
  const container = document.getElementById("button-container");
  container.innerHTML = "";

  daten.forEach(ph => {
    const button = document.createElement("button");
    button.innerText = ph.phname;

    button.onclick = () => {
      document.querySelectorAll("#button-container button").forEach(btn =>
        btn.classList.remove("active")
      );
      button.classList.add("active");

      zeigeParkhaus(ph.phname);

      document.getElementById("parkhaus-info").scrollIntoView({
        behavior: "smooth"
      });
    };

    container.appendChild(button);
  });
});
