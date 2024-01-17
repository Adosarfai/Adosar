import { signal } from '@preact/signals-react';
import Cookies from 'js-cookie';
import JwtService from '@services/JwtService.ts';
import { Jwt } from '@classes/jwt.ts';

export default abstract class State {
	public static loggedIn = Cookies.get('jwt') ? signal<boolean>(true) : signal<boolean>(false);

	public static jwt = State.loggedIn.value
		? signal<Jwt | undefined>(JwtService.parseJwt(Cookies.get('jwt')))
		: signal<Jwt | undefined>(undefined);

	public static userId = State.jwt.value
		? signal<number | undefined>(State.jwt.value.userId)
		: signal<number | undefined>(undefined);
}
