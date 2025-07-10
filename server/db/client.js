const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/itg_media_reviewer');

module.exports = client