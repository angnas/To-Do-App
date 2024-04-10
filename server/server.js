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







app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})