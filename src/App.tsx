import React from 'react';
import Navbar from './navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Login from './login';

export default function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}
