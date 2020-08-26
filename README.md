# steam-game-description
Game description for Steam app clone

[![FEC-Bell](https://circleci.com/gh/FEC-Bell/steam-game-description.svg?style=svg)](https://app.circleci.com/pipelines/github/FEC-Bell/steam-game-description)
[![Coverage Status](https://coveralls.io/repos/github/FEC-Bell/steam-game-description/badge.svg)](https://coveralls.io/github/FEC-Bell/steam-game-description)

Please see the README for [Steam Reviews](https://github.com/FEC-Bell/steam-reviews) for documentation, as the two services are very similar.

The only differences are:

- **Endpoints**: Game Description does not have any API endpoints.
- **PostgreSQL database name**: the database for Game Description should be initialized as `steam_game_descriptions`.

## CRUD ENDPOINTS
---

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