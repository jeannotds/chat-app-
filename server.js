const http = require("http");
const app = require("./app");
const Message = require("./models/Message");
const { sendMessage } = require("./socketController/messageSocket");

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3005");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    // methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user is connected : ", socket.id);
  // envoyer le message au client
  // io.emit("welcome", "Hello this is socket server");

  //After connection take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    //send to the server
    io.emit("getUsers", users);
  });

  //send message and get message
  socket.on("sendMessage", ({ senderId, chatId, text }) => {
    const user = getUser(chatId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      chatId: chatId,
      text,
    });
  });

  socket.on("disconnect", () => {
    // if someone is disconnect
    console.log("A user is disconnected");
    //Remove user
    removeUser(socket.id);
    //send to the server
    io.emit("getUsers", users);
  });
});

// io.on("connection", (socket) => {

//   sendMessage(socket)

// });

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (receiverId) => {
//   return users.find((user) => user.userId === receiverId)
// }

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// io.on("connection", (socket) => {
//   console.log("A user connected.");
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUser", users);
//   });

//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     console.log("User : ", user)
//     if (user) {
//       io.to(user.socketId).emit("getMessage", {
//         senderId,
//         text,
//       });
//     }

//   });

//   socket.on("disconnect", () => {
//     console.log("user is disconnected", socket.id);
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });

// console.log("users", users);

// // io.on("connection", (socket) => {
// //   console.log("a user connected : ", socket.id);

// //   socket.on(
// //     "send-message",

// //     async (data) => {
// //       const { senderId, chatId, text } = data;
// //       const message = new Message({ senderId, chatId, text });
// //       console.log("messages : ", data);

// //       await message
// //         .save()
// //         .then((result) => {
// //           console.log("message : ", result);
// //         })
// //         .catch((err) => console.log(err));

// //       Message.find({
// //         $and: [
// //           { $or: [{ senderId: senderId }, { chatId: senderId }] },
// //           { $or: [{ senderId: chatId }, { chatId: chatId }] },
// //         ],
// //       })
// //         .then((result) => {
// //           socket.emit("get-messages", result);
// //           console.log("result messages : ", result);
// //         })
// //         .catch((err) => console.log(err));
// //         // console.log("data server : ", data)
// //     }
// //   );
// // });
