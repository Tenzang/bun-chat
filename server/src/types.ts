export interface Message {
	id: number;
	author: string;
	content: string;
}

export interface Users {
	[key: string]: {
		name: string;
		ws: any;
	};
}
