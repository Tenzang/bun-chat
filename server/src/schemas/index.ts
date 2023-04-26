import { t } from "elysia";

export const roomIndexSchema = {
	schema: {
		response: t.Array(
			t.Object({
				id: t.String(),
				name: t.String(),
				userCount: t.Number(),
			})
		),
	},
};
