const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'a2c1a9dcff224e4db597a175901dc41a'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(error => res.status(400).json('Unable to work witk API!'));
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(error => res.status(400).json('Unable to get the entries!'));
}

module.exports = {
	handleImage,
	handleApiCall
};