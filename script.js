const API = "YOUR_BACKEND_URL/chat";
const messages = document.getElementById("messages");
const input = document.getElementById("msgInput");

function addMessage(text, sender){
  const div = document.createElement("div");
  div.className = "msg";
  div.innerText = (sender === "user" ? "You: " : "Loria: ") + text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMsg(){
  const text = input.value.trim();
  if(!text) return;
  addMessage(text, "user");
  input.value = "";
  try{
    const res = await fetch(API, {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ message:text })
    });
    const data = await res.json();
    addMessage(data.reply || "No response", "bot");
  }catch(e){
    addMessage("Error connecting to server.", "bot");
  }
}
