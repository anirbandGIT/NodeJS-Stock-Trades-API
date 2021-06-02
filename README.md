# Stock Trades API Hard

## Data:
Example of a trade data JSON object:
```
{
    "id":1,
    "type": "buy",
    "user_id": 23,
    "symbol": "ABX",
    "shares": 30,
    "price": 134,
    "timestamp": 1531522701000
}
```

## Project Specifications:
The task is to implement a model for the trade object and the REST service that exposes the `/trades` endpoint, which allows for managing the collection of trade records in the following way:

**POST** request to `/trades`:

- creates a new trade
- expects a JSON trade object without an id property as a body payload. If the shares value is out of accepted range [1, 100], or the type value is invalid (i.e. not 'buy' or 'sell'), the API must return error code 400. Besides those cases, you can assume that the given payload is always valid.
- adds the given trade object to the collection of trades and assigns a unique integer id to it. The first created trade must have id 1, the second one 2, and so on.
- the response code is 201, and the response body is the created trade object

**GET** request to `/trades`:

- returns a collection of all trades
- the response code is 200, and the response body is an array of all trades objects ordered by their ids in increasing order
- optionally accepts query parameters type and user_id, for example `/trades?type=buy&&user_id=122`. All these parameters are optional. In case they are present, only objects matching the parameters must be returned.

**GET** request to `/trades/<id>`:

- returns a trade with the given id
- if the matching trade exists, the response code is 200 and the response body is the matching trade object
- if there is no trade with the given id in the collection, the response code is 404 with the body having the text `ID not found`

**DELETE**, **PUT**, **PATCH** request to `/trades/<id>`:

- the response code is 405 because the API does not allow deleting or modifying trades for any id value

## Note:
You are expected to choose the ORM you want to use and initialize the connection of the Database in the file `connection.js`. The following ORMs/Databases are available for use out of the box:
1. Sequelize with SQLITE
2. Mongoose with MongoDB


## Environment 
- Node Version: ^12.18.2
- Default Port: 8000

**Read Only Files**
- `test/*`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
