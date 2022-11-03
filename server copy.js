const http = require("http");
const app = require("./app");
const Message = require("./models/Message");

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
  },
});

io.on("connection", (socket) => {
  console.log("a user connected : ", socket.id);

  socket.on(
    "send-message",

    async (data) => {
      const { senderId, chatId, text } = data;
      const message = new Message({ senderId, chatId, text });
      console.log("messages : ", data);

      await message
        .save()
        .then((result) => {
          console.log("message : ", result);
        })
        .catch((err) => console.log(err));

      Message.find({
        $and: [
          { $or: [{ senderId: senderId }, { chatId: senderId }] },
          { $or: [{ senderId: chatId }, { chatId: chatId }] },
        ],
      })
        .then((result) => {
          socket.emit("get-messages", result);
          console.log("result messages : ", result);
        })
        .catch((err) => console.log(err));
        // console.log("data server : ", data)
    }
  );
});








// io.on("connection", (socket) => {
//   // console.log("A user connected ", socket.id);

//   socket.on("send-message", async (data) => {
//     const { senderId, chatId, text } = data;
//     const message = new Message({ senderId, chatId, text });

//     await message
//       .save()
//       .then((result) => {
//         console.log("result : ", result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     Message.find({
//       $and: [
//         { $or: [{ senderId: senderId }, { chatId: senderId }] },
//         { $or: [{ senderId: chatId }, { chatId: chatId }] },
//       ],
//     })
//       .then((result) => {
//         socket.emit("get-messages", result);
//         console.log("result messages : ", result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     console.log("data server : ", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("User Disconnected", socket.id)
//   })

// });
