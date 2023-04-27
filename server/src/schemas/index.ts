import { t } from "elysia";

const userDTO = t.Object({
  name: t.String(),
});

const roomMetaDTO = t.Object({
  id: t.String(),
  name: t.String(),
  userCount: t.Number(),
});

const messageDTO = t.Object({
  id: t.String(),
  author: t.String(),
  content: t.String(),
});

const roomDTO = t.Object({
  id: t.String(),
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
  id: t.String(),
});

export const roomSchema = {
  schema: {
    response: roomDTO,
    params: roomParamsDTO,
  },
};

export const wsBodyDTO = t.String();

export const wsParamsDTO = t.Object({
  roomId: t.String(),
});
