
const Clarifai = require('clarifai'); 
//you must add your own API key here from Clarifai
const app=new Clarifai.App({
  apiKey: 'a878203ad43043b8a7e1b84a1daa0beb'
});


const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req,res, db)=> {
	const {id} = req.body;
	 db('users').where('id', '=', id)
 	 .increment('entries',1)
 	 .returning('entries')
 	 .then(entries =>{
 	 	//console.log(entries);
 	 	res.json(entries[0]);
 	 })
 	 .catch(err => res.status(400).json('unable to get entries'))
  
}

module.exports = {
	//handleProfileGet: handleProfileGet
	handleImage,  
	handleApiCall
};