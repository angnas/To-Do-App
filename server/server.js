const PORT = process.env.PORT ?? 8000
const express = require('express');
const { v4: uuidv4 } = require('uuid')
const cors = require('cors')

const app = express();
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


app.use(cors())
app.use(express.json())

// GET ALL TODOS

app.get("/todos/:userEmail", async (req, res) => {
console.log(req)
    const { userEmail } = req.params;
    console.log(userEmail)
    try {
       const todos = await pool.query('SELECT * FROM todos WHERE email = $1', [userEmail])
       res.json(todos.rows)
    } catch (err) {
        console.error(err)
    }
})

//create a new todo

app.post('/todos', async (req, res) => {
    const {user_email, title, progress, date} = req.body
    console.log(user_email, title, progress, data)
    const id = uuidv4()
    try {
        const newToDo = await pool.query(`INSERT INTO todos(id, email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
        [id, user_email, title, progress, date])
        res.json(newToDo)

    } catch(err) {
        console.error(err)
    }
})


//edit a new todo

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    const {user_email, title, progress, date} = req.body

    console.log(id)
    
    try {
        const editToDo = 
        await pool.query('UPDATE todos SET email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;', 
        [user_email, title, progress, date, id])
        res.json(editToDo)

    } catch(err) {
        console.error(err)
    }
})


//delete a  todo

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params
    const {email, title, progress, date} = req.body

    console.log(id)
    
    try {
        const deleteToDo = 
        await pool.query('DELETE FROM todos WHERE id = $1 ;', 
        [id])
        res.json(deleteToDo)

    } catch(err) {
        console.error(err)
    }
})


//signup

app.post('/signup' , async (req, res) => {
const { email, password } = req.body

if (!email || !password) {
    return res.json({ detail: "Please enter email and password" });
  }

const salt = bcrypt.genSaltSync(10)
const hashedPassword = bcrypt.hashSync(password, salt)

    try {
       const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
        [email, hashedPassword])

       const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'})

       res.json({ email, token})

    } catch (err) {
        console.error(err)
        if (err) {
            res.json({ detail: "This email already exists" })
            // res.json({ detail: err.detail})
        }
    }
})


// login 

app.post('/login' , async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ detail: "Please enter email and password" });
      }

    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
if (!users.rows.length) return res.json({ detail: 'User does not exist! '})

const success = await bcrypt.compare(password, users.rows[0].hashed_password)
const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'})

if (success) {
    res.json({ 'email' : users.rows[0].email, token})
}else {
    res.json({ detail: 'Login failed'})
}
    } catch (err) {
        console.error(err)
    }
})


//get all info from tasks

app.get("/todos", async (req, res) => {
    try {
      const todos = await pool.query(
        "SELECT * FROM todos",
      );
      res.json(todos.rows);
    } catch (err) {
      console.log(err);
    }
  });


  //get all info from tasks

app.get("/users", async (req, res) => {
    try {
      const todos = await pool.query(
        "SELECT * FROM users",
      );
      res.json(todos.rows);
    } catch (err) {
      console.log(err);
    }
  });






// app.get("/", (req, res) => {
//     res.send("hellooo")
// })  



app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})