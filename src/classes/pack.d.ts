import { User } from '@classes/user';
import { Removed } from '@classes/removed';
import { Map } from '@classes/map';

export class Pack {
	packId: number;
	user: User;
	title: string;
	published: boolean;
	removed: Removed;
	removalReason: string;
	maps: Map[];
}
