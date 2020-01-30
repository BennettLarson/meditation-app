const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongo = require('mongoose');
const schema = require('./schema.js');
const path = require('path');
const cors = require('cors');

const app = express();

mongo.connect('mongodb://localhost:27017/admin', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongo.connection.once('open', () => {
	console.log('connected to db!');
});

app.use(cors()); // for dev only

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

// // Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/build')));

// // Handles any requests that don't match the ones above
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(9000, () => {
	console.log('App listening on port 9000');
});
