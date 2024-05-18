const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.post('/entries', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const newEntry = await pool.query(
      "INSERT INTO entries (description, amount, type) VALUES($1, $2, $3) RETURNING *",
      [description, amount, type]
    );
    res.json(newEntry.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all entries
app.get('/entries', async (req, res) => {
  try {
    const allEntries = await pool.query("SELECT * FROM entries ORDER BY created_at DESC");
    res.json(allEntries.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a single entry
app.get('/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await pool.query("SELECT * FROM entries WHERE id = $1", [id]);
    res.json(entry.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update an entry
app.put('/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type } = req.body;
    const updateEntry = await pool.query(
      "UPDATE entries SET description = $1, amount = $2, type = $3 WHERE id = $4",
      [description, amount, type, id]
    );
    res.json("Entry was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// Delete an entry
app.delete('/entries/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEntry = await pool.query("DELETE FROM entries WHERE id = $1", [id]);
    res.json("Entry was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

// Get total income and expenses
app.get('/totals', async (req, res) => {
  try {
    const income = await pool.query("SELECT SUM(amount) FROM entries WHERE type = 'income'");
    const expenses = await pool.query("SELECT SUM(amount) FROM entries WHERE type = 'expense'");
    res.json({
      income: income.rows[0].sum || 0,
      expenses: expenses.rows[0].sum || 0
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('Server has started on port 5000');
});
