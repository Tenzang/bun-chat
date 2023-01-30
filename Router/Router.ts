import { file } from "bun";
import { Method, Routes, TypedRequest } from "./types";

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
      this.routes[method].set(endpoint, callback);
    } catch (TypeError) {
      throw `Invalid method, "${method}"`;
    }
  }

  notFound(errorCallback: () => BodyInit) {
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
