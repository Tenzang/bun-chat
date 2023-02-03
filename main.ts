import { Router } from "./Router/Router";

console.log("Starting server...");

const port = 3000;
const { response } = new Router()
  .static("./public")
  .notFound(() => "404, not found")
  .route("GET", "/", () => {
    return "index reached";
  });

export default {
  fetch: response,
  port,
};

console.log(`server is live at: http://localhost:${port}`);
