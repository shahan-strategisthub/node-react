const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getAll(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM users LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };
  return {
    data,
    meta,
  };
}

async function getSingleUser(id) {
  const rows = await db.query(`SELECT * FROM  users WHERE id = ${id}`);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function updateUser(id, req) {
  const { first_name, last_name, email, cell_phone, age } = req.body;
  const rows = await db.query(
    `UPDATE  users SET first_name= ?,last_name= ?,email= ?,cell_phone= ?,age= ? WHERE id = ${id}`,
    [first_name, last_name, email, cell_phone, age,id]
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function saveUser(values) {
  const rows = await db.query(
    "INSERT INTO users (`first_name`,`last_name`,`email`,`cell_phone`,`age`) VALUES (?)",
    [values]
  );
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function deleteUser(id) {
  const rows = await db.query(`DELETE FROM  users WHERE id = ${id}`);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

module.exports = {
  getAll,
  getSingleUser,
  saveUser,
  deleteUser,
  updateUser,
};
