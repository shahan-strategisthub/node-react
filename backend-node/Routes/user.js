const express = require("express");
const router = express.Router();
const user = require("../services/user");
const controller =require("../Controllers/UserController")

router.get("/", controller.getAll);
router.get("/:id", controller.getSingleUser);
router.post("/", controller.saveUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);





module.exports = router;


