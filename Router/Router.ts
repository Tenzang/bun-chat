import { file } from "bun";

type Endpoints = Map<string, Response>;

export type Method = keyof Routes;

interface Routes {
  GET: Endpoints;
  POST: Endpoints;
  PUT: Endpoints;
  PATCH: Endpoints;
  DELETE: Endpoints;
}

export class Router {
  routes: Routes;
  #notFound: Response;
  #static: string;
  static #staticExt = new Set(["js", "html"]);

  constructor() {
    this.routes = {
      GET: new Map(),
      POST: new Map(),
      PUT: new Map(),
      PATCH: new Map(),
      DELETE: new Map(),
    };
  }

  route(method: Method, endpoint: string, callback: () => any) {
    try {
      this.routes[method].set(endpoint, new Response(callback()));
    } catch (TypeError) {
      throw `Invalid method, "${method}"`;
    }
  }

  set notFound(errorCallback: () => BodyInit) {
    this.#notFound = new Response(errorCallback(), { status: 404 });
  }

  response({ method, url }: Request) {
    const { pathname } = new URL(url);
    const [fileName, ext] = pathname.split("/").pop().split(".");

    if (ext && Router.#staticExt.has(ext)) {
      const resource = file(`${this.#static}${pathname}`);

      // TODO: properly check if file exists before serving
      if (resource) return new Response(resource);

      return new Response("Resource not found", { status: 404 });
    }

    const registeredPaths = this.routes[method];

    if (registeredPaths.has(pathname)) return registeredPaths.get(pathname);

    return this.#notFound;
  }

  static(dirPath: string) {
    this.#static = dirPath;
  }
}
