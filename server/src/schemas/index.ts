import { t } from "elysia";

const userDTO = t.Object({
	name: t.String(),
});

const roomMetaDTO = t.Object({
	id: t.Number(),
	name: t.String(),
	userCount: t.Number(),
});

const messageDTO = t.Object({
	id: t.Number(),
	author: t.String(),
	content: t.String(),
});

const roomDTO = t.Object({
	id: t.Number(),
	name: t.String(),
	messages: t.Array(messageDTO),
	users: t.Array(userDTO),
});

export const roomIndexSchema = {
	schema: {
		response: t.Array(roomMetaDTO),
	},
};

const roomParamsDTO = t.Object({
	id: t.Number({}),
});

export const roomSchema = {
	schema: {
		response: roomDTO,
		params: roomParamsDTO,
	},
};
