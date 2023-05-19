## Bravo Challenge

This is the backend challenge for @hurbcom developer position and might be, also, used as a portifolio

## Sumary

[Description](#description)
[Requisites](#requisites)
[Running the project](#running-the-project)
[Expected behavior](#expected-behavior)
[Usage](#usage)

## Description

The goal of this application is to proccess currency conversion, based on this major goals:

> - Conversion rate based on the real currency rate.
> - Possibility of adding new currencies. Feel free to create your own currency :)
> - Possibility of deleting existing currencies.

## Requisites

- [Docker](https://docs.docker.com/engine/install/)
- [Docker compose](https://docs.docker.com/compose/install/)

## Running the project

1. git clone this project
2. `cd` into the project folder
3. Make sure ports: `27017`, `6379`, `5001`, `105001` are not being used. If so, you can kill these ports with `sudo kill -9 $(sudo lsof -t -i:<PORT>)`
4. Build de container orchestration `docker compose up --build`

## Expected behavior

1. When first running the project, server will start one mongodb instance for currency rate data and one for logging.
2. Server will populate mongodb with currency rate data, so you can start converting.
3. Server will connect to Redis, so you can have cache.
4. A cron server will start, so your currency rate can be updated in a every 2 minute job.
5. Everytime cronjob is executed, the qty of currency found and updated will be logged to the console.
6. Logs of every request will be displayed to the console.

## Usage

### Converting currency

_You can use the available postman collection to make it easier. It can be found in the collection as `Get conversion`_

1. Access the endpoint `http:localhost:5001/currencyConversion?from={fromCurrency}&to={toCurrency}&amount={convertAmount}`
2. Replace the placeholder for the intended conversion
3. Perform a `GET` request to the referred endpoint
4. As an exemple, send this request and receive the following response:
   > Request: `http:localhost:5001/currencyConversion?from=BRL&to=USD&amount=100.98`

```
{
    "from": "BRL",
    "to": "USD",
    "amount": "100.98",
    "conversion": 20.33304472691837,
    "fromCahe": true
}
```

> - Keep in mind that if you want to convert from or to a currency that does not exists, an error you be returned by the server
> - Same goes to an amount that is not a number

### Adding currency

_You can use the available postman collection to make it easier. It can be found in the collection as `Add currency`_

1. Access the endpoint `http:localhost:5001/currencyAddition`
2. You must pass a raw body, in a json format, containing the following structure:

```
{
    "currency": "CUR",
    "rate": 5.909
}
```

3. Perform a `POST` request to the referred endpoint
4. As an exemple, send this request and receive the following response:

```
{
    "currency": "CUR",
    "rate": 5.909,
    "_id": "6466e2c70ac00f8dfd623a49",
    "created_at": "2023-05-19T02:45:27.472Z",
    "__v": 0
}
```

> Keep in mind that if you want to create new currencies, they must be:
>
> - Minunum of 3 characteres and maximum of 6 characteres
> - Rate must be a positive floating-point number

> Also keeo in mind that if you try to perform a request to this endpoint and the currency alredy exists, an error you be returned by the server

### Deleting currency

_You can use the available postman collection to make it easier. It can be found in the collection as `Delete currency`_

1. Access the endpoint `http:localhost:5001/currencyDeletion/{currency}`
2. Perform a `DELETE` request to the referred endpoint
3. As an exemple, send this request and receive the following response:
   > Request: `http:localhost:5001/currencyDeletion/CUR`

> Keep in mind that this request will return `204 no content`
