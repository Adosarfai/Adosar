import RequestService from './RequestService.ts';
import { Score } from '@classes/score.ts';

export default class ScoreService {
	static getAllScores(page: number = 0) {
		return RequestService.get<Score[]>(`/score/all/${page}`, true);
	}

	static getScoreById(id: number) {
		return RequestService.get<Score>(`/score/${id}`, true);
	}

	static getScoresByMapId(id: number, page: number = 0) {
		return RequestService.get<Score[]>(`/score/map/${id}/${page}`, true);
	}
}
