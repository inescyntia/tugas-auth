const { Pool } = require('pg')

const pool = new Pool({
  connectionString: "postgres://ivurnzpbhiepma:70db5dc37da06841b0b0ae43473b08672d0762980d6ec8b2a53c84e2307c1bb7@ec2-54-174-43-13.compute-1.amazonaws.com:5432/d1shrjv8il5lij",
  ssl: { rejectUnauthorized: false }
})


module.exports = {
  query: (text, params) => pool.query(text, params)
}
