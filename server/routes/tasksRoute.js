const express = require("express");
const router = express.Router();

const {
    getTodos,
    addTodos,
    editTodos,
    deleteTodos,
} = require('../controllers/tasksController');

const auth = require('../middlewares/auth');


router.get("/:userEmail", auth, getTodos);
router.post('/', auth, addTodos);
router.put('/:id', auth, editTodos);
router.delete('/:id', auth, deleteTodos);

module.exports = router;