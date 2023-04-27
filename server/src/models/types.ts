import { ElysiaWS, ElysiaWSContext } from "elysia/src/ws";

export type WSType = ElysiaWS<ElysiaWSContext<{}, "/ws/:roomId">, {}, {}>;
