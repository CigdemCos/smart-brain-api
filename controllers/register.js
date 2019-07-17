const saltRounds = 10;
const handleRegister = (req,res, db, bcrypt) => {
	const {email, name, password} = req.body;
	if(!email || !name || !password){
	return	res.status(400).json('incorrect form submission');//in order to end execution within a func. we have to say return!
	
	}


//synchronous
const hash = bcrypt.hashSync(password, saltRounds);// Store hash in your password DB.

	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{

			//return db('users')
			return trx('users')
			.returning('*')
			.insert({
			//email: email,
			//email:loginEmail,
			email:loginEmail[0],
			name: name,
			joined: new Date()
			})
			/*.then(response => {
				res.json(response); 
				})*/
			.then(user => {
				res.json(user[0]); 
				})

		})//LoginEmail
		.then(trx.commit)
		.catch(trx.rollback)
	})//db.transaction

	.catch(err => res.status(400).json('unable to register'))	
}

module.exports = {
	handleRegister: handleRegister
};