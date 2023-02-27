const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// READ
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


// CREATE
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


// DELETE data by id
router.delete('/delete/:id', (req, res) => {
  const sql = `DELETE FROM names WHERE id= ?`;
  const params =[req.params.id];
 
  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Name not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
})



// Update a name by id
router.put('/update/:id', (req, res) => {
  const sql = `UPDATE names SET name = ? 
               WHERE id = ?`;
  const params = [req.body.name, req.params.id];
  console.log(params);
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      // check if a record was found
    } else if (!result.affectedRows) {
      res.json({
        message: 'Candidate not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});


module.exports = router;