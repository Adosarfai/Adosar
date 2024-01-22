import { Signal, signal } from '@preact/signals-react';
import { Stomp } from '@stomp/stompjs';
import { Score } from '@classes/score.ts';
import { useEffect } from 'react';
import ScoreCard from '@components/ScoreCard.tsx';

const connected: Signal<boolean> = signal(false);
const messages: Signal<Score[]> = signal([]);

export default function Feed() {
	function onMessage(message: Score) {
		messages.value = [...messages.value, message];
	}

	function connect() {
		const StompClient = Stomp.over(new WebSocket('ws://localhost:8080/ws'));

		StompClient.onConnect = () => {
			connected.value = true;
			console.log(`Connected to ws`);
			StompClient.subscribe('/feed', message => {
				onMessage(JSON.parse(message.body));
			});
		};

		StompClient.onWebSocketError = error => {
			console.error('Error with websocket', error);
		};

		StompClient.onStompError = frame => {
			console.error('Broker reported error: ' + frame.headers['message']);
			console.error('Additional details: ' + frame.body);
		};

		StompClient.activate();
	}

	useEffect(() => {
		connect();
	}, []);

	return (
		<div className='w-full'>
			<h1 className='mx-auto w-fit'>New Scores</h1>
			<div className='flex justify-evenly'>
				{messages.value.map((score, i) => {
					return (
						<div key={i}>
							<ScoreCard
								userId={score.user.userId}
								replayId={score.replay.replayId}
								points={score.points}
								speed={score.speed}
								username={score.user.username}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
