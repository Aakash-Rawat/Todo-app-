import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    
      title:{
        type: String,
        required: true
      },

      body:{
        type: String,
      },

      userId: {
       type:  mongoose.Schema.Types.ObjectId,
       ref: 'User'
        
      }

},{timestamps:true})

export const Todo = mongoose.model('Todo',todoSchema);