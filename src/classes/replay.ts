export interface Replay extends Requestable {
	replayId: number;
	timings: number[];
	pauses: number[];
}
