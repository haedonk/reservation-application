# Restaurant Reservation System

Link: https://guarded-badlands-69101.herokuapp.com/dashboard

## Existing files

Frontend:

- React.js
- Boostrap
- CSS

Backend:

- Node.js
- Express.js
- PostgreSQL
- Knex.js


## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

If you have trouble getting the server to run, reach out for assistance.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you have implemented the necessary functionality.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

## Features

### Dashboard

This is the homepage of the application.  You can view resevations and tables here.  You can move forward to the next or previous day by clicking the button, respectively.  You will have a table of all tables.  You have the ability to seat, edit, or cancel the reservation.  You also have the ability to finish the table.

[![Image from Gyazo](https://i.gyazo.com/06bdd08ce71c86047f2342fab7a6cd8e.png)](https://gyazo.com/06bdd08ce71c86047f2342fab7a6cd8e)

### Search

This page allows you to search reservations by phone number.  Each reservation has edit, seat, cancel options depending on the status.


[![Image from Gyazo](https://i.gyazo.com/9e0a4d9cf206e9bfc1c9f24f1d0afb9c.png)](https://gyazo.com/9e0a4d9cf206e9bfc1c9f24f1d0afb9c)

### New Reservation

This page displays a form that allows you to add a new reservation.  Constricted to the validation provided by the restaurant.

[![Image from Gyazo](https://i.gyazo.com/858f51bc72897d8b8b44131c39288f8f.png)](https://gyazo.com/858f51bc72897d8b8b44131c39288f8f)

### New Table

This page displays a form that allows you to add a new table.  Constricted to the validation provided by the restaurant.

[![Image from Gyazo](https://i.gyazo.com/8cbd8f7926a4f02ca5ed118a1121c071.png)](https://gyazo.com/8cbd8f7926a4f02ca5ed118a1121c071)


## API
## Reservations
GET `/reservations`
- Retrieves all current reservations

----

GET `/reservations/:reservation_id`
- Retrieves the reservation with the corresponding reservation id 

GET `/reservations/:reservation_id/status`
- Retrieves the desired reservation's status. May return *seated*, *finished*, or *canceled*.

PUT `/reservations/:reservation_id`
- Updates an existing reservation

### Parameters:
| Parameter | Type |
| --------- | ---- |
| `reservation_id`| `int` |

----

POST `/reservations`
- Creates a new reservation

### Parameters:
| Parameter | Type |
| --------- | ---- |
| `first_name`| `str` |
| `last_name`| `str` |
| `mobile_number`| `int` |
| `reservation_date`| `date` |
| `reservation_time`| `str` |
| `people`| `int` |

----

## Tables
GET `/tables`
- Retrieves all tables

----

PUT `/tables/:table_id/seat`
- Updates table status to connected to a reservation 

DELETE `/tables/:table_id/seat`
- Updates the status of the reservation to *finished* at the table and clears the reservation_id
- Does not delete the table, returns the status of the table to *free*

### Parameters:
| Parameter | Type |
| --------- | ---- |
| `reservation_id`| `int` |

----

POST `/tables`
- Creates a new table

### Parameters:
| Parameter | Type |
| --------- | ---- |
| `table_name`| `str` |
| `capacity`| `int` |

----