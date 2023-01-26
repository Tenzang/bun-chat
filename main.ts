import { Router } from './Router/Router';

console.log('Starting server...')

const port = 3000;
const router = new Router();

export default {
  fetch(req: Request) {
    router.route('GET', '/', () => {
      return 'index reached'
    });

    router.notFound = () => "404, not found";

    return router.response(req);
  },
  port,
};

console.log(`server is live at: http://localhost:${port}`);
