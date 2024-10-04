const express = require('express')
const app = express()
// const port = 3000;

app.get("/api", (req, res) =>{
    res.json({"users": ["userone", "userTwo", "UserThree"]})
})

app.listen(3000, () =>{
    console.log("Server started on port 3000")
})