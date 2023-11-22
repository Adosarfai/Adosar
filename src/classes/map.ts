import { User } from '@classes/user';
import { Removed } from '@classes/removed';

export interface Map extends Requestable {
	mapId: number;
	user: User;
	title: string;
	artist: string;
	published: boolean;
	removed: Removed;
	removalReason: string;
	creationDate: Date;
	lastUpdate: Date;
}
