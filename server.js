// This is where you put all your server code.

// Require the express library we just downloaded.
const express = require('express');

// To set up entire server
const app = express();

// We want to use a middleware called express.static function. 
// Takes the name of the folder where the static files are located.
app.use(express.static("public"))
// Allows us to access informations coming from forms. 
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Tell the application to use the view engine 'ejs'
// First parameter is the name of the setting "view engine". Second parameter is the engine we want to use. "ejs"
app.set('view engine', 'ejs');

// This will be your bread and butter for your code and set up different routes.
// Call different methods, such as GET, POST, PUT, DELETE, and so on.
// GET request for URL at "/"  . First parameter youre passing is going to be the path. "root path"
// Second parameter is going to be the callback function. It takes 3 different parameters.
// First is request "req", second is response "res" and third is next "next".
// Run code everytime you access "/' URL.
// app.get('/', logger, (req, res) => {
//     // render a file and pass in the file you want to render "index.ejs"
//     // You can also pass in a second parameter, such as object, so you can use in index.ejs
//     res.render('index', {name: 'Jose'})
//             // Pass in an HTTP status code. "500" is internal server error.
//     // res.sendStatus(500);
//            // or send status and a message.
//     // res.status(500).json({ message: "Error" });       
//             // send() is a method that sends a response back to the client. send() isnt going to be used very often. Its used just to make sure it works.
//     // res.send('Hi')
//            // Makes it downloadable as a static file.
//     // res.download("server.js")
// })

// Router is a method for you to create another instance of your application that its own mini application.
// Connected to users.js 
const userRouter = require("./routes/users");

// Linking our route to a particular path which it the one above this, "userRouter". It starts with /users now.
app.use("/users", userRouter);

// This is a middleware function. Takes in a request and a response and next. You can use it as a parameter for your routes
function logger(req, res, next) {
    console.log(req.originalUrl)
    next();
}

// Pass in port number (3000) to listen for requests
app.listen(3000)

// "Cannot GET /" means that you application doesnt have a route for it.


