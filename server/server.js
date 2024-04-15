const PORT = process.env.PORT ?? 8000
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


const usersRoute = require("./routes/usersRoute");
const tasksRoute = require("./routes/tasksRoute");

app.get("/", (req, res) => res.send("Express on Vercel with Server.js!"));
   
app.use("/users", usersRoute);
app.use("/tasks", tasksRoute);






app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})