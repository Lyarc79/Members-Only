const pool = require("./pool");

async function createUser(firstName, lastName, username, password) {
  await pool.query(
    "INSERT INTO members (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password],
  );
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM members WHERE username = $1",
    [username],
  );
  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
};
