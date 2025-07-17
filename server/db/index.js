const client = require('./client');
const { createOrganization } = require('./organizations');
const { createUser } = require('./users');
const { createBanner } = require('./banners');
const { createProject, createCreative } = require('./projects');
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
    DROP TABLE IF EXISTS creatives;
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
      org_code VARCHAR(8) REFERENCES organizations(org_code),
      job_number VARCHAR(100) UNIQUE NOT NULL,
      CONSTRAINT org_and_job_number UNIQUE(org_code, job_number)
    );

    CREATE TABLE creatives (
      id UUID PRIMARY KEY,
      creative_name VARCHAR(100) UNIQUE NOT NULL,
      job_number VARCHAR(100) REFERENCES projects(job_number),
      CONSTRAINT job_and_creative UNIQUE(job_number, creative_name)
    );

    CREATE TABLE banners (
      id UUID PRIMARY KEY,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      job_number VARCHAR(100) REFERENCES projects(job_number),
      org_code VARCHAR(8) REFERENCES organizations(org_code),
      creative_id UUID REFERENCES creatives(id),
      creative_name VARCHAR(100) REFERENCES creatives(creative_name),
      is_mobile BOOLEAN DEFAULT false NOT NULL,
      link TEXT NOT NULL,
      CONSTRAINT creative_and_banner UNIQUE(creative_id, id)
    );

  `
  await client.query(SQL)
  console.log("SUCCESSFULLY Created Tables")

  const logoITG = await loadImage('images/itg-logo.png')
  const logoCharter = await loadImage('images/charter.png')
  const logoMicrosoft = await loadImage('images/microsoft-logo.png')
  const logoXbox = await loadImage('images/xbox-logo.png')

  // CREATE STARTER ORGANIZATIONS
  const [itg, charter, microsoft, xbox, other] = await Promise.all([
    createOrganization({ name: 'Inspired Thinking Group', org_code: 'ITG', logo: logoITG }),
    createOrganization({ name: 'Charter', org_code: 'CHTR', logo: logoCharter }),
    createOrganization({ name: 'Microsoft', org_code: 'MSTH', logo: logoMicrosoft }),
    createOrganization({ name: 'Microsoft', org_code: 'MSTX', logo: logoXbox }),
    createOrganization({ name: 'Other', org_code: 'OTHER', logo: null })
  ])

  // CREATE STARTER USERS
  const [kirk, freddy, sara, paige] = await Promise.all([
    createUser({ first_name: 'Kirk', last_name: 'Mendoza', username: 'kirk@itg.com', password: '1111', org_code: itg.org_code, is_admin: true, avatar: null }),
    createUser({ first_name: 'Freddy', last_name: 'Bustamante', username: 'freddy@microsoft.com', password: '2222', org_code: microsoft.org_code, is_admin: false, avatar: null }),
    createUser({ first_name: 'Sara', last_name: 'Voghel', username: 'sara@charter.com', password: '3333', org_code: charter.org_code, is_admin: false, avatar: null }),
    createUser({ first_name: 'Paige', last_name: 'Burgett', username: 'paige@charter.com', password: '4444', org_code: charter.org_code, is_admin: false, avatar: null })
  ])

  // CREATE START PROJECTS
  const [prj1, prj2, prj3, prj4, prj5, prj6, prj7, prj8, prj9] = await Promise.all([
    createProject({ job_number: "100000-03", org_code: xbox.org_code }),
    createProject({ job_number: "012907-23", org_code: other.org_code }),
    createProject({ job_number: "015479-2025", org_code: charter.org_code }),
    createProject({ job_number: "100000-02", org_code: xbox.org_code }),
    createProject({ job_number: "000112-24", org_code: microsoft.org_code }),
    createProject({ job_number: "086-0101", org_code: microsoft.org_code }),
    createProject({ job_number: "086-0072", org_code: microsoft.org_code }),
    createProject({ job_number: "086-0017", org_code: xbox.org_code }),
    createProject({ job_number: "086-0093", org_code: microsoft.org_code })
  ])

  // CREATE CREATIVES
  const [creative1, creative2, creative3, creative4, creative5, creative6, creative7, creative8, creative9, creative10, creative11] = await Promise.all([
    createCreative({ creative_name: 'Doom: The Dark Ages', job_number: prj1.job_number }),
    createCreative({ creative_name: 'Interactive Demo Pitch', job_number: prj2.job_number }),
    createCreative({ creative_name: 'Prospecting Interactive', job_number: prj3.job_number }),
    createCreative({ creative_name: 'Remarketing Interactive', job_number: prj3.job_number }),
    createCreative({ creative_name: 'XBox Q2 - We Got You', job_number: prj4.job_number }),
    createCreative({ creative_name: 'FY24_BTS_2024', job_number: prj5.job_number }),
    createCreative({ creative_name: 'FY24_New_Year_2024', job_number: prj6.job_number }),
    createCreative({ creative_name: 'FY24 Holiday 2023', job_number: prj7.job_number }),
    createCreative({ creative_name: 'XBox Starfield Forza Performance', job_number: prj8.job_number }),
    createCreative({ creative_name: 'Neutral Evergreen', job_number: prj9.job_number }),
    createCreative({ creative_name: 'XBox Q2 - Avowed', job_number: prj4.job_number })
  ])

  // CREATE STARTER BANNERS
  const [
    banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner9, banner10, 
    banner11, banner12, banner13, banner14, banner15, banner16, banner17, banner18, banner19, banner20, 
    banner21, banner22, banner23, banner24, banner25, banner26, banner27, banner28, banner29, banner30, 
    banner31, banner32, banner33, banner34, banner35, banner36, banner37, banner38, banner39, banner40, 
  ] = await Promise.all([
    // Doom: The Dark Ages
    createBanner({ creative_id: creative1.id, creative_name: creative1.creative_name, org_code:prj1.org_code, job_number: prj1.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_03_XboxQ3Campaigns/Titan/300x250/R9/index.html' }),
    createBanner({ creative_id: creative1.id, creative_name: creative1.creative_name, org_code:prj1.org_code, job_number: prj1.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_03_XboxQ3Campaigns/Titan/300x600/R5/index.html' }),
    createBanner({ creative_id: creative1.id, creative_name: creative1.creative_name, org_code:prj1.org_code, job_number: prj1.job_number , width: 160, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_03_XboxQ3Campaigns/Titan/160x600/R6/index.html' }),
    createBanner({ creative_id: creative1.id, creative_name: creative1.creative_name, org_code:prj1.org_code, job_number: prj1.job_number , width: 728, height: 90, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_03_XboxQ3Campaigns/Titan/728x90/R4/index.html' }),
    createBanner({ creative_id: creative1.id, creative_name: creative1.creative_name, org_code:prj1.org_code, job_number: prj1.job_number , width: 970, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_03_XboxQ3Campaigns/Titan/970x250/R4/index.html' }),

    // Interactive Demo Pitch
    createBanner({ creative_id: creative2.id, creative_name: creative2.creative_name, org_code:prj2.org_code, job_number: prj2.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/23_FLOOR_012907_Interactive_Demo_Pitch/300x600/R4/Interactive_Demo_Pitch.html' }),

    // Prospecting Interactive
    createBanner({ creative_id: creative3.id, creative_name: creative3.creative_name, org_code:prj3.org_code, job_number: prj3.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Quad_Prospecting_V1/300x250/R6/index.html' }),
    createBanner({ creative_id: creative3.id, creative_name: creative3.creative_name, org_code:prj3.org_code, job_number: prj3.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Quad_Prospecting_V1/300x600/R3/index.html' }),
    createBanner({ creative_id: creative3.id, creative_name: creative3.creative_name, org_code:prj3.org_code, job_number: prj3.job_number , width: 160, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Quad_Prospecting_V1/160x600/R2/index.html' }),
    createBanner({ creative_id: creative3.id, creative_name: creative3.creative_name, org_code:prj3.org_code, job_number: prj3.job_number , width: 728, height: 90, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Quad_Prospecting_V1/728x90/R3/index.html' }),
    createBanner({ creative_id: creative3.id, creative_name: creative3.creative_name, org_code:prj3.org_code, job_number: prj3.job_number , width: 300, height: 250, is_mobile: true, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Quad_Remarketing_V1/300x250/R7/index.html' }),

    // Remarketing Interactive
    createBanner({ creative_id: creative4.id, creative_name: creative4.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Quad_Remarketing_V1/300x600/R3/index.html' }),
    createBanner({ creative_id: creative4.id, creative_name: creative4.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Quad_Remarketing_V1/160x600/R3/index.html' }),
    createBanner({ creative_id: creative4.id, creative_name: creative4.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 160, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Quad_Remarketing_V1/728x90/R2/index.html' }),
    createBanner({ creative_id: creative4.id, creative_name: creative4.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 728, height: 90, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Hotspot/Prospecting_300x250_V1/R1/index.html' }),
    createBanner({ creative_id: creative4.id, creative_name: creative4.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 300, height: 250, is_mobile: true, link: 'https://purered.haddadandpartners.com/Review/CHTR-015479-2025_SMB/Interactive_Hotspot/Remarketing_300x250_V2/R5/index.html' }),

    // XBox Q2 - We Got You
    createBanner({ creative_id: creative5.id, creative_name: creative5.creative_name, org_code:prj5.org_code, job_number: prj5.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/WeGotYouSuperSet/300x250/cod/R6/We_Got_You_300x250.html' }),
    createBanner({ creative_id: creative5.id, creative_name: creative5.creative_name, org_code:prj5.org_code, job_number: prj5.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/WeGotYouSuperSet/300x600/LeagueOfLegends/LoL/R3/index.html' }),
    createBanner({ creative_id: creative5.id, creative_name: creative5.creative_name, org_code:prj5.org_code, job_number: prj5.job_number , width: 160, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/WeGotYouSuperSet/160x600/Sims4/R2/We_Got_You_160x600.html' }),
    createBanner({ creative_id: creative5.id, creative_name: creative5.creative_name, org_code:prj5.org_code, job_number: prj5.job_number , width: 728, height: 90, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/WeGotYouSuperSet/728x90/stalker2/R5/index.html' }),
    createBanner({ creative_id: creative5.id, creative_name: creative5.creative_name, org_code:prj5.org_code, job_number: prj5.job_number , width: 970, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/WeGotYouSuperSet/970x250/indianajones/R4/index.html' }),
    createBanner({ creative_id: creative5.id, creative_name: creative5.creative_name, org_code:prj5.org_code, job_number: prj5.job_number , width: 320, height: 50, is_mobile: true, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/WeGotYouSuperSet/320x50/R4/We_Got_You_Mobile_320x50.html' }),

    // FY24_BTS_2024
    createBanner({ creative_id: creative6.id, creative_name: creative6.creative_name, org_code:prj6.org_code, job_number: prj6.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/24_MSTH_000112_FY24_BTS_2024/Interactive/300x250/R10/M365_FY25Q1BTS_USA_300x250_BAN_4SquareINT_EN_NA_Standard_ANI_TRY_NA_1.html' }),

    // FY24_New_Year_2024
    createBanner({ creative_id: creative7.id, creative_name: creative7.creative_name, org_code:prj7.org_code, job_number: prj7.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0101_FY24_NewYear%202024/Interactive/300x250/R13/M365_FY24Q3NewYear_USA_300x250_BAN_INT_EN_NA_Standard_ANI_SUB_NA_1.html' }),

    // FY24 Holiday 2023
    createBanner({ creative_id: creative8.id, creative_name: creative8.creative_name, org_code:prj8.org_code, job_number: prj8.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0099_FY24%20Holiday%202023/Interactive/300x250/R7/Interactive_300x250.html' }),
    createBanner({ creative_id: creative8.id, creative_name: creative8.creative_name, org_code:prj8.org_code, job_number: prj8.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0099_FY24%20Holiday%202023/Interactive/300x600/R5/Interactive_300x600.html' }),
    createBanner({ creative_id: creative8.id, creative_name: creative8.creative_name, org_code:prj8.org_code, job_number: prj8.job_number , width: 160, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0099_FY24%20Holiday%202023/Interactive/160x600/R8/M365_FY23Q4BTS_USA_160x600_BAN_INTFourSquare_EN_NA_Standard_ANI_SUB_NA_1.html' }),
    createBanner({ creative_id: creative8.id, creative_name: creative8.creative_name, org_code:prj8.org_code, job_number: prj8.job_number , width: 728, height: 90, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0099_FY24%20Holiday%202023/Interactive/728x90/R3/M365_FY23Q4BTS_USA_728x90_BAN_INTFourSquare_EN_NA_Standard_ANI_SUB_NA_1.html' }),

    // XBox Starfield Forza Performance
    createBanner({ creative_id: creative9.id, creative_name: creative9.creative_name, org_code:prj9.org_code, job_number: prj9.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086X-0017_FY24H1Q1_Xbox%20Starfield%20Forza%20Portfolio%20Performance/Social_Media_Inspired_Interactive_Shell/300x600/R7/Social_Media_Inspired_Interactive_Shell_300x600.html' }),

    // Neutral Evergreen
    createBanner({ creative_id: creative10.id, creative_name: creative10.creative_name, org_code:prj9.org_code, job_number: prj9.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0093_FY23Q4_Neutral%20Evergreen/Interactive/300x250/R10/M365_FY23Q4NeutralEvergreen_USA_300x250_BAN_INTWheel_EN_NA_Standard_ANI_SUB_NA_1.html' }),
    createBanner({ creative_id: creative10.id, creative_name: creative10.creative_name, org_code:prj9.org_code, job_number: prj9.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0093_FY23Q4_Neutral%20Evergreen/Interactive/300x600/R5/Interactive_300x600.html' }),
    createBanner({ creative_id: creative10.id, creative_name: creative10.creative_name, org_code:prj9.org_code, job_number: prj9.job_number , width: 160, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0093_FY23Q4_Neutral%20Evergreen/Interactive/160x600/R4/Interactive_160x600.html' }),
    createBanner({ creative_id: creative10.id, creative_name: creative10.creative_name, org_code:prj9.org_code, job_number: prj9.job_number , width: 728, height: 90, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/086H-0093_FY23Q4_Neutral%20Evergreen/Interactive/728x90/R5/Interactive_728x90.html' }),

    // XBox Q2 - Avowed
    createBanner({ creative_id: creative11.id, creative_name: creative11.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 160, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/Alabama/160x600/R6/index.html' }),
    createBanner({ creative_id: creative11.id, creative_name: creative11.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 300, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/Alabama/300x250/R12/index.html' }),
    createBanner({ creative_id: creative11.id, creative_name: creative11.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 300, height: 600, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/Alabama/300x600/R6/index.html' }),
    createBanner({ creative_id: creative11.id, creative_name: creative11.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 728, height: 90, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/Alabama/728x90/R3/index.html' }),
    createBanner({ creative_id: creative11.id, creative_name: creative11.creative_name, org_code:prj4.org_code, job_number: prj4.job_number , width: 970, height: 250, is_mobile: false, link: 'https://purered.haddadandpartners.com/Review/MSTX_100000_02_XboxQ2Campaigns/Alabama/970x250/R5/index.html' }),

  ])


  /*
    CREATE TABLE banners (
      id UUID PRIMARY KEY,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      job_number VARCHAR(100) REFERENCES projects(job_number),
      creative_id UUID REFERENCES creatives(id),
      creative_name VARCHAR(100) REFERENCES creatives(creative_name),
      is_mobile BOOLEAN DEFAULT false NOT NULL,
      link TEXT NOT NULL,
      CONSTRAINT creative_and_banner UNIQUE(creative_id, id)
    );
  */
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