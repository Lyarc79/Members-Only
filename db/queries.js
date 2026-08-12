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

async function updateMemberStatus(id, column) {
  const allowedColumns = ["membership", "admin"];
  if (!allowedColumns.includes(column)) {
    throw new Error("Invalid column name");
  }
  await pool.query(`UPDATE members SET ${column} = true WHERE id = $1`, [id]);
}

async function createMessage(userId, title, body) {
  await pool.query(
    "INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3)",
    [userId, title, body],
  );
}

async function displayAllMessages() {
  const { rows } = await pool.query(
    `SELECT messages.id, members.first_name, members.last_name, members.username,
          messages.title, messages.body, messages.created_at 
    FROM messages 
    INNER JOIN members ON members.id = messages.user_id 
    ORDER BY messages.created_at DESC`,
  );
  return rows;
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE messages.id = $1", [id]);
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  updateMemberStatus,
  createMessage,
  displayAllMessages,
  deleteMessage,
};
