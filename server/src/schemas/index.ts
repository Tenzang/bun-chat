import { t } from "elysia";

export const roomIndexSchema = {
	schema: {
		response: t.Array(
			t.Object({
				id: t.Number(),
				name: t.String(),
				userCount: t.Number(),
			})
		),
	},
};
