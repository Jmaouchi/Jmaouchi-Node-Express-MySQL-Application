const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// get all candidates form the candidate table
router.get('/getAll', (req, res) => {
  const sql = `SELECT * FROM names`;
  // db is to get access to the mysql database, and the get is to get data from thet database
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      // this is all the data
      data: rows
    });
  });
});


module.exports = router;