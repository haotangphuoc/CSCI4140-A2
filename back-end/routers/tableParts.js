const express = require('express');
const router = express.Router();
const db = require('../config/mySqlConfig');

router.get('/', (req, res) => {
  console.log('Database Password:', process.env.DB_PASSWORD);

  db.query('SELECT * FROM Table_Parts068', (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results);
  });
});

module.exports = router;