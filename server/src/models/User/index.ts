import { nameGenerator } from "../../helpers/nameGenerator";
import IdHandler from "../IdHandler";

export default class User {
	static #idHandler = new IdHandler();

	id: number;
	name: string;

	constructor() {
		this.id = User.#idHandler.generateId();
		this.name = nameGenerator();
	}
}
