# Parking SG – Slotify

## Kurzbeschreibung des Projekts
Slotify zeigt in Echtzeit die freien Parkplätze in den Parkhäusern von St. Gallen an. Die Daten werden automatisch über eine öffentliche API geladen und visuell aufbereitet, inklusive Auslastung, Karte und Farbcodierung.

## Gruppenname
Parking SG

## Gruppenmitglieder
Ramon Künzle 24C1 (ramon.kuenzle@stud.fhgr.ch)
Indira Hagmann 24C1 (indira.hagmann@stud.fhgr.ch)

## Learnings & Schwierigkeiten
Ramon: 
Durch die Gestaltung der Webseite habe ich gelernt, wie man die dargestellten Informationen übersichtlich und responsiv präsentiert. Eine besondere Herausforderung bestand darin, das in Figma entworfene Webdesign mithilfe von HTML und CSS entsprechend umzusetzen und die Elemente identisch darzustellen.

Indira: Ich konnte meine Kenntnisse in JavaScript und CSS-Grid vertiefen. Eine Herausforderung war es, den Fehler zu finden, warum zwei Parkhäuser keine Daten liefern, nach längerem Analysieren stellte sich heraus, dass diese nicht mehr betrieben werden.

## Verwendete Ressourcen & Prompts
- API: (https://daten.stadt.sg.ch/api/explore/v2.1/catalog/datasets/freie-parkplatze-in-der-stadt-stgallen-pls/records?limit=20)  
- Prompting & Hilfe: ChatGPT zur Fehlersuche, Strukturverbesserung und Verständnis von API-Verhalten

### Prompts, die gut funktioniert haben:
- "Wie kann ich mit JavaScript Daten aus einer öffentlichen API laden und dynamisch Buttons für jedes Parkhaus erzeugen?"
  → half beim dynamischen Erzeugen der Buttonliste pro Parkhaus.
- "Wie setze ich eine farbliche Auslastungsanzeige in CSS um, die sich je nach Prozentwert ändert?"
  → ergab eine einfache Lösung mit `.classList.add()` und Farbklassen.

### Prompts, die nicht zielführend waren
- "Warum funktioniert meine API-Verbindung nicht, obwohl der Link korrekt ist?"  
  → Antwort war zu allgemein, Ursache war ein veraltetes Parkhaus (kein Betrieb mehr).
- "Wie mache ich meine Website vollständig responsive, ohne alles neu zu schreiben?" 
  → Vorschläge waren zu komplex; besser war es, gezielt Elemente zu optimieren.

## Links
- Figma-Design (https://www.figma.com/design/BtEK61fHzYJwJqdYuO29Vb/Slotify?node-id=0-1&t=MYaKESzPiQDXO9dI-1)
- GitHub Repository (https://github.com/ramon48hz/Parkplatz-SG)

## Weitere Verwendung
Projekt nur für das Modul Interaktive Medien II, keine weitere Verwendung geplant.
