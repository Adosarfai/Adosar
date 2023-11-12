import { Privilege } from '@classes/privilege';

export class User {
	userId: number;
	username: string;
	email: string;
	password: string;
	privilege: Privilege;
	creationDate: Date;
}
