import { describe, expect, it, beforeEach } from "bun:test";
import { Router } from "./Router";

const endpoint = "/";

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = new Router();
  });

  it("exists.", () => {
    expect(router).toBeDefined();
  });

  describe(".route()", () => {
    it("throws error if invalid HTTP method provided.", () => {
      expect(() => {
        router.route("TEST", endpoint, () => {});
      }).toThrow();
    });

    const mockResponse = new Response("test");

    ["GET", "POST", "PATCH", "PUT", "PATCH", "DELETE"].forEach((method) => {
      it(`prepares new ${method} endpoint.`, () => {
        router.route(method, endpoint, () => "test");

        const response = router.routes[method].get(endpoint);

        expect(typeof response).toBe("object");
        expect(JSON.stringify(response)).toBe(JSON.stringify(mockResponse));
      });
    });
  });
});
