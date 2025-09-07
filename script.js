function saveNick() {
  const nick = document.getElementById("discordNick").value;
  if (nick.trim() !== "") {
    localStorage.setItem("discordNick", nick);
    alert("✅ Zapisano Twój nick: " + nick);
    document.querySelectorAll("#nickDisplay").forEach(el => el.innerText = "👤 " + nick);
  }
}
window.onload = () => {
  const nick = localStorage.getItem("discordNick");
  if (nick) {
    const nickInput = document.getElementById("discordNick");
    if (nickInput) nickInput.value = nick;
    document.querySelectorAll("#nickDisplay").forEach(el => el.innerText = "👤 " + nick);
  }
};
