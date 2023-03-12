const express = require('express');
const path = require('path');
const logger = require('morgan');
// cross origin access 
const cors = require('cors');
const bcrypt = require('bcrypt');

// MODELS //
const User = require('./models/user.js');
const Task = require('./models/task.js');
const Completed = require('./models/completed-task')

// const Category = require('./models/category')
// const Item = require('./models/item')
// const Order = require('./models/order')

const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./config/passport-config.js');


require('dotenv').config();
require('./config/database.js');

const app = express();

// access
app.use(cors({
    origin: "*"
}));

// logs the different requests to our server
app.use(logger('dev'))

//parse stringified objects (JSON)
app.use(express.json())


initializePassport(
    passport,
    // passport tells us that they want a function that will return the correct user given an email
    async email => {
        let user = User.findOne({ email: email })
        return user;
    },
    async id => {
        let user = User.findById(id);
        return user;
    },
);

app.use(session({
    secure: true,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { originalMaxAge: 3600000 }
}))


// server build folder
app.use(express.static(path.join(__dirname, 'build')));


app.get('/session-info', (req, res) => {
    res.json({
        session: req.session
    });
});


app.post('/users/signup', async (req, res) => {

    let hashedPassword = await bcrypt.hash(req.body.password, 10)

    // use User model to place user in the database
    let userFromCollection = await User.create({
        email: req.body.email,
        // name: req.body.name,
        password: hashedPassword
    })

    // sending user response after creation or login
    res.json("user created")
});


app.put('/users/login', async (req, res, next) => {
    console.log(req.body);
    // passport authentication
    passport.authenticate("local", (err, user, message) => {
        console.log(message);
        if (err) throw err;
        if (!user) {
            res.json({
                message: "login failed",
                user: false
            })
        } else {
            // delete user.password
            req.logIn(user, err => {
                if (err) throw err;
                res.json({
                    message: "successfully authenticated",
                    // remove user
                })
            })
        }
    })(req, res, next);
})

app.post('/add_task', async (req, res) => {
    console.log(req.body)
    let response = await Task.create({ title: req.body.userInput, user: req.body.userId })
    res.send("add task")
})

app.get('/get_task', async (req, res) => {
    let response = await Task.find({})
    res.send(response)
})
app.get('/get_completed_task', async (req, res) => {
    let response = await Completed.find({})
    res.send(response)
})



app.delete('/delete_task/:product_id', async (req, res) => {
    let response = await Task.findByIdAndDelete(req.params.product_id)

    res.send("delete task")
})

app.put('/update_task', async (req, res) => {
    res.send("update task")
})


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});







app.listen(5000, () => {
    console.log(`Server is Listening on 5000`)
});