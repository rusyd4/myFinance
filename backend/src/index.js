require('dotenv').config();
const express = require('express');
const cors = require('cors');
const client = require('./db');
const { ObjectId } = require('mongodb');

const app = express();
const dbName = "myFinance";
const collectionName = "entries";

// Middleware
app.use(cors());
app.use(express.json());

// Function to check if a string is a valid ObjectId
const isValidObjectId = (id) => {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
};

// Connect to MongoDB and start the server
(async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    console.log('Connected to MongoDB');

    // Routes

    app.post('/entries', async (req, res) => {
      try {
        const { description, amount, type } = req.body;
        const newEntry = { description, amount: parseFloat(amount), type, created_at: new Date() };
        const result = await collection.insertOne(newEntry);
        res.json({ _id: result.insertedId, ...newEntry });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error creating entry");
      }
    });

    // Get all entries
    app.get('/entries', async (req, res) => {
      try {
        const allEntries = await collection.find().sort({ created_at: -1 }).toArray();
        res.json(allEntries);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error retrieving entries");
      }
    });

    // Get a single entry
    app.get('/entries/:id', async (req, res) => {
      try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
          return res.status(400).send("Invalid ID format");
        }
        const entry = await collection.findOne({ _id: new ObjectId(id) });
        res.json(entry);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error retrieving entry");
      }
    });

    // Update an entry
    app.put('/entries/:id', async (req, res) => {
      try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
          return res.status(400).send("Invalid ID format");
        }
        const { description, amount, type } = req.body;
        await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { description, amount: parseFloat(amount), type } }
        );
        res.json("Entry was updated!");
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error updating entry");
      }
    });

    // Delete an entry
    app.delete('/entries/:id', async (req, res) => {
      try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
          return res.status(400).send("Invalid ID format");
        }
        await collection.deleteOne({ _id: new ObjectId(id) });
        res.json("Entry was deleted!");
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error deleting entry");
      }
    });

    // Get total income and expenses
    app.get('/totals', async (req, res) => {
      try {
        const income = await collection.aggregate([
          { $match: { type: 'income' } },
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ]).toArray();
        const expenses = await collection.aggregate([
          { $match: { type: 'expense' } },
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ]).toArray();
        res.json({
          income: income[0] ? income[0].total : 0,
          expenses: expenses[0] ? expenses[0].total : 0
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Error calculating totals");
      }
    });

    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server has started on port ${process.env.PORT || 5000}`);
    });

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
})();
