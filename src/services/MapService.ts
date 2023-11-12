import RequestService from './RequestService.ts';
import { Map } from '@classes/map';

export default class MapService {
	static async getAllMaps(page = 0) {
		return await RequestService.get<Map[]>(`/all/${page}`, false);
	}

	static async getMapById(id: number) {
		return await RequestService.get<Map>(`/${id}`, false);
	}

	static async createNewMap(map: createNewMapRequest) {
		return await RequestService.post<Map>('/', map, true);
	}

	static async uploadMap(map: uploadMapRequest) {
		return await RequestService.post<void>('/upload', map, true);
	}
}
