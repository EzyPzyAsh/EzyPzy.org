const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");

const app = express();
app.use("/messages", express.static(__dirname + "/public"));

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const channels = new Map(); // channel = Set of sockets for my sanity

// Upgrade handler for WebSocket (idrk what this means but it connects and i do the if in case someone tries to change the address)
server.on("upgrade", (request, socket, head) => {
  if (request.url === "/messages") {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

wss.on("connection", (ws, request) => {
  let currentChannel = null;

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      if (data.type === "join") {
        const oldChannel = currentChannel;

        // Leave old channel if any
        if (oldChannel && channels.has(oldChannel)) {
          channels.get(oldChannel).delete(ws);
          const leaveCount = channels.get(oldChannel).size;
          for (const client of channels.get(oldChannel)) {
            if (client.readyState === ws.OPEN) {
              client.send(JSON.stringify({ type: "leave", userCount: leaveCount }));
            }
          }
        }

        // Join new channel
        currentChannel = data.channel;
        if (!channels.has(currentChannel)) channels.set(currentChannel, new Set());
        channels.get(currentChannel).add(ws);

        const joinCount = channels.get(currentChannel).size;
        for (const client of channels.get(currentChannel)) {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify({ type: "join", userCount: joinCount }));
          }
        }

      } else if (data.type === "msg" && currentChannel) {
        for (const client of channels.get(currentChannel)) {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify({ type: "msg", text: data.text }));
          }
        }
      }

    } catch (err) {
      console.error("Bad message:", err);
    }
  });

  ws.on("close", () => {
    if (currentChannel && channels.has(currentChannel)) {
      channels.get(currentChannel).delete(ws);
      const leaveCount = channels.get(currentChannel).size;
      for (const client of channels.get(currentChannel)) {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify({ type: "leave", userCount: leaveCount }));
        }
      }
    }
  });
});

// Bind server, then gets put on right address via my nginx
server.listen(4006, "0.0.0.0", () => {
  console.log("Server running on port 4006");
});

