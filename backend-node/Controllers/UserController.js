const user = require("../services/user");

module.exports = {
  async getAll(req, res, next) {
    try {
      res.json(await user.getAll(req.query.page));
    } catch (err) {
      console.error(`Error while getting all users `, err.message);
      next(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const { id } = req.params;
      res.json(await user.getSingleUser(id));
    } catch (err) {
      console.error(`Error while getting all users `, err.message);
    }
  },

  async saveUser(req, res) {
    try {
      const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.cell_phone,
        req.body.age,
      ];
      res.json(await user.saveUser(values));
    } catch (err) {
      console.error(`Error while getting all users `, err.message);
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      res.json(
        await user.updateUser(id, req)
      );
    } catch (err) {
      console.error(`Error while getting all users `, err.message);
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      res.json(await user.deleteUser(id));
    } catch (err) {
      console.error(`Error while getting all users `, err.message);
    }
  },
};
