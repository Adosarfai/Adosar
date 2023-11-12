import RequestService from '@services/RequestService.ts';

export default class MainService {
	static async getStatistics() {
		return await RequestService.get<getStatisticsResponse>(
			'/statistics',
			false
		);
	}
}
