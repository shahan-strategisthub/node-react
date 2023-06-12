const express = require('express');
const  app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const mysql   = require('mysql')
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sHaHan007@',
    database: 'node'
})
con.connect(function (err){
    if (err){
        console.log('Error occur '+ err.stack);
        return;
    }
    console.log('Connected as id '+ con.threadId);
});


    sadsadsad

asdsadsad

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))


app.get("/api", (req , res) =>{
    res.json({"users":["user1", "user2", "user2"]})
})
app.listen(5000, () => {console.log("Server Started on port 5000")})