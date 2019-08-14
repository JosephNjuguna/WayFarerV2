# WayFarer V2
Wayfarer is an online bus booking platform.

### BADGES.
[![Build Status](https://travis-ci.org/JosephNjuguna/WayFarerV1.svg?branch=dev)](https://travis-ci.org/JosephNjuguna/WayFarerV1)
[![Coverage Status](https://coveralls.io/repos/github/JosephNjuguna/WayFarerV1/badge.svg?branch=dev)](https://coveralls.io/github/JosephNjuguna/WayFarerV1?branch=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/9f4deb472db93aea9bc4/maintainability)](https://codeclimate.com/github/JosephNjuguna/WayFarerV1/maintainability)


## API ENDPOINTS

| Resource URL                     | Methods | Description                 |
| -------------------------------- | ------- | --------------------------- |
| /api/v2/signup                   | POST    | Create an account           |
| /api/v2/login                    | POST    | Login                       |
| /api/v2/trips                    | POST    | admin create trip           |
| /api/v2/trips/:id/cancel         | PATCH   | admin cancel trip           |
| /api/v2/trips                    | GET     | admin/user view all trips   |
| /api/v2/trips/:id                | GET     | admin/userview specific trip|
| /api/v2/origin/:route            | GET     | user filter trip by route   |
| /api/v2/destination/:route       | GET     | user filter trip by destination|
| /api/v2/bookings                 | POST    | user book a trip            |
| /api/v2/userbookings             | GET    | user view all his/her bookings|
| /api/v2/bookings                 | GET     | admin get all bookings      |
| /api/v2/bookings/:id             | DELETE  | user cancel his/her trip booking|

## Tools Used

- Language: Javascript
- Server environment: Node.js (A javascript server side environment which can help you build web applications,microservices and APIs)
- Back-end framework: Express (A server side web framework which can help you build back-end applications and APIs fast.)
- Testing library: Mocha.js (A javascript library used for unit testing)
- Assertion library: Chai (A Javascript library to create assertions used in testing)
- Continuous integration: Travis CI
- Test coverage: nyc (A javascript library used to generate coverage reports)
- Test coverage badge: Coveralls (It shows test coverage statistics)
- Front-end deployment: Github Pages
- Back-end deployment: Heroku

### Github Pages link

[WayFarer UI](https://josephnjuguna.github.io/Wayfarer/UI/index.html)

### Heroku link Example

[WayFarer API Endpoints](https://v1wayfarer.herokuapp.com/api-docs)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites
```
npm
```
you can install **NPM**  in your machine using this [link](https://nodejs.org/en/download/). choose your machine OS to get started.
## Installing

The installation of this application is fairly straightforward, After cloning this repository to your local machine,`cd` into the package folder using your terminal and run the following

```
> npm install
```

It will install the node_modules which will help you run the project on your local machine.

Before running the server ensure that you create a  **.env** file.
Inside the **.env** file  add the following:
```
JWT_KEY= 'wayfarer@12'
PORT = 3000

// admin data
EMAIL = 'admin123@mail.com'
PASSWORD = 'Admin@123'

//users data
email = 'user@mail.com'
password = 'qwerQ@qwerre123'
```

## Run the server

```
$ npm start
```

## Run the test

```
$ npm test
```

### VALIDATIONS DONE.
1. user data during signup.
2. user data during login.
3. all the required parameter have been validated.
- a user can`t search using a string where an interger is required.
```
/api/v2/trips/:id/cancel
```
- user can`t use integers where strings are required.
```
/api/v2/origin/:route 
```
4. user cannot book a canceled trip.
5. user can`t  book a seat twice but the user can book two seats on the same bus.
6. admin cannot create a trip whereas the destination and origin are the same.
7. user cannot delete another users booking.
8. user cannot delete again the deleted booking.
#### trips validation
9. user can only view active trips.
10. admin can view all trips regardless of been canceled or active.
11. user cannot book a seat that is not stated on the trip. eg:
```
a trip is stated to have 20 seats. a user can`t book  seat number 25. since its not available.
```
# API ENDPOINTS DATA:
 use this data to test the api endpoint. feel free to change the data.
 
 **POST /api/v2/signup**
 ```
    firstname:Joe
    lastname:njuguna
    email:joe@gmail.com
    password:qwerQ@qwerre123
```

**POST /api/v2/login** (user)
```
email:joe@gmail.com
password:qwerQ@qwerre123
```

**POST /api/v2/login** (admin)
```
email:admin123@gmail.com
password:qwerQ@qwerre123
```
**POST /api/v2/trips**

-admin create trip enpoint
```
seatingCapacity:12
busLicensenumber:KRE 132
origin: KIGALI
destination : NAIROBI
tripDate:1/1/2019
fare:3000
```

**PATCH /api/v2/trips/2/cancel**

-- admin cancel trip endpoint --

**POST /api/v2/bookings**

-user book trip
```
tripId: 1
seatNumber: 12
```
**DELETE /api/v2/bookings/:id**

-- user delete his/her booking -- 
```
BOOKING ID
```

**Version 2.0.0**

## Contributor

- Joseph Njuguna <josephnjuguna482@gmail.com>

---
feel free to reachout incase of any question and feel free to use this API for your needs. Joseph Njuguna