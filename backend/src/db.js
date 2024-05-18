const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tutam9',
  password: 'p',
  port: 5432,
});

module.exports = pool;
