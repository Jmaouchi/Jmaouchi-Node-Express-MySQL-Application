const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// get all candidates form the candidate table
router.get('/getAll', (req, res) => {
  const sql = `SELECT * FROM names`;
  // db is to get access to the mysql database, and query is to specify what data we want to get from the database 
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


// get all candidates form the candidate table
router.post('/insert', ({ body }, res) => {
  const sql = `INSERT INTO names (name)
  VALUES (?)`;
  const params = [body.name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
    // log the body to see what data we are getting from the client side
    console.log(body);
  });
})


module.exports = router;