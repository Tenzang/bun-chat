import ejs from "ejs";
import { Router } from "./Router/Router";

console.log("Starting server...");

const port = 3000;
const router = new Router();

// config
router.static("./public");
router.notFound(() => "404, not found");

router.route("GET", "/", () => ejs.renderFile("./views/home.ejs"));

export default {
  fetch: router.response,
  port,
};

console.log(`server is live at: http://localhost:${port}`);
