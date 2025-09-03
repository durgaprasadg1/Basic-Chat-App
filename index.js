const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Chat = require("./Models/chatSchema.js");

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

main()
  .then((res) => {
    console.log("connection  succesfull");
  })
  .catch((err) => {
    console.log("Failed to Connect");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chat");
}


// index route

// since the .find() or any other function are always aync so we need make them await to get the data , to do so making the function async inwhich they are being called so hence made callback async

app.get("/", async (req, res) => {
  let chats = await Chat.find({});
  // console.log(chat);
  res.render("chats.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("New_chat.ejs");
});
app.post("/chats", (req, res) => {
  let { from, to, message } = req.body;
  Chat.insertOne({ from: from, to: to, msg: message, created_At: Date() })
    .then((res) => {
      console.log("Message Sent Succesfully.");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

app.get("/chats/:id/edit", async (req, res) => {
  let id = req.params.id;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat: chat });

  app.put("/chat/:id", async (req, res) => {
    let id = req.params.id;

    let { msg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      { _id: id },
      { msg: msg },
      { runValidators: true, new: true }
    );
    res.redirect("/");
  });
});

app.delete("/chat/:id", async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Nicely Working at port", port);
});
