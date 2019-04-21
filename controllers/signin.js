const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json('Incorrect form submission!');
	}
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid) {
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(error => res.status(400).json('Unable to get the user!'));
		} else {
			res.status(400).json('Wrong credentials!');
		}
	})
	.catch(error => res.status(400).json('Error! Wrong credentials!'));
}

module.exports = {
	handleSignin
};