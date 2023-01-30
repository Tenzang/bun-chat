import { file } from "bun";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Endpoints = Map<string, () => any>;

type Routes = {
  [key in Method]: Endpoints;
};

export interface TypedRequest extends Request {
  method: Method;
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

    this.response = this.response.bind(this);
  }

  route(method: Method, endpoint: string, callback: () => any) {
    try {
      this.routes[method].set(endpoint, callback);
    } catch (TypeError) {
      throw `Invalid method, "${method}"`;
    }
  }

  set notFound(errorCallback: () => BodyInit) {
    this.#notFound = new Response(errorCallback(), { status: 404 });
  }

  async response({ method, url }: TypedRequest) {
    const { pathname } = new URL(url);
    const [, ext] = pathname.split("/").pop().split(".");

    if (ext && Router.#staticExt.has(ext)) {
      const filePath = `${this.#static}${pathname}`;
      const resource = file(filePath);
      if (resource.size) return new Response(await resource);
    }

    const registeredPaths = this.routes[method];

    if (registeredPaths.has(pathname)) {
      const body = await registeredPaths.get(pathname)();

      return new Response(body);
    }

    return this.#notFound;
  }

  static(dirPath: string) {
    this.#static = dirPath;
  }
}
