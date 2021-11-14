# fortunemine-case

Author: Muhammed Halas

A simple REST API built using NodeJS, TypeScript, Postgres, Sequelize ORM.

# Report
## Questions:
1. How can we avoid callback hell with the new features of JS?

**Answer:** We can avoid the “callback hell” by using Promises, utilizing promise chaining, 
and utilizing the await keyword in async functions, so that we can reduce the amount of nested 
code and visualize the execution flow more easily. 
 
2. How does NodeJS handle more than one request at the same time while it is
a single thread?

**Answer:**  NodeJS actually has an internal thread pool to get requests and put them into 
the so-called EventQueue. Also, when a request taken from the event queue requires some blocking 
IO operations, that request is then assigned to a thread from the pool, which processes it and then 
sends the response back to the event loop. This is how Node performs so well.

## Running the code:
Clone the code from this repo.
Create a db on your postgres server. In my case it is named case-db.
Change the db url by writing your own db credentials which is located in `src/dbconfig/db.ts`.
It looks like this `'postgres://username:password@localhost:5432/case-db'`.
Go to the project directory and run `npm install` from your terminal.
Then run `npm start` from your terminal. The code should be running. 
Sequelize wil create the db tables for us. 

## Functionality Demo:
First let's populate the tables we'll use.

1. Adding the level completion rewards.

Request: `POST http://localhost:3000/level_rewards/bulk_add`

Request Body & Response: 
```json
[{"level":1,"coin":1000,"energy":10},
{"level":2,"coin":2000,"energy":20},
{"level":3,"coin":3000,"energy":30},
{"level":4,"coin":4000,"energy":40},
{"level":5,"coin":5000,"energy":50},
{"level":6,"coin":6000,"energy":60},
{"level":7,"coin":7000,"energy":70},
{"level":8,"coin":8000,"energy":80},
{"level":9,"coin":9000,"energy":90},
{"level":10,"coin":10000,"energy":100}]
```

Great! Now Let's add a player.

2. Adding a player.

Request: `POST http://localhost:3000/players/add`

Request Body: 
```json
{   
    "player_id": "adamant93",
    "fullname": "Adam",
    "email": "adam@email.com"
}
```

Response: 
```json
{
    "is_success": true,
    "state": {
        "player": {
            "player_id": "adamant93",
            "fullname": "Adam"
        },
        "wallet": {
            "level": 1,
            "coin": 0,
            "energy": 0
        },
        "rewards": []
    }
}
```

3. Level Up

Request: `POST http://localhost:3000/players/adamant93/levelup`

Response: 
```json
{
    "is_success": true,
    "state": {
        "player": {
            "player_id": "adamant93",
            "fullname": "Adam"
        },
        "wallet": {
            "level": 2,
            "coin": 0,
            "energy": 0
        },
        "rewards": [
            {
                "reward_id": "1101343d-6e35-45db-953c-3313682a4a6e",
                "reward": {
                    "coin": 1000,
                    "energy": 10
                }
            }
        ]
    }
}
```
 
4. Collect Reward

Request: `POST http://localhost:3000/players/adamant93/collect/1101343d-6e35-45db-953c-3313682a4a6e`

Response: 
```json
{
    "is_success": true,
    "state": {
        "player": {
            "player_id": "adamant93",
            "fullname": "Adam"
        },
        "wallet": {
            "level": 2,
            "coin": 1000,
            "energy": 10
        },
        "rewards": []
    }
}
```















