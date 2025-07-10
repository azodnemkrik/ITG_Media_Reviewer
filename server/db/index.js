const client = require('./client')



const seed = async () => {
  // console.log("add logic to create and seed tables")

  // CREATE TABLES
  const SQL = `
    DROP TABLE IF EXISTS banners;
    DROP TABLE IF EXISTS organizations;
    DROP TABLE IF EXISTS users;
    CREATE TABLE users (
      id UUID PRIMARY KEY,
      first_name VARCHAR(75) NOT NULL,
      last_name VARCHAR(75) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_ITG BOOLEAN DEFAULT false NOT NULL,
      avatar VARCHAR(4000)
    );
    CREATE TABLE organizations (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      org_code VARCHAR(8) NOT NULL,
      logo VARCHAR(4000)
    );
    CREATE TABLE banners (
      id UUID PRIMARY KEY,
      project_id VARCHAR(100),
      name VARCHAR(100),
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      round INTEGER DEFAULT 0 NOT NULL
    );
  `
await client.query(SQL)
console.log("SUCCESSFULLY Created Tables")

// CREATE STARTER DATA

};



module.exports = {
  client,
  seed
};
