
### Welcome :wave: 

*EpiJob v1.0* is now available! This project is a job search platform that allows users to browse available job offers and apply to those that interest them. It was built using React and Express.js.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Getting Started

To get started, clone this repository to your local machine and install the dependencies:

```bash
git clone https://github.com/EpitechMscProPromo2026/T-WEB-501-LIL_17
```

**:warning: Have sur, you have NodeJs and npm install on your machine.**

1. Run with local server:

```bash
// On FrontEnd

cd jobBoardFrontend/

npm install
# Or
yarn install

npm run dev
# Or 
yarn run dev

// On BackEnd

cd jobBoardBackend/

npm install
# Or
yarn install

npm run start
# Or
yarn run dev
```

2. Open and see in a browser:

```bash
localhost:5173/ #FrontEnd
localhost:3000/ # BackEnd
```

If you want to use EpiJob in production, do this:

```bash
cd jobBoardFrontend
npm install

cd ../jobBoardBackend
npm install

cd ../jobBoardFrontend
npm run build

cd ../jobBoardBackend
npm run build

// Star severs 
npm start # In the different folders
```

## Features

Here some exemples of features that are available in JobBoard:

- Can see adverts
- can apply to advert
- Authentification : *user/company/admin*
- Can see own applications
- Can see who applied to an advert
- Can search adverts by multiples filters
- An admin page to control database
- Can edit own account
- Can create advert
- Can see all companies with their adverts
- Toast for success or errors

## Database Schema

We have designed a mobile, dynamic, and strong database schema using Sequelize and MySQL. You can view our MCD [here]("./gestion/mcd_final.png") :arrow_left:

## API Endpoints

To access the API, use the following base URL:

**BASE_API_URL** = ```http://localhost:3000/api```

#### Peoples

 <summary><code style='background:blue; color:white'>GET</code> <code><b>/users</b></code> <code>GET all users</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/users/:id</b></code> <code>GET a user by ID</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/users</b></code> <code>POST a new user</code></summary>
 <summary><code style='background:orange; color:white'>PUT</code> <code><b>/users/:id</b></code> <code>PUT a user by ID</code></summary>
   <summary><code style='background:red; color:white'>DELETE</code> <code><b>/users/:id</b></code> <code>DELETE a user by ID</code></summary>

#### Companies


 <summary><code style='background:blue; color:white'>GET</code> <code><b>/companies</b></code> <code>GET all companies</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/companies/:id</b></code> <code>GET a company by ID</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/companies</b></code> <code>POST a new company</code></summary>
 <summary><code style='background:orange; color:white'>PUT</code> <code><b>/companies/:id</b></code> <code>PUT a company by ID</code></summary>
   <summary><code style='background:red; color:white'>DELETE</code> <code><b>/companies/:id</b></code> <code>DELETE a company by ID</code></summary>

#### Anonymous

 <summary><code style='background:blue; color:white'>GET</code> <code><b>/anonymous</b></code> <code>GET all anonymous user</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/anonymous/:id</b></code> <code>GET an anonymous by ID</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/anonymous</b></code> <code>POST a new anonymous user</code></summary>
 <summary><code style='background:orange; color:white'>PUT</code> <code><b>/anonymous/:id</b></code> <code>PUT an anonymous user by ID</code></summary>
   <summary><code style='background:red; color:white'>DELETE</code> <code><b>/companies/:id</b></code> <code>DELETE an anonymous user by ID</code></summary>

#### Authentification

 <summary><code style='background:blue; color:white'>GET</code> <code><b>auth/:type/:token</b></code> <code>GET the user (company or user) connected</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/auth/login</b></code> <code>POST Connect a user and add Token</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/auth/logout</b></code> <code>POST disconnect a user</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/auth/refresh</b></code> <code>POST a new refresh token</code></summary>

#### JobApplications

 <summary><code style='background:blue; color:white'>GET</code> <code><b>/jobapplications</b></code> <code>GET all jobapplications</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/jobapplications/:id</b></code> <code>GET an jobapplication by ID</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/jobapplications/advert/:advertId</b></code> <code>GET all user that applied at the advert</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/jobapplications/user/:userId</b></code> <code>GET all adverts that a user applied</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/jobapplications</b></code> <code>POST a new jobapplication</code></summary>
 <summary><code style='background:orange; color:white'>PUT</code> <code><b>/jobapplications/:id</b></code> <code>PUT a jobapplication by ID</code></summary>
   <summary><code style='background:red; color:white'>DELETE</code> <code><b>/jobapplications/:id</b></code> <code>DELETE a jobapplication by ID</code></summary>

#### Advertissements

<summary><code style='background:blue; color:white'>GET</code> <code><b>/advertissements</b></code> <code>GET all advertissements</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/advertissements/:id</b></code> <code>GET an advert by ID</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/advertissements/company/:companyId</b></code> <code>GET all advertissements from a company</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/advertissements/filters</b></code> <code style='background: yellow'>**Params** : keywords, city, type contrat</code> <code>Get Advertissements with specifics params</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/advertissements</b></code> <code>POST a new advertissement</code></summary>
 <summary><code style='background:orange; color:white'>PUT</code> <code><b>/advertissement/:id</b></code> <code>PUT an advert by ID</code></summary>
   <summary><code style='background:red; color:white'>DELETE</code> <code><b>/advertissement/:id</b></code> <code>DELETE an advert by ID</code></summary>

#### Tables

 <summary><code style='background:blue; color:white'>GET</code> <code><b>/tables</b></code> <code>GET all tables from the database</code></summary>
 <summary><code style='background:blue; color:white'>GET</code> <code><b>/:tableName</b></code> <code>GET all records from a table</code></summary>
 <summary><code style='background:green; color:white'>POST</code> <code><b>/:tableName</b></code> <code>POST a new record in a table</code></summary>
 <summary><code style='background:orange; color:white'>PUT</code> <code><b>/:tableName/:id</b></code> <code>PUT a record from a table</code></summary>
   <summary><code style='background:red; color:white'>DELETE</code> <code><b>/:tableName/:id</b></code> <code>DELETE a record from a table</code></summary>

-------------------

-*EXAMPLE of data*-

<code>GET /api/users</code>

```json
[
  {
    "id": 1,
    "nom": "John Doe",
    "email": "john.doe@example.com"
  },
  {
    "id": 2,
    "nom": "Jane Doe",
    "email": "jane.doe@example.com"
  }
]
```

####

## Technologies Used

The following technologies were used to build this application:

| Frontend | Backend | Database |
| --- | --- | --- |
| React | Express.js | MySQL |
| HTML | Node.js | Sequelize |
| TailwindCSS | | |
| JavaScript | | |

-----

#### Credits
We would like to thank the following individuals for their contributions to this project:

- Olivier Pakosz
- Arthur Azoula


#### License
This project is licensed under the MIT License. You are free to use, modify, and distribute this code as long as you include the original license file and attribution to the original authors.

Make sure to replace the names in the "Credits" section with the appropriate names for your project. Once you have added these sections, your README.md file is complete!