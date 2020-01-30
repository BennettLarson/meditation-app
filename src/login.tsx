import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { TextField, Button } from '@material-ui/core';
import { users } from './users';
import { useHistory } from 'react-router-dom';

type User = {
	username: string;
	password: string;
};

export default function Login() {
	const classes = useStyles();
	const history = useHistory();
	var timeout: number = 0;
	const [possibleUser, setPossibleUser] = React.useState({
		username: '',
		password: '',
		name: '',
		loggedIn: false,
	});
	function handleSubmit(event: any) {
		event.preventDefault();
		const userMatch = users.find(
			user => user.username === possibleUser.username
		);
		if (userMatch && userMatch.password === possibleUser.password) {
			history.push('/');
		}
	}

	function nameChange(e: any) {
		e.preventDefault();
		clearTimeout(timeout);
		var name = e.target.value;
		timeout = setTimeout(() => {
			console.log('name: ' + name);
			setPossibleUser({
				username: name,
				password: possibleUser.password,
				name: possibleUser.name,
				loggedIn: possibleUser.loggedIn,
			});
		}, 250);
	}

	function passChange(e: any) {
		e.preventDefault();
		clearTimeout(timeout);
		var pass = e.target.value;

		timeout = setTimeout(() => {
			console.log('pass: ' + pass);
			setPossibleUser({
				username: possibleUser.username,
				password: pass,
				name: possibleUser.name,
				loggedIn: possibleUser.loggedIn,
			});
		}, 250);
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs>
					<Paper className={classes.paper}>
						<form autoComplete='off' onSubmit={handleSubmit}>
							<div className={classes.section}>
								<TextField
									id='username'
									label='Username'
									onChange={nameChange}
								/>
							</div>
							<div className={classes.section}>
								<TextField
									id='password'
									label='Password'
									onChange={passChange}
								/>
							</div>
							<div className={classes.section}>
								<Button
									variant='contained'
									color='primary'
									type='submit'
								>
									Login
								</Button>
							</div>
						</form>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			marginTop: theme.spacing(5),
			marginLeft: '25%',
			marginRight: '25%',
			// width: '25%',
		},
		section: {
			marginTop: theme.spacing(4),
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	})
);
