'use strict';
const settings = require("./settings"); // settings.json
const knex = require("knex")({
  client: 'pg',
  connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings. ssl
  }
});

const input = process.argv[2];

const get_people = (name, callback) => {
    knex.select('*')
    .from('famous_people')
    .where('first_name', name)
    .orWhere('last_name', name)
    .asCallback((err,rows) => {
      if (err) throw err;
      callback(rows);
      knex.destroy();
    });
};

get_people(input, (results) => {
  console.log("Searching ...")
  console.log(`Found ${results.length} person(s) by the name '${input}':`);
  for (let i = 0; i < results.length; i++) {
    console.log(`- ${i + 1}: ${results[i].first_name} ${results[i].last_name}, born '${results[i].birthdate}'`)
  }
});
