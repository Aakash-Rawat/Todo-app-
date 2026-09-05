import express from 'express';
import { Todo } from '../models/Todo.js';
import isAuthenticated from '../Middlewares/authMiddleware.js';

const router = express.Router();

router.post('/todo',isAuthenticated, async( req,res)=>{
     try{
      const {title,body} = req.body;
      const authorId = req.user.userId;

    const todo =  await Todo.create({
        title: title,
        body: body,
        userId : authorId

     })

     todo.save();

     return res.status(201).json({
        todo
     })
    }
    catch(error){
        return res.status(500).json({message: error.message})
    }
})

// get all todos

router.get('/todo', isAuthenticated, async(req,res)=>{
    try{
    const userId = req.user.userId;
    
    
     if(!userId){
        return res.status(401).json({message:"user not found"});
     }
      const todos = await Todo.find({userId});

      return res.status(200).json({
        todos
      })
     
    }

    catch(error){
        return res.status(500).json({message: error.message})
    }

})//delete todo

router.delete('/todo/:id', isAuthenticated, async(req,res)=>{
   
    try{
    const todoId = req.params.id;
    console.log(todoId);
    

    await Todo.findByIdAndDelete({_id:todoId, userId:req.user.userId})
     return res.status(200).json({message:"Todo deleted successfully"})
}
catch(error){
    return res.status(500).json({message:error.message})
}
})

//update todo

router.put('/todo/:id', isAuthenticated, async(req,res)=>{
      try {
        const todoId = req.params.id;
        const { title, body } = req.body;

        const todo = await Todo.findOneAndUpdate(
            {
                _id: todoId,
                userId: req.user.userId
            },
            {
                title: title,
                body: body
            },
            {
                new: true
            }
        );

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found or you are not authorized to update it"
            });
        }

        return res.status(200).json({
            message: "Todo updated successfully",
            todo
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});




export default router;