import RequestService from './RequestService.ts';
import { Map } from '@classes/map';

export default class MapService {
	static getAllMaps(page: number = 0) {
		return RequestService.get<Map[]>(`/map/all/${page}`, true);
	}

	static getMapById(id: number) {
		return RequestService.get<Map>(`/map/${id}`, true);
	}

	static createNewMap(map: createNewMapRequest) {
		return RequestService.post<Map>('/map', map, true);
	}

	static getMapsByUser(id: number, page: number = 0) {
		return RequestService.get<Map[]>(`/map/user/${id}/${page}`, true);
	}

	static uploadMap(map: uploadMapRequest) {
		return RequestService.post<void>('/map/upload', map, true);
	}
}
