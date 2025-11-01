const chatBox = document.getElementById("chat-box");
const input = document.getElementById("input");
const send = document.getElementById("send");

const API_URL = "https://loriathebotn2s-production.up.railway.app/chat";

send.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => { if (e.key === "Enter") sendMessage(); });

function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;
  addMessage("user", message);
  input.value = "";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  addMessage("bot", data.reply);
}
