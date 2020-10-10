# Steam Reviews Service

[![Build Status](https://travis-ci.org/FEC-Bell/steam-reviews.svg?branch=master)](https://travis-ci.org/FEC-Bell/steam-reviews) [![Coverage Status](https://coveralls.io/repos/github/FEC-Bell/steam-reviews/badge.svg?branch=master)](https://coveralls.io/github/FEC-Bell/steam-reviews?branch=master)

Description service for Team Homestead's SDC-Steam app clone. Cloned front end app from [Team Bell's](https://github.com/FEC-Bell) FEC-steam app and worked on backend to optimize the server to work with 10M data set. [Here](https://docs.google.com/document/d/1Ulo8qkIQL33yPU7_VzkD-6jz_rbb1sXEUm3c6D5JR-k/edit) is a journal documenting my entire process for creating this service.

## Media

### Steam Reviews


![Steam Game Description GIF Demo](https://media.giphy.com/media/RlZgP43KhKByiG7nxo/giphy.gif)

*Note that some display images do not work because the target API service has not completely implemented support for them yet.*

### [Steam Proxy](https://github.com/FEC-Bell/christina-proxy):


![Steam Proxy GIF Demo](https://media.giphy.com/media/JpqiSUO3Ctoykg0Vt4/giphy.gif)

## Related Projects

These are the related Steam services, of which [Game Description](https://github.com/FEC-Bell/steam-game-description) and the [reverse proxy](https://github.com/FEC-Bell/christina-proxy) were also developed by me individually.

- [Reviews Graph](https://github.com/Team-Homestead-SDC-Steam/Review_Micko)
- [Downloadable Content](https://github.com/FEC-Bell/downloadable_content)
- [Photo Carousel](https://github.com/FEC-Bell/photo-carousel)
- [User Tags](https://github.com/FEC-Bell/steam-user-tags)
- [Game Description](https://github.com/Team-Homestead-SDC-Steam/game_description)
- [Steam Clone - Reverse Proxy](https://github.com/Team-Homestead-SDC-Steam/Andy_Proxy)

## Table of Contents

1. [Usage](#usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Service Endpoints](#service-endpoints)

5. [Troubleshooting](#troubleshooting)
    - [Troubleshooting PostgreSQL](#troubleshooting-postgresql)

## Usage

The Steam Description microservice is intended to be used in conjunction with its [Related Projects](#related-projects) to create a realistic Steam item details page clone using AWS. [Here](https://github.com/Team-Homestead-SDC-Steam/Andy_Proxy) is an example of a proxy server created with this service.

```
git clone https://github.com/Team-Homestead-SDC-Steam/game_description.git`
cd game_description
npm install
```

## Requirements

- Node JS v12
- PostgreSQL v12

## Development

1. Clone repo & install dependencies:
    ```
    git clone https://github.com/Team-Homestead-SDC-Steam/game_description`
    cd game_description
    npm install
    npx install-peerdeps knex
    ```

2. **PostgreSQL v12** must be set up before continuing:
    - [Linux setup](https://www.postgresql.org/download/linux/ubuntu/) (assuming Ubuntu v16.04+)
    - [MacOS setup](https://www.postgresql.org/download/macosx/)
    - [Windows setup](https://www.postgresql.org/download/windows/)

    If using Windows, you may also install PostgreSQL as a Linux service via Windows Subsystem for Linux. However, you'll need to upgrade to WSL 2.0 if using Ubuntu v20.04. [See this journal post](https://github.com/FEC-Bell/steam-reviews/blob/master/fec-engineering-journal/JOURNAL.md#set-up-postgresql) for details on how this can be done.

    [Verify](https://linuxize.com/post/how-to-check-postgresql-version/) that PostgreSQL is version 12.

    PostgreSQL service commands for Windows WSL or Linux:
    ```
    sudo service postgresql start
    sudo service postgresql stop
    sudo service postgresql status
    ```

    PostgreSQL service commands for Mac:
    ```
    brew services start postgresql
    brew services stop postgresql
    brew services
    ```

    Further development assumes that PostgreSQL is running on its default port, 5432, and has been installed with the default settings otherwise.

3. Create file named `.env` in local repo root containing the following lines:
    ```
    PORT=3001
    PG_PASS=your_password_here
    PG_USER=your_username_here
    ```
    The PG_PASS line is the password for accessing your PostgreSQL service. You may add other environment variables to this file, and access them throughout your code via adding the line `require('dotenv').config()` in your code. If you did not provide a password during PostgreSQL installation, delete `your_password_here` from the above line. The `.env` file has been `.gitignore`d for your convenience.

    Your username for accessing PG_USER on Windows WSL or Linux should be `postgres`. On Mac, it should be your username as displayed in zsh:  `your_username@MacBook-Pro ~ %`

4. Create the `steam_reviews` database in your CLI:
    ```
    createdb steam_game_descriptions
    ```

    Or from inside psql:
    ```
    CREATE DATABASE steam_game_descriptions;
    ```

    Make sure you're entering the above command as the user `postgres` (or whatever your username is on Mac). See [Troubleshooting PostgreSQL](#troubleshooting-postgresql) for more information.

5. Seed the database with `npm run seed`.
    - **If using Mac**: instead of `npm run seed`, run:
    ```
    sudo npm i -g knex
    npm run seed:internal
    ```

    - You may check that the DB has the proper entries via `psql` CLI tool:
    ```
    psql -d steam_game_description         // connect to steam_game_description database
    \dt                           // describe tables
    select count(*) from descriptions;  // 10000000
    \q                            // quit psql
    ```

6. Ensure that all tests pass with `npm run test`.

7. Start the server with `npm run server:dev`.
    - Alternatively, start a production server with `npm run start`.

8. Start the client with `npm run client:dev`.
    - Alternatively, build a production-ready minified `bundle.js` with `npm run build`.

## Service Endpoints

### GET '/api/description/:gameid'

#### Example Output

```javascript
{
    "id": 4,
    "description": "Voluptates ipsam est beatae ipsa. Veniam ut commodi amet eaque officiis vero natus veniam. Est sunt repellendus vel dignissimos incidunt rerum incidunt minus ad. Esse id voluptas praesentium sed sed mollitia deleniti autem velit. Et at consequatur ratione accusamus. Et a non culpa velit sed dolorem. Dolor vel ad. Voluptas temporibus omnis quia ea. Quo quos aut fugit consequuntur alias praesentium voluptatum commodi ut. Et corporis nostrum ea consequatur quia ut corrupti. Placeat qui tenetur qui est cumque ad nam reprehenderit.",
    "release_date": "2018-07-07T00:00:00Z",
    "developers": [
        {
            "id": 10,
            "company": "Bungie",
            "platform": "Mac"
        }
    ],
    "publishers": [
        {
            "id": 13,
            "company": "Blizzard Entertainment",
            "platform": "Mac"
        }
    ]
}

```
---



### POST '/api/description'

#### POST body
```javascript
    {
        description: String,
        release_date:Date,
        developers:Array[Jsonb],
        publisher:Array[Jsonb]
    }
```
---

### PUT '/api/description/:gameid'

#### PUT body
```javascript
    {
        description: String,
        release_date:Date,
        developers:Array[Jsonb],
        publisher:Array[Jsonb]
    }
```
---


### Delete '/api/description/:gameid



## Troubleshooting

Any uncovered problems, or errors that you solved and want to share? Feel free to [open a issue](https://github.com/FEC-Bell/steam-reviews/issues/new).

### Troubleshooting PostgreSQL
1. If using `psql -d steam_game_description` via CLI to check that the database was seeded properly, an error
    ```
    psql: error: could not connect to server: FATAL:  role "<USERNAME>" does not exist
    ```
    might appear. If this happens, use `sudo su postgres` to switch to the postgres account, and run `psql -d steam_reviews` again. If user 'postgres' does not exist in your system, you may create this user *with superuser permissions* by typing `CREATE USER postgres SUPERUSER;` in psql CLI. See [this post](https://stackoverflow.com/questions/15301826/psql-fatal-role-postgres-does-not-exist) for more details. Typing `sudo su YOUR_USERNAME` will switch you back to your user account.

