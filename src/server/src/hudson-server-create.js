const webSocketsServerPort = 3000;
const webSocketServer = require("websocket").server;
const http = require("http");
const crypto = require("crypto");
// Spinning the http server and the websocket server.
// const server = http.createServer();

// server.listen(webSocketsServerPort);
// const wsServer = new webSocketServer({
//   httpServer: server,
// });

// Generates unique ID for every new connection
const getUniqueID = () => {
  const id = crypto.randomBytes(16).toString("hex");
  return id;
};

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// User activity history.
let userActivity = [];

let cards = [];

const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
};

const sendMessageToGivenUser = (id, json) => {
  if (clients[id]) {
    clients[id].sendUTF(json);
  }
};

const typesDef = {
  ADD_CARD: "addCard",
  ADD_LIKE: "addLike",
};

export const setupHudsonServer = (server) => {
  const wsServer = new webSocketServer({
    httpServer: server,
  });

  wsServer.on("request", (request) => {
    var userID = getUniqueID();
    console.log(new Date() + " Recieved a new connection from origin " + request.origin + ".");
    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log("connected: " + userID + " in " + Object.getOwnPropertyNames(clients));

    connection.on("message", (message) => {
      if (message.type === "utf8") {
        const dataFromClient = JSON.parse(message.utf8Data);
        const json = { type: dataFromClient.type };

        if (dataFromClient.type === typesDef.ADD_CARD) {
          console.log("dataFromClient: ", dataFromClient);

          cards.push({
            likes: 0,
            id: cards.length,
            message: dataFromClient.data.message,
            column: dataFromClient.column,
            creatorId: userID,
            type: "card",
          });
          sendMessage(JSON.stringify(cards));
        }

        if (dataFromClient.type === typesDef.ADD_LIKE) {
          cards[dataFromClient.data.id].likes += 1;
          console.log("cards: ", JSON.stringify(cards));
          sendMessage(JSON.stringify(cards));
          if (userID !== cards[dataFromClient.data.id].creatorId) {
            sendMessageToGivenUser(
              cards[dataFromClient.data.id].creatorId,
              JSON.stringify({ type: "notification", message: "Someone liked a card you wrote" })
            );
          }
        }
      }
    });

    // user disconnected
    connection.on("close", (connection) => {
      console.log(new Date() + " Peer " + userID + " disconnected.");
      const json = { type: typesDef.USER_EVENT };
      userActivity.push(`${users[userID]} left the document`);
      json.data = { users, userActivity };
      delete clients[userID];
      delete users[userID];
      sendMessage(JSON.stringify(json));
    });
  });
}
