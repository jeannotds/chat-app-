const http = require("http");
const app = require("./app");
const Message = require('./models/Message')

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
  console.log("A user connected ", socket.id);
  socket.on("send-message", async (data) => {
    const { senderId, chatId , text } = data;
    const message = new Message({ senderId, chatId , text });
    
    await message.save()
    .then((result) => {
        // res.status(200).json(result)
        console.log("result : ", result)

    // const chatId = chatId;
    // const senderId = senderId;
    Message.find({
        $and: [{ $or: [{ senderId: senderId }, {chatId: senderId}] },
                { $or: [{ senderId: chatId }, {chatId : chatId}] }
            ],
            
    }) 
    .then((result) => {
        // res.status(200).json(result)
        socket.emit("get-messages", result)
        console.log('result messages : ', result )
    })
    .catch(err => {
        console.log(err)
    })
        
    })
    .catch(err => {
        // res.status(500).json(err)
        console.log(err)
    })
    console.log("data", data);
  });
});







// let activeUsers = [];

// io.on("connection", (socket) => {
//   console.log("A user connected.");

//   //add New user
//   socket.on("new-user-add", (newUserId) => {
//     //if user is not added
//     if (!activeUsers.some((user) => user.userId === newUserId)) {
//       activeUsers.push({
//         userId: newUserId,
//         socketId: socket.id,
//       });
//     }
//     console.log("Connected Users", activeUsers);
//     io.emit("get-users", activeUsers);
//   });

//   //SEND MESSAGE
//   socket.on("send-message", (data) => {
//     const { receiverId } = data;
//     const user = activeUsers.find((user) => user.userId === receiverId);
//     console.log("sending from socket to : ", receiverId);
//     console.log("Data : ", data);
//     if (user) {
//       io.to(user.socketId).emit("receive-message", data);
//     }
//   });

//   socket.on("disconnect", () => {
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//     console.log("user disconnected", activeUsers);
//     io.emit("get-users", activeUsers);
//   });
// });
