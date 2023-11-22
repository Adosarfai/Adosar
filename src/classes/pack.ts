import { User } from '@classes/user';
import { Removed } from '@classes/removed';
import { Map } from '@classes/map';

export interface Pack extends Requestable {
	packId: number;
	user: User;
	title: string;
	published: boolean;
	removed: Removed;
	removalReason: string;
	maps: Map[];
}
