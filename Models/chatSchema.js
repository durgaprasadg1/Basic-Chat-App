const mongoose =  require('mongoose');

// phr se connection dene ki garaj nhi hai kyuki iss file baadme index.js me import krna hi hai 

const chatSchema = new mongoose.Schema({
    from:{
        type : String,
        required : true
    },
    to:{
        type : String,
        required : true
    },
    msg:{
        type : String,
        required : true,
        minlegth: [1, "Isse Chota to nhich hoga naa"],
     

    }, 
    created_At:{
        type : Date,
        required : true,
    }, 

});

const Chat = mongoose.model("Chat", chatSchema);


// Always export the model , Kyuki vo hi collection hai mtlb table hai
module.exports = Chat;