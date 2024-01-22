import RequestService from './RequestService.ts';
import { Map } from '@classes/map';

export default class MapService {
	static getAllMaps(page: number = 0) {
		return RequestService.get<Map[]>(`/map/all/${page}`, false);
	}

	static getAllMapsWithPartialData(page: number, title?: string, creationDate?: string) {
		let query = '';
		if (title) query += `username=${title}&`;
		if (creationDate) query += `creationdate=${creationDate}&`;
		return RequestService.get<Map[]>(`/map/query/${page}?${query}`, false);
	}

	static getMapById(id: number) {
		return RequestService.get<Map>(`/map/${id}`, false);
	}

	static createNewMap(map: createNewMapRequest) {
		return RequestService.post<Map>('/map', map, true);
	}

	static getMapsByUser(id: number, page: number = 0) {
		return RequestService.get<Map[]>(`/map/user/${id}/${page}`, false);
	}

	static uploadMap(file: uploadMapRequest) {
		const formData = new FormData();
		formData.append('file', file.file);
		formData.append('mapId', file.mapId.toString());
		return RequestService.postMultipart<void>('/map/upload', formData, true);
	}

	static getMostPopularMap() {
		return RequestService.get<Map>('/map/popular/2024-01-12', false);
	}
}
