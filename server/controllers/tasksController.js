const pool = require('../db');
const { v4: uuidv4 } = require('uuid')

// GET ALL TODOS

const getTodos = async (req, res) => {
    
        const { userEmail } = req.params;

        // verify if the user is authorized
        if (!req.email) return res.status(401).json({message: 'Unauthorized'})
        
        try {
           const todos = await pool.query(
            'SELECT * FROM todos WHERE email = $1',
             [userEmail])
           res.status(200).json(todos.rows)
        } catch (error) {
          // error handling
            console.log(error)
            res.status(400).json({ details: error.detail })
        }
    }
    
    //create a new todo
    
    const addTodos = async (req, res) => {
        const {user_email, title, progress, date} = req.body

        // verify if the user is authorized
        if (!req.email) return res.status(401).json({message: 'Unauthorized'})

        console.log(user_email, title, progress, data)
        const id = uuidv4()
        try {
            const newToDo = await pool.query(
             `INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
            [id, user_email, title, progress, date])
            res.status(201).json(newToDo.rows)
    
        } catch(error) {
            // error handling
            console.log(error)
            res.status(400).json({ details: error.detail })
        }
    }
    
    
    //edit a new todo
    
     const editTodos = async (req, res) => {
        const { id } = req.params
        const {user_email, title, progress, date} = req.body

        // verify if the user is authorized
        if (!req.email) return res.status(401).json({message: 'Unauthorized'})

        try {
            const editToDo = 
            await pool.query(
            'UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5', 
            [user_email, title, progress, date, id])

            res.status(200).json(editToDo.rows)
    
        } catch(error) {
            // error handling
            console.log(error)
            res.status(400).json({ details: error.detail })
        }
    }
    
    
    //delete a  todo
    
    const deleteTodos = async (req, res) => {
        const { id } = req.params
        const {user_email, title, progress, date} = req.body

        // verify if the user is authorized
        if (!req.email) return res.status(401).json({message: 'Unauthorized'})
        
        try {
            const deleteToDo = 
            await pool.query(
                'DELETE FROM todos WHERE id = $1 ;', 
            [id])
            res.status(200).json(deleteToDo.rows)
    
        } catch(error) {
            // error handling
            console.log(error)
            res.status(400).json({ details: error.detail })
       
        }
    }

    module.exports = { getTodos, addTodos, editTodos, deleteTodos }
    
    