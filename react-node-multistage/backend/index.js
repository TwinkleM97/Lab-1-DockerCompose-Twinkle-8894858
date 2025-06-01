const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'mysql-db',
  user: 'myuser',
  password: 'myuserpass',
  database: 'mydb',
  port: 3306,
};

function connectWithRetry() {
  const db = mysql.createConnection(dbConfig);

  db.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL, retrying in 5 seconds...', err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connected to MySQL');
      setupRoutes(db);
    }
  });
}

function setupRoutes(db) {
  app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) return res.status(500).send('Error fetching users');
      res.json(results);
    });
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO users (name) VALUES (?)', [name], (err) => {
      if (err) return res.status(500).send('Error adding user');
      res.status(201).send('User added');
    });
  });

  app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
  });
}

connectWithRetry();
