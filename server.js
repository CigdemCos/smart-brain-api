const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const knex=require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
  client: 'pg',
  connection: {
   // host : '127.0.0.1',
   host: 'postgresql-round-32228',
   // port: 'port_number_of_database',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res)=> {
	//res.send('this is working');
	//res.send(database.users);
//console.log("it is working!")
  res.send(db.users)
  
})

app.post('/signin', signin.handleSignin(db, bcrypt))//signin
app.post('/register', (req, res) => {register.handleRegister(req,res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})//profile
app.put('/image', (req, res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req,res)})


/*app.listen(3000, () =>{
	console.log('app is running on port 3000')
})*/

app.listen(process.env.PORT || 3000, () =>{
  //console.log('app is running on port 3000')
   console.log(`app is running on port ${process.env.PORT}`)
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/