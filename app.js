// --- Discord nick system ---
function saveNick() {
  const nickInput = document.getElementById("nickInput");
  if (nickInput.value.trim() === "") {
    alert("⚠️ Podaj nick z Discorda!");
    return;
  }
  localStorage.setItem("discordNick", nickInput.value.trim());
  alert("✅ Nick zapisany!");
}

document.addEventListener("DOMContentLoaded", () => {
  const nickInput = document.getElementById("nickInput");
  const savedNick = localStorage.getItem("discordNick");
  if (nickInput && savedNick) {
    nickInput.value = savedNick;
  }
});

// --- QR Code Generator ---
function generateQRCode() {
  const qrContainer = document.getElementById("qrcode");
  const textInput = document.getElementById("qrText").value;

  if (!textInput) {
    alert("⚠️ Wpisz tekst lub link do wygenerowania QR!");
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
