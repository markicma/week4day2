'use strict';
const pg = require("pg");
const settings = require("./settings"); // settings.json

const db = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings. ssl
})

const input = process.argv[2];

const get_people = (name, callback) => {
  db.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }

    let query = `SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text`;
    db.query(query, [name], (err, result) => {
      if (err) {
        console.log("Something went wrong:", err);
        callback([]);
      }
      else {
        callback(result.rows);
      }
      db.end();
    })
  })
};

get_people(input, (results) => {
  console.log("Searching ...")
  console.log(`Found ${results.length} person(s) by the name '${input}':`);
  for (let i = 0; i < results.length; i++) {
    console.log(`- ${i + 1}: ${results[i].first_name} ${results[i].last_name}, born '${results[i].birthdate}'`)
  }
});
