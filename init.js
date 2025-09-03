const mongoose = require("mongoose");
const Chat = require("./Models/chatSchema.js");

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

let allChats = [
  {
    from: "me",
    to: "you",
    msg: "hello world",
    created_At: new Date(),
  },
  {
    from: "Alice",
    to: "Bob",
    msg: "Hey, are you free this weekend?",
    created_At: new Date(),
  },

  {
    from: "Charlie",
    to: "Project Team",
    msg: "The meeting notes have been uploaded to the drive.",
    created_At: new Date(),
  },

  {
    from: "Sarah",
    to: "David",
    msg: "Did you remember to grab the milk?",
    created_At: new Date(),
  },

  {
    from: "Liam",
    to: "Maya",
    msg: "Check out this hilarious video I found!",
    created_At: new Date(),
  },
];

Chat.insertMany(allChats).then((res)=>{
    console.log("data saved");
});
