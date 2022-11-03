# ecommerceapi
### Introduction
ecommerce API is the backbone of an ecommerce site I hope to build with a react front-end to ease purchases of products offered by various vendors in my small community.
### Project Support Features
* Users can signup and login to their accounts.
* Public (non-authenticated) users can access all products on the platform, and add then up on an order, to their cart.
* Public users will need to be authenticated to complete their order.
* Authenticated users can access all products as well as edit their profile.
### Installation Guide
* Clone this repository [here](https://github.com/wechu07/ecommerceapi.git).
* The master branch is the most stable branch at any given time, ensure you're working from it.
* Run npm install to install all dependencies
* Create an config/config.env file in your project root folder and add your variables. See sample.env for assistance.
* You can either work with the local MongoDB configuration,or the [cloud](https://cloud.mongodb.com/) option. Configure it and save the URI in the config/config.env file.
### Usage
* Run `npm run dev` to start the application.
* Connect to the API using Postman (or Hoppscotch, Thunderclient etc) on port 5000.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /api/auth/register | To register a new user account |
| POST | /api/auth/login | To login an existing user account |
| POST | /api/orders | To create a new order as a user |
| POST | /api/products | To add a new product as a admin |
| PUT | /api/users/:userId | To update user details |
| PUT | /api/products | To update product details as an admin |
| GET | /api/users | To retrieve all users as an admin |
| GET | /api/users/find/:userId | To retrieve details of a single user as an admin |
| GET | /api/users/stats| To retrieve all user stats on the platform as an admin |
| GET | /api/orders/income | To retrieve income stats as an admin |
| DELETE | /api/users/:userId  | To delete a single user |
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://expressjs.com/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.
* [JWT](https://jwt.io/) JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.
* [Stripe](https://stripe.com/) Stripe is a suite of APIs powering online payment processing and commerce solutions for internet businesses of all sizes.
* [CryptoJs](https://cryptojs.gitbook.io/) CryptoJS is a growing collection of standard and secure cryptographic algorithms implemented in JavaScript  using best practices and patterns. 
### Authors
* [Wechuli Simiyu](https://github.com/wechu07)
### License
This project is available for use under the MIT License.