// Requires
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Startup Constants
const app = express();
const port = 8000;

// app.use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// ----- Code Start ------ //
app.get('/', (req, res) => res.send('Welcome to the Cookie Challenge. Please GET to /login?username= and add your username.'));

app.get('/login', (req, res) => {
    if(req.query.username){
        res.cookie('username',req.query.username);
        res.send('Navigate to /hello !');
    }
});

app.get('/hello', (req, res) => {
    if(req.cookies.username){
        let user = req.cookies.username;
        res.send(`Welcome ${user}!`);
    }
});

app.get('/goodbye', (req, res) => {
    if(req.cookies.username){
        let user = req.cookies.username;
        res.clearCookie('username');
        res.send(`Goodbye ${user}!`);
    } else {
        res.send('But you never logged in!');
    }
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
