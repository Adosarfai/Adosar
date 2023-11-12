import { User } from '@classes/user';
import { Removed } from '@classes/removed';

export class Map {
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
