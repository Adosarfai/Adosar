import { Privilege } from '@classes/privilege';

export interface Jwt {
	userId: number;
	privilege: Privilege;
}
