import { Router } from "./Router/Router";

console.log("Starting server...");

const port = 3000;
const router = new Router();

router.static("./public");

router.route("GET", "/", () => {
  return "index reached";
});

router.route("GET", "/ayyy", async () => "ayyy");

router.notFound(() => "404, not found");

export default {
  fetch: router.response,
  port,
};

console.log(`server is live at: http://localhost:${port}`);
