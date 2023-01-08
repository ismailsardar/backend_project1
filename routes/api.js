/**
 * Date: 1/6/2023
 * Subject: ToDo app todo controllers
 * Auth: Ismile Sardar
*/

//require packeg lib
const express = require('express');
const controller = require('../controllers/profile');
const todo = require('../controllers/todo');
const { auth } = require('../middleware/auth');
const route = express.Router(); 

//make router
route.post('/creatProfile',controller.creatProfile);
route.post('/loging',controller.loging);
route.get('/profile', auth, controller.getProfile);
route.post('/updateProfile', auth, controller.updateProfile);

//todo list router
route.get('/getTodo', auth, todo.getTodo);
route.post('/creatTodo', auth, todo.creatTodo);
route.post('/updateTodo', auth, todo.updateTodo);
 
//expots route
module.exports = route;