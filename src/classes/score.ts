import { Map } from '@classes/map';
import { User } from '@classes/user';
import { Replay } from '@classes/replay';

export interface Score {
	scoreId: number;
	map: Map;
	user: User;
	replay: Replay;
	timeSet: Date;
	speed: number;
}
