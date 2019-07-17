const handleProfileGet = (req,res, db) =>{
	const {id} = req.params;//destructuring

	db.select('*').from('users').where({
		//id:id
		id
	})
	.then(user=>{
		//console.log(user);
		if(user.length){
			res.json(user[0])
		}else{
			res.status(400).json('Not Found!!')
		}
	})
	.catch(err => res.status(400).json('error getting user'))
}

module.exports = {
	//handleProfileGet: handleProfileGet
	handleProfileGet
};