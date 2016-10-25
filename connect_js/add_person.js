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

const first = process.argv[2];
const last = process.argv[3];
const birth = process.argv[4];

const add_person = (firstname, lastname, birthday) => {
  knex('famous_people')
  .insert({
    first_name: firstname,
    last_name: lastname,
    birthdate: birthday
  })
  .return({inserted: true}, console.log(`${firstname} ${lastname} was successfully inserted`));
  knex.destroy();
};

add_person(first, last, birth);
