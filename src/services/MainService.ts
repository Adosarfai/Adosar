import RequestService from '@services/RequestService.ts';

export default class MainService {
	static async getStatistics() {
		return RequestService.get<getStatisticsResponse>('/statistics', false);
	}
}
