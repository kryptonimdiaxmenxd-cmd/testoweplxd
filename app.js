// Zapis i odczyt nicku
function saveNick() {
  const nick = document.getElementById("discordNick").value;
  if (nick.trim() !== "") {
    localStorage.setItem("discordNick", nick);
    alert("Nick zapisany!");
  }
}

window.onload = function () {
  const nickInput = document.getElementById("discordNick");
  const savedNick = localStorage.getItem("discordNick");
  if (nickInput && savedNick) {
    nickInput.value = savedNick;
  }
};

// Generator QR Code
function generateQR() {
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // wyczyszczenie
  const qrText = document.getElementById("qrInput").value;

  if (qrText.trim() !== "") {
    new QRCode(qrContainer, {
      text: qrText,
      width: 200,
      height: 200,
      colorDark: "#ffffff",
      colorLight: "#181824",
    });
  } else {
    alert("Wpisz link przed wygenerowaniem QR!");
  }
}
