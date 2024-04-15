const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db')
require('dotenv').config();

const secret = process.env.SECRET_KEY;




//signup

const signup = async (req, res) => {
    const { email, password } = req.body;
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    
    if (!email || !password) {
        return res.json({ detail: "Please enter email and password" });
      }
    
        try {
            const users = await pool.query(
                'SELECT * FROM users WHERE email = $1', 
            [email])
if (users.rows.length) {
    return res.status(400).json({
        details: 'User already exists'
    })
}
           const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`,
            [email, hashedPassword])
    
           const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'})
    
           res.status(201).json({ email, token })
    
        } catch (error) {
            console.log(error)
            if (error) {
                res.status(400).json({ details: error.detail })
                
            }
        }
    }
    
    
    // login 
    
   const login =  async (req, res) => {
        const { email, password } = req.body;
    
        if (!email || !password) {
            return res.json({ detail: "Please enter email and password" });
          }
    
        try {
            const users = await pool.query(
            'SELECT * FROM users WHERE email = $1', 
            [email])

    if (!users.rows.length) return res.json({ details: 'User does not exist! '})
    
    const success = await bcrypt.compareSync(password, users.rows[0].hashed_password)
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr' })
    
    if (success) {
        res.status(200).json({ 'email' : users.rows[0].email, token})
    } else {
        res.status(400).json({ detail: 'password incorrect'})
    }
        } catch (error) {
            // error handling
            console.log(error)
            res.status(400).json({
                details:
                'An error occurred while trying to sign in. Please try again later.'
            })

        }
    }

    module.exports = { signup, login };
    