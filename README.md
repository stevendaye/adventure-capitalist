# Adventure Capitalist | Clone of the Adventure Capitalist Game
Adventure Capitalist is an idle business sim-game. The basic idea behind the game is to purchase a business, win capital from that business, upgrade the business and then purchase more businesses.

In order to automate this, you can hire a manager who can run the business for you, so you don’t have to click manually anymore. Then you can upgrade the business and gain even more money.

The version of the game implemented here is a clone of the Adventure Capitalist game. So, this is a basic gameplay with upgrading businesses and hiring managers. The game can be accessed at https://adventure-capitalist.herokuapp.com.

## The Problem
...

## The Solution
...

This solution focuses on Full Stack Developement. This is a fullstack game built around carefully chosen technologies to make scaling easy.

### Main JavaScript Dialect
- ES6+

### JavaScript Stack
- Front End
 - React.js
 - React Router
 - Redux
 - Redux Thunk

- Back End
 - Node.js
 - Express.js
 - Restify.js | To create production ready APIs
 - SQLite3 | To persist the gaming platform's and user's data into a light and portable database
 - Sequelize
 - JSONWebTokens

### Architecture
- Model-View-Controller
- Microservice
 - Users (AuthNet | **Authentication Network** service)
 - Paltfrom (FrontNet | **Front End Network** service)

## Reasons behind technical and architectural choices
- Using **ES6+**, we can lavarage latest and advanced JavaScript features. This helps the code to be more declaritive, readable and maintainaable.
- Seeing the design of the gane and its complexity, I prefer over everything else the **React.js**, **Redux** and **React Router** library. These, allow me build a performant game application, ease my development and workflow using *Reusable and Composable Compoments*, help me manage the *state* efficiently making sure the code is more predictable, help avoid passing down props to deep nested compoments and most importantly help render fast.
- 