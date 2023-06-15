const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./Routes/user");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/users", userRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(5000, () => {
  console.log("Server Started on port 5000");
});
