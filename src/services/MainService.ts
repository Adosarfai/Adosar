import RequestService from '@services/RequestService.ts';

export default class MainService {
	static getStatistics() {
		return RequestService.get<getStatisticsResponse>('/statistics', false);
	}
}
