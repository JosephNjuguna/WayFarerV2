# WayFarerV1
Wayfarer is an online bus booking platform.

### BADGES.
[![Maintainability](https://api.codeclimate.com/v1/badges/9f4deb472db93aea9bc4/maintainability)](https://codeclimate.com/github/JosephNjuguna/WayFarerV1/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/JosephNjuguna/WayFarerV1/badge.svg?branch=dev)](https://coveralls.io/github/JosephNjuguna/WayFarerV1?branch=dev)
[![Build Status](https://travis-ci.org/JosephNjuguna/WayFarerV1.svg?branch=dev)](https://travis-ci.org/JosephNjuguna/WayFarerV1)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9f4deb472db93aea9bc4/test_coverage)](https://codeclimate.com/github/JosephNjuguna/WayFarerV1/test_coverage)


## API ENDPOINTS

| Resource URL                     | Methods | Description                 |
| -------------------------------- | ------- | --------------------------- |
| /api/v1/signup                   | POST    | Create an account           |
| /api/v1/login                    | POST    | Login                       |
| /api/v1/trips                    | POST    | admin create trip           |
| /api/v1/trips/:id/cancel         | PATCH   | admin cancel trip           |
| /api/v1/trips                    | GET     | admin/user view all trips   |
| /api/v1/trips/:id                | GET     | admin/userview specific trip|
| /api/v1/origin/:route            | GET     | user filter trip by route   |
| /api/v1/destination/:route       | GET     | user filter trip by destination|
| /api/v1/bookings                 | POST    | user book a trip            |
| /api/v1/userbookings             | GET    | user view all his/her bookings|
| /api/v1/bookings                 | GET     | admin get all bookings      |
| /api/v1/bookings/:id             | DELETE  | user cancel his/her trip booking|

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

[WayFarer API Endpoints](https://v1wayfarer.herokuapp.com)

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
EMAIL = admin@wayfarer.com
PASSWORD = @12Admin
PORT = 3000
JWT_KEY= 'wayfarer@12'
```

## Run the server

```
$ npm start
```

## Run the test

```
$ npm test
```
# API ENDPOINTS DATA:
 use this data to test the api endpoint. feel free to change the data.
 
 **POST /api/v1/signup**
 ```
    firstname:Joe
    lastname:njuguna
    email:joe@gmail.com
    password:qwerQ@qwerre123
```

**POST /api/v1/login** (user)
```
email:joe@gmail.com
password:qwerQ@qwerre123
```

**POST /api/v1/login** (admin)
```
email:admin123@gmail.com
password:qwerQ@qwerre123
```
**POST /api/v1/trips**

-admin create trip
```
seatingCapacity:12
busLicensenumber:KRE 132
origin: KIGALI
destination : NAIROBI
tripDate:1/1/2019
fare:3000
```

**POST /api/v1/bookings**

-user book trip
```
tripId: 1
seatNumber: 12
```
**DELETE /api/v1/bookings/:id**
```
BOOKING ID
```

**Version 1.0.0**

## Contributor

- Joseph Njuguna <josephnjuguna482@gmail.com>

---