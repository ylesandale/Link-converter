const express = require("express");
const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
const server = require("http").Server(app);

app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/message.routes"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUrl"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    server.listen(PORT, () => console.log("Сервер запущен", PORT));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
