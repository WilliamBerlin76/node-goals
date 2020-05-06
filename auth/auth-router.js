const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require('../models/users-model');
const generateToken = require('./generateToken');

// REGISTER A NEW USER
router.post('/register', (req, res) => {
    const user = req.body;
    
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    user.password = hashedPassword;

    Users.add(user)
    .then(newUser => {
        const token = generateToken(newUser);
        res.status(201).json({ newUser, token })
    })
    .catch(err => {
        console.log('REGISTRATION ERROR', err)
        res.status(500).json({ error: 'the server could not add the user' })
    })
});


// LOGIN FOR EXISTING USER
router.post('/login', (req, res) => {
    let {username, password} = req.body;

    Users.findBy({ username })
        .first()
        .then(async user => {
            if( user && bcrypt.compareSync(password, user.password)) {
                const returnedUser = await Users.getById(user.id);
                const token = generateToken(user);

                res.status(200).json({ message: "You are logged in", user: returnedUser, token})
            } else {
                res.status(401).json({ message: 'The provided credentials are invalid' })
            }
        })
        .catch(err => {
            console.log('LOGIN ERROR', err);
            res.status(500).json({error: 'the server could not log you in'});
        });
});

// GET ALL USERS
router.get('/users', (req, res) => {
    Users.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log('GETTING USERS', err);
            res.status(500).json({ error: 'there was an error retrieving the users from the database'})
        })
})

module.exports = router;