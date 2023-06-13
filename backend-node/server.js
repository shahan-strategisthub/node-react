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

  try {
    con.query(getUsers, (err, result) => {
      res.json(result);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const showUser = `SELECT * FROM  users WHERE id = ${req.params.id}`;

  try {
    con.query(showUser, id, (err, result) => {
      if (result === null) {
        res.status(404).send("Message : User not found");
      } else {
        res.status(200).json(result);
      }

      if (err) {
        console.log(err);
      }
      console.log(result);
    });
  } catch (error) {
    console.log(error);
  }
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

  try {
    con.query(createUser, [values], (err, result) => {});
    res.status(201).send("Status: OK");
  } catch (error) {
    console.log(error);
  }
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, cell_phone, age } = req.body;
  const updateUser =
    "UPDATE  users SET first_name= ?,last_name= ?,email= ?,cell_phone= ?,age= ? WHERE id = ?";

  try {
    con.query(
      updateUser,
      [first_name, last_name, email, cell_phone, age, id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
    res.status(200).send("Status: OK");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const removeUser = "DELETE FROM  users WHERE id =?";

  try {
    con.query(removeUser, id, (err, result) => {
      if (err) {
        console.log(err);
      }
    });
    res.status(200).send("Status: OK");
  } catch (error) {
    console.log(error);
  }
});

app.listen(5000, () => {
  console.log("Server Started on port 5000");
});
