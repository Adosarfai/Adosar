import { Privilege } from '@classes/privilege';
import { Badge } from '@classes/badge.ts';

export interface User {
	userId: number;
	username: string;
	description: string;
	privilege: Privilege;
	creationDate: string;
	badges: Badge[];
}
