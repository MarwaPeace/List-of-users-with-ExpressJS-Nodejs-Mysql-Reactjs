const express = require('express');
const router = express.Router();
const {createDB, deleteSingleTodo, updateTodo, singleTodo, showTodos, createTable, createList} = require('../controllers/todoController');

//ROUTES
router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);
router.get('/show/todos', showTodos);
router.get('/todo/:id', singleTodo);
router.put('/update/todo/:id', updateTodo);
router.delete('/delete/todo/:id', deleteSingleTodo);
module.exports = router;

