import { Map } from '@classes/map';
import { User } from '@classes/user';
import { Replay } from '@classes/replay';

export class Score {
	scoreId: number;
	map: Map;
	user: User;
	replay: Replay;
	timeSet: Date;
	speed: number;
}
