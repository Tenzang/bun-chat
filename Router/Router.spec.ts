import { describe, expect, it, beforeEach, beforeAll } from "bun:test";
import { Router } from "./Router";

const baseURL = "http://test.com/";

const endpoints = {
  index: "",
  fail: "not-found.js",
  success: "found.",
};

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
        router.route("TEST", endpoints.index, () => {});
      }).toThrow();
    });

    const mockResponse = new Response("test");

    ["GET", "POST", "PATCH", "PUT", "PATCH", "DELETE"].forEach((method) => {
      it(`prepares new ${method} endpoint.`, () => {
        router.route(method, endpoints.index, () => "test");

        const response = router.routes[method].get(endpoints.index);

        expect(typeof response).toBe("object");
        expect(JSON.stringify(response)).toBe(JSON.stringify(mockResponse));
      });
    });
  });

  describe(".static()", () => {
    beforeAll(() => {
      router = new Router();
    });

    it("is defined", () => {
      expect(router.static).toBeDefined();
    });

    beforeEach(() => {
      router.static("./public_test");
    });

    it("responds 404 if resource not present", () => {
      const res = router.response(new Request(baseURL + endpoints.fail));

      expect(typeof res).toBe("object");
      expect(res.status).toBe(404);
    });

    describe("responds 200 if present with", () => {
      beforeEach(() => {
        router.static("./public_test");
      });

      "js html".split(" ").forEach((ext) => {
        it(`${ext} extension.`, () => {
          const res = router.response(
            new Request(`${baseURL}${endpoints.success}${ext}`)
          );

          expect(typeof res).toBe("object");
          expect(res.status).toBe(200);
        });
      });
    });
  });
});
