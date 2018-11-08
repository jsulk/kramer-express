const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
	const users = [
		{id:1, username:'DKSchrute'},
		{id:2, username:'MGScott'}
	];

	res.json(users);
});

//Set port for where to run server
const port = 3001;

app.listen(port, () => console.log('Server started on port ' + port));