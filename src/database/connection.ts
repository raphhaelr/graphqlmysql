import knex from 'knex'

const connection = knex({
  client: 'mysql2',
  connection: {
    database: 'test',
    user: 'root',
    password: 'precato'
  }
})

export default connection