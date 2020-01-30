import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TimerSettings from './timerSettings';
import { useParams } from 'react-router-dom';

export default function Home() {
	const classes = useStyles();
	const { name } = useParams();
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={5}>
						<h2>{name ? name : 'User A'}</h2>
						<h3 className={classes.online}>Online</h3>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper} elevation={5}>
						<h2>User B</h2>
						<h3 className={classes.offline}>Offline</h3>
					</Paper>
				</Grid>
				<TimerSettings />
			</Grid>
		</div>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			marginTop: theme.spacing(5),
			marginLeft: theme.spacing(3),
			marginRight: theme.spacing(3),
		},
		online: {
			color: 'green',
		},
		offline: {
			color: 'red',
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
			elevation: 5,
		},
	})
);
