let ws;
let currentChannel = null;

function connectWS() {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  ws = new WebSocket(`${protocol}://${location.host}/messages`);

  ws.onopen = () => console.log("[WS] Connected to server");
  ws.onclose = () => console.log("[WS] Connection closed");
  ws.onerror = (err) => console.error("[WS] Error:", err);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const div = document.createElement("div");

    switch (data.type) {
      case "msg":
	//tmk .textcontent is typesafe
	var audio = new Audio('ping.mp3');
	audio.play();
        div.textContent = data.text;
        div.style.color = "#000";
        break;
      case "join":
        div.textContent = `Someone joined the channel! (Users: ${data.userCount})`;
        div.style.fontStyle = "italic";
        div.style.color = "green";
        break;
      case "leave":
        div.textContent = `Someone left the channel. (Users: ${data.userCount})`;
        div.style.fontStyle = "italic";
        div.style.color = "red";
        break;
    }

    // Scroll behavior
    const atBottom = chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 50;
    chatBox.appendChild(div);
    if (atBottom) chatBox.scrollTop = chatBox.scrollHeight;
  };
}

// connect :P
connectWS();

// check WS is open before sending
function sendWS(msgObj) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.log("[WS] Reconnecting before sending...");
    connectWS();
    ws.onopen = () => ws.send(JSON.stringify(msgObj));
  } else {
    ws.send(JSON.stringify(msgObj));
  }
}

// DOM Elements only for getting, since putting like this is not safe
const chatBox = document.getElementById("chatBox");
const channelInput = document.getElementById("channelInput");
const messageInput = document.getElementById("messageInput");
const joinBtn = document.getElementById("joinBtn");
const sendBtn = document.getElementById("sendBtn");

joinBtn.onclick = () => {
  const channel = channelInput.value.trim();
  if (!channel) return alert("Enter a channel name!");
  currentChannel = channel;
  chatBox.innerHTML = "";
  sendWS({ type: "join", channel });
};

sendBtn.onclick = () => {
  const text = messageInput.value.trim();
  if (!text || !currentChannel) return alert("Join a channel first!");
  sendWS({ type: "msg", text });
  messageInput.value = "";
};

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendBtn.click();
});

