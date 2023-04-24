const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/TodoModel');

const TodoRouter = express.Router();

TodoRouter.post("/create",async (req,res)=>{
        try {
            const taskStatement = req.body.task;

            const Createtask = new Todo({
                task:taskStatement,
                completed:false
            });

            const task = await Createtask.save();

            res.status(200).send({task:Createtask,"message":"Task completed Successfully"});
        } catch (error) {
            res.status(400).send({"message":"Some error occured"});
        }

} )

TodoRouter.get("/",async(req,res)=>{
        try {
            
            const tasks = await Todo.find();
            res.status(200).send({"tasks":tasks,"message":"successful fetch"});

        } catch (error) {
            res.status(400).send({"message":"Some error occured"});
        }

})

TodoRouter.route("/:id")
    .get(async(req,res)=>{
        try {
            
            const task_id = req.body._id ;

            const tasks = await Todo.findOne({_id:task_id});
            res.status(200).send({"tasks":tasks,"message":"successful fetch"});

        } catch (error) {
            res.status(400).send({"message":"Some error occured"});
        }
    })
    .delete(async (req,res)=>{
            try {
                
                const task_id = req.body._id || req.params.id;

                console.log(task_id);
                const tasks = await Todo.deleteOne({_id:task_id});
                res.status(200).send({"tasks":tasks,"message":"successful delete"});

            } catch (error) {
                res.status(400).send({"message":"Some error occured"});
            }
        })

TodoRouter.put("/update",async (req,res)=>{
    try{   
        
        const task_id = req.body._id;
        const task_Statement = req.body.task;
        const task_completed = req.body.completed;

        console.log(task_Statement)
        const updated_task = await Todo.updateOne({_id:task_id},{$set:{task:task_Statement,completed:task_completed}});
        res.status(200).send({"tasks":updated_task,"message":"successful update"});
    }catch(error)
    {
        res.status(400).send({"message":"Some error occured"});
    }
})

module.exports = TodoRouter;