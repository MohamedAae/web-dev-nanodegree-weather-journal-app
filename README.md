# **Weather-Journal App Project**

### Overview &mdash;
An asynchronous web app that uses [OpenWeather](https://openweathermap.org/) API to retrieve today's temperature based on the zip code provided by the user.  
This project is a part of my **Udacity Web Development Nano-degree scholarship**, powered by **ITIDA**.
***
### Strategy &mdash;
I've followed the recommended project development strategy, a simple yet efficient one.
- Setting up a node environment using express, cors, and body-parser.
- Fetching the OpenWeatherMap API and get the returned temperature.
- Creating POST function on the client-side `app.js` to post the user input and returned temperature to the app endpoint `projectData` in the server-side `server.js`.
- Updating the UI via a GET function that retrieves the `projectData` from the server.
***
### Technical &mdash;
#### Server-Side :
- Server-Side code can be found in `server.js`.
- `express`, `cors`, and `body-parser` are required.
- The application sever runs at `localhost:8080`.
- `/userInput` is used for the POST route, while the `/getUserData` is used for the GET route.
- `projectData` abject is acting as an endpoint for the application.
#### Client-Side:
- Client-Side can be found in `website/app.js`.
- Event listener added to the button to call promises chain `clickChain()` if the user inputs are valid.
- Validate the zip code using a regex expression, conditional argument, and API response code.
