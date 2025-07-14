const client = require('./client');
const { createOrganization } = require('./organizations');
const { createUser } = require('./users');
const { createBanner } = require('./banners');
const { createProject } = require('./projects');
const path = require('path')
const fs = require('fs')

const loadImage = (filePath) => {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(__dirname, filePath)
    console.log(fullPath)
    fs.readFile(fullPath, 'base64', (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(`data:image/png;base64, ${result}`)
      }
    })
  })
}


const seed = async () => {
  // console.log("add logic to create and seed tables")

  // CREATE TABLES
  const SQL = `

    DROP TABLE IF EXISTS banners;
    DROP TABLE IF EXISTS projects;
    DROP TABLE IF EXISTS users; 
    DROP TABLE IF EXISTS organizations;

    CREATE TABLE organizations (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      org_code VARCHAR(8) UNIQUE NOT NULL,
      logo TEXT
    );

    CREATE TABLE users (
      id UUID PRIMARY KEY,
      first_name VARCHAR(75) NOT NULL,
      last_name VARCHAR(75) NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      org_code VARCHAR(8) REFERENCES organizations(org_code),
      is_admin BOOLEAN DEFAULT false NOT NULL,
      avatar TEXT,
      CONSTRAINT org_and_user UNIQUE(org_code, id)
    );

    CREATE TABLE projects (
      id UUID PRIMARY KEY,
      project_name VARCHAR(100) UNIQUE NOT NULL,
      org_code VARCHAR(8) REFERENCES organizations(org_code),
      CONSTRAINT org_and_project UNIQUE(org_code, id)
    );

    CREATE TABLE banners (
      id UUID PRIMARY KEY,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      project_name VARCHAR(100) REFERENCES projects(project_name),
      is_mobile BOOLEAN DEFAULT false NOT NULL,
      link TEXT NOT NULL,
      CONSTRAINT project_and_banner UNIQUE(project_name, id)
    );

  `
  await client.query(SQL)
  console.log("SUCCESSFULLY Created Tables")

  const logoITG = await loadImage('images/itg-logo.png')
  const logoCharter = await loadImage('images/charter.png')
  const logoMicrosoft = await loadImage('images/microsoft-logo.png')
  const logoXbox = await loadImage('images/xbox-logo.png')
  
  // CREATE STARTER ORGANIZATIONS
  const [ itg , charter , microsoft , xbox , other ] = await Promise.all([
    createOrganization({ name: 'Inspired Thinking Group' , org_code: 'ITG' , logo: logoITG}),
    createOrganization({ name: 'Charter', org_code: 'CHTR' , logo: logoCharter }),
    createOrganization({ name: 'Microsoft', org_code: 'MSTH' , logo: logoMicrosoft }),
    createOrganization({ name: 'Microsoft', org_code: 'MSTX' , logo: logoXbox }),
    createOrganization({ name: 'Other', org_code: 'OTHER' , logo: null })
  ])

  // CREATE STARTER USERS
  const [ kirk, freddy , sara , paige ] = await Promise.all([
    createUser({ first_name: 'Kirk', last_name: 'Mendoza', username: 'kirk@itg.com', password: '1111', org_code: itg.org_code, is_admin: true , avatar: null}),
    createUser({ first_name: 'Freddy', last_name: 'Bustamante', username: 'freddy@microsoft.com', password: '2222', org_code: microsoft.org_code, is_admin: false , avatar: null}),
    createUser({ first_name: 'Sara', last_name: 'Voghel', username: 'sara@charter.com', password: '3333', org_code: charter.org_code, is_admin: false , avatar: null}),
    createUser({ first_name: 'Paige', last_name: 'Burgett', username: 'paige@charter.com', password: '4444', org_code: charter.org_code, is_admin: false , avatar: null})
  ])

  // CREATE START PROJECTS
  const [ prj1, prj2, prj3, prj4, prj5, prj6, prj7, prj8, prj9, prj10, prj11, prj12, prj13 ] = await Promise.all([
    createProject({ project_name: 'Doom: The Dark Ages', org_code: xbox.org_code }),
    createProject({ project_name: 'Interactive Demo Pitch', org_code: other.org_code }),
    createProject({ project_name: 'Prospecting Interactive', org_code: charter.org_code }),
    createProject({ project_name: 'Remarketing Interactive', org_code: charter.org_code }),
    createProject({ project_name: 'XBox Q2 - We Got You', org_code: xbox.org_code }),
    createProject({ project_name: 'FY24_BTS_2024', org_code: microsoft.org_code }),
    createProject({ project_name: 'FY24_New_Year_2024', org_code: microsoft.org_code }),
    createProject({ project_name: 'FY24 Holiday 2023', org_code: microsoft.org_code }),
    createProject({ project_name: 'Q2-Claire Value A', org_code: charter.org_code }),
    createProject({ project_name: 'Q2-Joe Brand A', org_code: charter.org_code }),
    createProject({ project_name: 'XBox Starfield Forza Performance', org_code: xbox.org_code }),
    createProject({ project_name: 'Neutral Evergreen', org_code: microsoft.org_code }),
    createProject({ project_name: 'XBox Q2 - Avowed', org_code: xbox.org_code })
  ])

  // CREATE STARTER BANNERS
  const [ banner1, banner2, banner3, banner4 ] = await Promise.all([
    createBanner({ project_name: prj1.project_name, width: 300, height: 250, is_mobile: false, link: 'https://microsoft:H9QExUa7Dsyw@microsoft-086x.haddadandpartners.com/MSTX_100000_03_XboxQ3Campaigns/Titan/300x250/R9/index.html' }),
    createBanner({ project_name: prj1.project_name, width: 300, height: 600, is_mobile: false, link: 'https://microsoft:H9QExUa7Dsyw@microsoft-086x.haddadandpartners.com/MSTX_100000_03_XboxQ3Campaigns/Titan/300x600/R5/index.html' }),
    createBanner({ project_name: prj1.project_name, width: 160, height: 600, is_mobile: false, link: 'https://microsoft:H9QExUa7Dsyw@microsoft-086x.haddadandpartners.com/MSTX_100000_03_XboxQ3Campaigns/Titan/160x600/R6/index.html' }),
    createBanner({ project_name: prj1.project_name, width: 728, height: 90, is_mobile: false, link: 'https://microsoft:H9QExUa7Dsyw@microsoft-086x.haddadandpartners.com/MSTX_100000_03_XboxQ3Campaigns/Titan/728x90/R4/index.html' }),
    createBanner({ project_name: prj1.project_name, width: 970, height: 250, is_mobile: false, link: 'https://microsoft:H9QExUa7Dsyw@microsoft-086x.haddadandpartners.com/MSTX_100000_03_XboxQ3Campaigns/Titan/970x250/R4/index.html' }),

    createBanner({ project_name: prj2.project_name, width: 300, height: 600, is_mobile: false, link: 'https://flooranddecor.haddadandpartners.com/23_FLOOR_012907_Interactive_Demo_Pitch/300x600/R4/Interactive_Demo_Pitch.html' }),

    createBanner({ project_name: prj3.project_name, width: 300, height: 250, is_mobile: false, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Quad_Prospecting_V1/300x250/R6/index.html' }),
    createBanner({ project_name: prj3.project_name, width: 300, height: 600, is_mobile: false, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Quad_Prospecting_V1/300x600/R3/index.html' }),
    createBanner({ project_name: prj3.project_name, width: 160, height: 600, is_mobile: false, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Quad_Prospecting_V1/160x600/R2/index.html' }),
    createBanner({ project_name: prj3.project_name, width: 728, height: 90, is_mobile: false, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Quad_Prospecting_V1/728x90/R3/index.html' }),
    createBanner({ project_name: prj3.project_name, width: 300, height: 250, is_mobile: true, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Hotspot/Prospecting_300x250_V1/R1/index.html' }),

    createBanner({ project_name: prj4.project_name, width: 300, height: 250, is_mobile: false, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Quad_Remarketing_V1/300x250/R7/index.html' }),
    createBanner({ project_name: prj4.project_name, width: 300, height: 600, is_mobile: false, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Quad_Remarketing_V1/300x600/R3/index.html' }),
    createBanner({ project_name: prj4.project_name, width: 160, height: 600, is_mobile: false, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Quad_Remarketing_V1/160x600/R3/index.html' }),
    createBanner({ project_name: prj4.project_name, width: 728, height: 90, is_mobile: false, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Quad_Remarketing_V1/728x90/R2/index.html' }),
    createBanner({ project_name: prj4.project_name, width: 300, height: 250, is_mobile: true, link: 'http://charter:R9k2t2$X9@charter.haddadandpartners.com/CHTR-015479-2025_SMB/Interactive_Hotspot/Remarketing_300x250_V2/R5/index.html' })
  ])

  console.log('SUCCESS – Seeded data')

}


module.exports = {
  client,
  seed
};

/*
// Format local images for seeding only
// const logoCharter = await loadImage('images/charter.png')
// const logoITG = await loadImage('images/itg-logo.png')

// CREATE STARTER DATA
// const [charter, itg] = await Promise.all([
//   createOrganization({ name: 'Charter', org_code: 'CHTR' , logo: logoCharter }),
//   createOrganization({ name: 'ITG' , org_code: 'ITG' , logo: logoITG})
// ])

  // const [kirk] = await Promise.all([
  //   createUser({
  //     first_name: 'Kirk',
  //      last_name: 'Mendoza',
  //      email: 'kirkmendoza@gmail.com',
  //      password: '1111',
  //      organization_id: itg.id, 
  //      is_admin: 'true'
  //     })
  // ])

    CREATE TABLE organizations (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      org_code VARCHAR(8) NOT NULL,
      logo TEXT
    );

    CREATE TABLE users (
      id UUID PRIMARY KEY,
      first_name VARCHAR(75) NOT NULL,
      last_name VARCHAR(75) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      organization_id UUID REFERENCES organizations(id),
      is_admin BOOLEAN DEFAULT false NOT NULL,
      avatar TEXT
    );





*/ 