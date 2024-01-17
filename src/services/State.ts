import { Signal, signal } from '@preact/signals-react';
import Cookies from 'js-cookie';
import JwtService from '@services/JwtService.ts';
import { Jwt } from '@classes/jwt.ts';
import { Privilege } from '@classes/privilege';

class State {
	public loggedIn: Signal<boolean>;

	public jwt: Signal<Jwt | undefined>;

	public userId: Signal<number | undefined>;

	public privilege: Signal<Privilege | undefined>;

	constructor() {
		const jwt = Cookies.get('jwt') ?? localStorage.getItem('jwt') ?? undefined;

		this.loggedIn = jwt ? signal<boolean>(true) : signal<boolean>(false);

		this.jwt = this.loggedIn.value
			? signal<Jwt | undefined>(JwtService.parseJwt(jwt))
			: signal<Jwt | undefined>(undefined);

		this.userId = this.jwt.value
			? signal<number | undefined>(this.jwt.value.userId)
			: signal<number | undefined>(undefined);

		this.privilege = this.jwt.value
			? signal<Privilege | undefined>(this.jwt.value.privilege)
			: signal<Privilege | undefined>(undefined);
	}
}

export default new State();
