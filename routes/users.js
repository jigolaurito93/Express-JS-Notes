// Static routes should always be above dynamic routes
// Middleware is a code that runs between the starting of the request and the ending of the request


// Require the express library we just downloaded.
const express = require('express');

// Create a router/instance for our app.
const router = express.Router();

// If you want to use a function for all routers. specifically "logger function"
router.use(logger)

router.get('/',(req, res) => {
    console.log(req.query.name)
    res.send('User List')
});

router.get('/new', (req, res) => {
      res.render("users/new", { firstName: "Test" })
 });

//  Create a new user
// User middleware to access the body. Set it up on server.js
router.post('/', (req, res) => {
    const isValid = true
    // if this is a valid request, we want to create a new user
    if (isValid) {  
    // firstname is coming from req.body.firstname
       users.push({ firstName: req.body.firstName }) 
    // redirect user to the GET page that was just created
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log('Error')
        res.render('users/new', { firstName: req.body.firstName })
    }
    console.log(req.body.firstName)
    res.send('Hi')
})



// router.route function is used to compile all your .get, .put, .delete etc. routes into a single function.
// It's also used to avoid duplicate route naming as well as typing errors. 
router
.route('/:id')
// Access an individual user based on their ID.
// Since we dont know the ID of the user, we can just use the :id    
.get((req,res) => {
    console.log(req.user)
    // In order to access this "id" parameter, we use "req.params.id" since you used the name "id" as the parameter name.
    res.send(`Get User with ID ${req.params.id}`)
})
.put((req,res) => {
    // In order to access this "id" parameter, we use "req.params.id" since you used the name "id" as the parameter name.
    // To update a user using ID
    res.send(`Update User with ID ${req.params.id}`)
})
.delete((req,res) => {
    // In order to access this "id" parameter, we use "req.params.id" since you used the name "id" as the parameter name.
    // Delete a user using ID
    res.send(`Delete User with ID ${req.params.id}`)
})

// Access an individual user based on their ID.
// Since we dont know the ID of the user, we can just use the :id    
// router.get('/:id', (req,res) => {
//     // In order to access this "id" parameter, we use "req.params.id" since you used the name "id" as the parameter name.
//     res.send(`Get User with ID ${req.params.id}`)
// })

// router.put('/:id', (req,res) => {
//     // In order to access this "id" parameter, we use "req.params.id" since you used the name "id" as the parameter name.
//     res.send(`Update User with ID ${req.params.id}`)
// })

// router.delete('/:id', (req,res) => {
//     // In order to access this "id" parameter, we use "req.params.id" since you used the name "id" as the parameter name.
//     res.send(`Delete User with ID ${req.params.id}`)
// })

const users = [{ name: "John" }, { name: "Jane" }];
// This function is going to run anytime it finds a param that matches a name you pass in.
// When "next" function is ran, it will run the next function in line.
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})

// This is a middleware function. Takes in a request and a response and next. You can use it as a parameter for your routes
function logger(req, res, next) {
    console.log(req.originalUrl)
    next();
}

// Export the router for our app to use.
module.exports = router;