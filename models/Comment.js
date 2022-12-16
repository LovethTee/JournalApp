const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type:String,
        required:true,

    
    },
    likes: {
        type:Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // links a specific post id to users
        ref: "User",
      },
    journal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journal",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      userName: { 
        type: String, 
        unique: true,
        
       },
});
    
 module.exports = mongoose.model("Comment", CommentSchema);
    
