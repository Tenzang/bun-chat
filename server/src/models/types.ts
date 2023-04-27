import { ElysiaWS, ElysiaWSContext } from "elysia/src/ws";
import { wsBodyDTO, wsParamsDTO } from "../schemas";
export type WSType = ElysiaWS<
  ElysiaWSContext<
    { body: typeof wsBodyDTO; params: typeof wsParamsDTO },
    "/ws/:roomId"
  >,
  {},
  {}
>;
