import { HTMLProps } from 'react';
import { Score } from '@classes/score';

interface props extends HTMLProps<HTMLDivElement> {
	scores: Score[];
}

export default function List(props: props) {
	return (
		<div className={props.className}>
			{props.scores.map((score, index) => (
				<div className='flex gap-4' key={index}>
					<h1>{score.user.username}</h1>
				</div>
			))}
		</div>
	);
}
