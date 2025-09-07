// --- Discord nick system ---
document.addEventListener("DOMContentLoaded", () => {
  const nickDisplay = document.getElementById("nickDisplay");
  let savedNick = localStorage.getItem("discordNick");

  if (!savedNick) {
    savedNick = prompt("Podaj swój nick z Discorda:");
    if (savedNick) {
      localStorage.setItem("discordNick", savedNick);
    }
  }

  if (nickDisplay && savedNick) {
    nickDisplay.textContent = "👤 " + savedNick;
  }
});

// --- QR Code Generator ---
function generateQRCode() {
  const qrContainer = document.getElementById("qrcode");
  const textInput = document.getElementById("qrText").value;

  if (!textInput) {
    alert("Wpisz tekst lub link do wygenerowania QR!");
    return;
  }

  qrContainer.innerHTML = ""; // czyści poprzedni kod

  new QRCode(qrContainer, {
    text: textInput,
    width: 200,
    height: 200,
    colorDark: "#00fff7",
    colorLight: "#0f0f1a",
    correctLevel: QRCode.CorrectLevel.H
  });
}

