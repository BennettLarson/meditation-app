import React from 'react';
import Navbar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Login from './login';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
	uri: 'http://localhost:9000/graphql',
});

export default function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Navbar />
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/:name?'>
						{' '}
						{/* change this from :name to :id once i cache the graphql queries */}
						<Home />
					</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	);
}
