import { Router } from "./Router/Router";

console.log("Starting server...");

const port = 3000;
const { fetch } = new Router()
  .static("./public")
  .notFound(() => "404, not found")
  .route("GET", "/", () => {
    return "index reached";
  });

export default {
  fetch,
  port,
};

console.log(`server is live at: http://localhost:${port}`);
