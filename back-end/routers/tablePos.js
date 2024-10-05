const express = require('express');
const router = express.Router();
const db = require('../config/mySqlConfig');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Table_Pos068', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

router.post ('/', (req, res) => {
  // Dummy function
});

module.exports = router;