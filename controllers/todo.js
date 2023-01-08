/**
 * Date: 1/7/2023
 * Subject: ToDo app todo controllers
 * Auth: Ismile Sardar
*/

//import important lib
// const jwt = require('jsonwebtoken');
const Profile = require('../models/profile');
const Todo = require('../models/todoModel');

//module scoffolder
const todo = {};

//create todo
todo.creatTodo = async (req,res) => {
    //id is come auth middleware
    const id = req.headers['id'];
    //todo data require
    let {TodoSubject,TodoDescription,TodoStatus} = req.body;
    //All field is required verify
    if(!TodoSubject || !TodoDescription || !TodoStatus){
        return res.status(400).json({Error:"File the all Require fields"});
    }
    //cake user are exgiset
    let user = await Profile.findOne({_id:id});
    //user validate
    if(!user){
        return res.status(404).json({message:"User are not Exgit! Please singUp.."});
    }
    //make todo info
    let todoInfo = {
        userName:user.userName,
        TodoSubject,
        TodoDescription,
        TodoStatus,
        creatTodo:Date.now(),
        updateTodo:Date.now(),
    };
    //creat todo in DB
    Todo.create(todoInfo, (error, data)=>{
        if (!error) {
            res.status(201).json({status:"success",Data:data});
        } else {
            res.status(400).json({status:"Faile",Data:error});
        }
    });
}

//get todo
todo.getTodo = async (req,res) => {
    //id is come auth middleware
    const id = req.headers['id'];
    //cake user are exgiset
    let user = await Profile.findById({_id:id});
    //user validate
    if(!user){
        return res.status(404).json({message:"Token is expeair! Please loging.."});
    }
    //todo find
    Todo.find(
        {userName:user.userName},
        {_id:1,userName:1,TodoSubject:1,TodoDescription:1,TodoStatus:1,creatTodo:1},
        (err, data)=>{
            if (!err) {
                //respons user
                res.status(200).json({status:"success",Data:data});
            } else {
                res.status(401).json({status:"faile",Error:err});
            }
        }
    );
}

//update todo list
todo.updateTodo = async (req,res) => {
    //id is come auth middleware
    const id = req.headers['id'];
    //update data
    let {_id,TodoSubject,TodoDescription,TodoStatus} = req.body;
    //cake user are exgiset
    let user = await Profile.findOne({_id:id});
    //user validate
    if(!user){
        return res.status(404).json({message:"Token is expeair! Please loging.."});
    }
    //cake user Todo list are exgiset
    let list = await Todo.findOne({userName:user.userName});
    //list query validet
    if(!list){
        return res.status(404).json({message:"This user are not create Todo list! Please create Todo list first.."});
    }
    //update Todo list
    let updateData = {
        TodoSubject,
        TodoDescription,
        TodoStatus,
        updateTodo:Date.now(),
    }
    //chack update and save DB
    if(user && list){
        Todo.updateOne(
            //this is todo list id
            {_id},
            {$set:updateData},
            {upsert:true},
            (err, data)=>{
            if(err){
                res.status(400).json({status:"fail",data:err})
            }
            else {
                res.status(200).json({status:"success",data:data})
            }
        });
    }
}

//module exports
module.exports = todo;