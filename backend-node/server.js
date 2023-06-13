const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql");
const { json } = require("express");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sHaHan007@",
  database: "node",
});
con.connect(function (err) {
  if (err) {
    console.log("Error occur " + err.stack);
    return;
  }
  console.log("Connected as id " + con.threadId);
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/all/users", (req, res) => {
  const getUsers = "SELECT * FROM users";
  con.query(getUsers, (err, result) => {
    res.json(result);
  });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const showUser = "SELECT * FROM  users WHERE id =?";
  con.query(showUser, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/api/users", (req, res) => {
  const createUser =
    "INSERT INTO users (`first_name`,`last_name`,`email`,`cell_phone`,`age`) VALUES (?)";
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.cell_phone,
    req.body.age,
  ];
  con.query(createUser, [values], (err, result) => {
   return result;
  });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, cell_phone, age } = req.body;
  const updateUser =
    "UPDATE  users SET first_name= ?,last_name= ?,email= ?,cell_phone= ?,age= ? WHERE id = ?";
  con.query(
    updateUser,
    [first_name, last_name, email, cell_phone, age, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const removeUser = "DELETE FROM  users WHERE id =?";
  con.query(removeUser, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO users (first_name,last_name,email,cell_phone,age) VALUES ('john','wick','johnwick@gmail.com','03034477063','66')";
  con.query(sqlInsert, (err, result) => {
    console.log(result);
  });
});
app.listen(5000, () => {
  console.log("Server Started on port 5000");
});
