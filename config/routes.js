const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('knex');

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

const { authenticate } = require('./middlewares');
const jwtKey = require('../_secrets/keys').jwtKey;

module.exports = server => {
  server.get('/', sayHello);
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function generateToken(user) {
  const payload = {
    username: user.username
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345'
  };
  return jwt.sign(payload, jwtKey, options);
}


function sayHello(req, res) {
  res.send('hello')
}


function register(req, res) {
  // implement user registration

  !req.body.username || !req.body.password ?
  res.status(400).json({message: 'You need a username AND password'})
  :
  null
  
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
  .insert(creds)
  .then(ids => {
    console.log(ids)
    const id = ids[0];

    db('users')
      .where({ id })
      .first()
      .then(user => {
        console.log(user)
        const token = generateToken(user);
        res.status(201).json({ user: user.username, token });
      })
      .catch(err => res.status(500).send('err 1'));
  })
  .catch(err => res.status(500).send('err 2'));
}


function login(req, res) {
  // implement user login

  !req.body.username || !req.body.password ?
  res.status(400).json({message: 'You need a username AND password'})
  :
  null

  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(err => res.status(500).send(err));
}


function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
