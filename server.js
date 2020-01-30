const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

app.get('/api', (req, res) => {
	res.send('An alligator approaches!');
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(9000, () => console.log('Gator app listening on port 9000!'));
