const port = 3000;

export default {
  fetch(req: Request) {
    console.log(req.url);
  },
  port,
};

console.log(`server is live at: http://localhost:${port}`);
