	const handleSignin = (db,bcrypt) =>(req,res) => {
    const {email, password} = req.body;

	if(!email || !password){
    	return	res.status(400).json('incorrect form submission');
	}

	db.select('email','hash').from('login')
		//.where('email', '=',req.body.email)
		.where('email', '=',email)
		.then(data =>{
			const isValid = bcrypt.compareSync(password, data[0].hash); // true
			//console.log(isValid);
			if(isValid){//we dont need to do transaction bcz we only check!!
			return	db.select('*').from('users')
					//.where('email', '=', req.body.email)
					.where('email', '=', email)
					.then(user =>{
						//console.log(user);
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unable to get user'))
				
			}//if
			else{
				res.status(400).json('wrong sign-in info!')
			}
			//bcrypt.compareSync(someOtherPlaintextPassword, hash); // false*/
		}) 
		.catch(err => res.status(400).json('wrong credentials'))

}


module.exports = {
	handleSignin: handleSignin
};