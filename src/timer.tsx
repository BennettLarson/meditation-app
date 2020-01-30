import React, { Fragment } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import useSimpleAudio from 'use-simple-audio';
type TimerProps = {
	prepTime: Time;
	setReady: any;
	medTime: Time;
	// intvlTime: Date;
};

type Time = {
	minutes: number;
	seconds: number;
	totalSeconds: number;
};

export default function Timer(props: TimerProps) {
	const classes = useStyles();
	const { play, pause, stop } = useSimpleAudio('/singing_bowl.mp3', false);
	const [sound, setSound] = React.useState({
		started: false,
		interrupted: false,
		finished: false,
		duration: 12,
	});

	const [prepTime, setPrepTime] = React.useState(props.prepTime);
	// const [prepDone, setPrepDone] = React.useState(false);

	const [medTime, setMedTime] = React.useState(props.medTime);

	const [timerPause, setTimerPause] = React.useState(true);

	const [secondsElapsed, setSecondsElapsed] = React.useState(0);

	React.useEffect(() => {
		if (timerPause) {
			return;
		}
		const interval = setInterval(() => {
			if (prepTime.minutes + prepTime.seconds > 0) {
				// if the prep timer is set, decrement it
				decrementClock(prepTime, setPrepTime);
			} else if (medTime.minutes + medTime.seconds > 0) {
				// if the prep timer is set, decrement it
				decrementClock(medTime, setMedTime);
			} else {
				setTimerPause(true);
				play();
			}
		}, 1000);
		return () => clearInterval(interval);
	});

	function decrementClock(time: Time, setTime: any) {
		// if (!timerPause) {
		if (time.seconds > 0) {
			setTime((current: Time) => ({
				...current,
				seconds: time.seconds - 1,
			}));
		} else if (time.minutes > 0) {
			setTime((current: Time) => ({
				...current,
				minutes: time.minutes - 1,
				seconds: 59,
			}));
		}
		updateSecondsElapsed(secondsElapsed + 1);
		// }
	}

	function updateSecondsElapsed(elapsed: number) {
		setSecondsElapsed(elapsed);

		// if all prep time has passed, play sound
		if (elapsed >= prepTime.totalSeconds && !sound.started) {
			setSound(current => ({
				...current,
				started: true,
			}));
			play();
		}

		// once prepTime and sound duration is expired, the sound is finished
		if (elapsed >= prepTime.totalSeconds + sound.duration) {
			setSound(current => ({
				...current,
				finished: true,
			}));
		}
	}

	function displayClock(min: number, sec: number) {
		return (
			(min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)
		);
	}

	// pause button clicked
	function onPauseClicked() {
		// pause timer
		setTimerPause(true);
		if (sound.started && !sound.finished) {
			// if sound previously started and hasn't finished
			// pause it and mark as interrupted
			pause();
			setSound(current => ({
				...current,
				interrupted: true,
			}));
		}
	}

	// start button clicked
	function onStartClicked() {
		// if sound has been interrupted and the timer since unpaused, play sound
		if (sound.interrupted) {
			play();
			setSound(current => ({
				...current,
				interrupted: false,
			}));
		}
		// unpause timer
		setTimerPause(false);
	}

	// stop button clicked
	function onStopClicked() {
		// no longer ready, back to settings
		props.setReady(false);
		// stop sound
		stop();
	}

	// reset button clicked
	function onResetClicked() {
		// reset prep time
		setPrepTime(props.prepTime);
		// reset med time
		setMedTime(props.medTime);
		// stop sound & reset sound info
		stop();
		setSound({
			started: false,
			interrupted: false,
			finished: false,
			duration: 12,
		});
		// reset seconds elapsed counter
		updateSecondsElapsed(0);
	}

	return (
		<Fragment>
			<Button
				variant='contained'
				color='secondary'
				onClick={onStopClicked}
			>
				Stop
			</Button>
			<Button
				className={classes.marginLeft}
				variant='contained'
				color='primary'
				onClick={!timerPause ? onPauseClicked : onStartClicked}
			>
				{!timerPause ? 'Pause' : 'Start'}
			</Button>
			{/* <Button
				variant='contained'
				color='secondary'
				onClick={onResetClicked}
			>
				Reset
			</Button> */}
			{secondsElapsed < prepTime.totalSeconds ? (
				<h2 className={classes.clock}>
					{displayClock(prepTime.minutes, prepTime.seconds)}
				</h2>
			) : (
				<h2 className={classes.clock}>
					{displayClock(medTime.minutes, medTime.seconds)}
				</h2>
			)}
		</Fragment>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		clock: {
			fontSize: '500%',
		},
		marginLeft: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
		},
	})
);
