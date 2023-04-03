export default class IdHandler {
	prevId: number = 0;

	generateId() {
		return this.prevId++;
	}
}
