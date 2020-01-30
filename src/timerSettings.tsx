import React, { useState, Fragment } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/dayjs';
import Timer from './timer';

type Time = {
	minutes: number;
	seconds: number;
	totalSeconds: number;
	secondsElapsed: number;
};
export default function TimerSettings() {
	const classes = useStyles();
	const dateUtils = new DateFnsUtils();

	const [ready, setReady] = useState(false);
	const [prepTime, setPrepTime] = useState({
		minutes: 0,
		seconds: 10,
		totalSeconds: 10,
	});
	const [medTime, setMedTime] = useState({
		minutes: 10,
		seconds: 0,
		totalSeconds: 600,
	});

	const [intvlTime, setIntvlTime] = useState({
		minutes: 0,
		seconds: 0,
		totalSeconds: 0,
	});

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.checked) {
			setReady(true);
		} else {
			setReady(false);
		}
	}

	// called whenever prepare, meditation, or interval timers are changed by user
	// setTime is the function setPrepTime, setMedTime, or setIntvlTime
	function onValueChange(time: any, setTime: any) {
		const minutes = dateUtils.getMinutes(time);
		const seconds = dateUtils.getSeconds(time);
		const totalSeconds = minutes * 60 + seconds;
		setTime({
			minutes: minutes,
			seconds: seconds,
			totalSeconds: totalSeconds,
		});
	}

	return (
		<Fragment>
			<Grid item xs={12}>
				<Paper className={classes.paper} elevation={5}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<TimePicker
							className={classes.input}
							ampm={false}
							openTo='seconds'
							views={['minutes', 'seconds']}
							format='mm:ss'
							label='Prepare'
							disabled={ready}
							value={
								new Date(
									'August 19, 1975 00:' +
										prepTime.minutes +
										':' +
										prepTime.seconds
								)
							}
							onChange={e => {
								onValueChange(e, setPrepTime);
							}}
						/>
						<TimePicker
							className={classes.input}
							ampm={false}
							openTo='minutes'
							views={['minutes', 'seconds']}
							format='mm:ss'
							label='Meditation'
							disabled={ready}
							value={
								new Date(
									'August 19, 1975 00:' +
										medTime.minutes +
										':' +
										medTime.seconds
								)
							}
							onChange={e => {
								onValueChange(e, setMedTime);
							}}
						/>
						{/* <TimePicker
							className={classes.input}
							ampm={false}
							openTo='minutes'
							views={['minutes', 'seconds']}
							format='mm:ss'
							label='Interval'
							disabled={ready}
							value={
								new Date(
									'August 19, 1975 00:' +
										intvlTime.minutes +
										':' +
										intvlTime.seconds
								)
							}
							onChange={e => {
								onValueChange(e, setIntvlTime);
							}}
						/> */}
					</MuiPickersUtilsProvider>
					<FormControlLabel
						className={classes.lastInput}
						control={
							<Checkbox
								color='primary'
								checked={ready}
								disabled={ready}
								onChange={handleChange}
							/>
						}
						label='Ready'
						labelPlacement='start'
					/>
				</Paper>
			</Grid>
			{ready && (
				<Grid item xs>
					<Paper className={classes.paper} elevation={5}>
						<Timer
							prepTime={prepTime}
							medTime={medTime}
							setReady={setReady}
							// intvlTime={intervalTime}
						/>
					</Paper>
				</Grid>
			)}
		</Fragment>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		input: {
			marginRight: '5%',
			width: '25%',
			textAlign: 'center',
		},
		lastInput: {
			marginRight: 0,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	})
);
