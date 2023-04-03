import { nameGenerator } from "../../helpers";
import { WSType } from "../types";

export default class User {
	name: string;
	ws: WSType;

	constructor(ws: WSType) {
		this.name = nameGenerator();
		this.ws = ws;
	}
}
