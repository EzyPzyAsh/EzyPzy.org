const fs = require("fs");
const https = require("https");
const express = require("express");
const { WebSocketServer } = require("ws");
const path = require("path");

const app = express();

// Serve your front-end files
app.use("/messages", express.static(path.join(__dirname, "public")));

// Create HTTPS server using your certificate
const server = https.createServer({
  key: fs.readFileSync("/home/serverme/SSL/ionos/_.ezypzy.org_private_key.key"),
  cert: fs.readFileSync("/home/serverme/SSL/ionos/ezypzy.org_fullchain.crt")
}, app);

// WebSocket server
const wss = new WebSocketServer({ server });

const channels = new Map();

wss.on("connection", (ws) => {
  let currentChannel = null;

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.type === "join") {
        if (currentChannel && channels.has(currentChannel)) {
          channels.get(currentChannel).delete(ws);
        }
        currentChannel = data.channel;
        if (!channels.has(currentChannel)) channels.set(currentChannel, new Set());
        channels.get(currentChannel).add(ws);

        // notify user joined
        ws.send(JSON.stringify({ type: "join", text: `Joined channel ${currentChannel}` }));
      }

      else if (data.type === "msg" && currentChannel) {
        for (const client of channels.get(currentChannel)) {
          if (client !== ws && client.readyState === ws.OPEN) {
            client.send(JSON.stringify({ type: "msg", text: data.text }));
          }
        }
      }

      else if (data.type === "leave" && currentChannel) {
        if (channels.has(currentChannel)) channels.get(currentChannel).delete(ws);
        ws.send(JSON.stringify({ type: "leave", text: `Left channel ${currentChannel}` }));
        currentChannel = null;
      }

    } catch (err) {
      console.error("Bad message:", err);
    }
  });

  ws.on("close", () => {
    if (currentChannel && channels.has(currentChannel)) {
      channels.get(currentChannel).delete(ws);
    }
  });
});

// Listen on port 443 for HTTPS/WSS
server.listen(443, () => {
  console.log("Secure server running at https://ezypzy.org/messages");
});

