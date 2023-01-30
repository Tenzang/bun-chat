import { describe, expect, it, beforeEach, beforeAll } from "bun:test";
import { Router, Method, TypedRequest } from "./Router";

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
        // @ts-ignore
        router.route("TEST", endpoints.index, () => {});
      }).toThrow();
    });

    const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as Method[];

    methods.forEach((method) => {
      it(`prepares new ${method} endpoint.`, () => {
        router.route(method, endpoints.index, () => "test");

        const resCallback = router.routes[method].get(endpoints.index);

        expect(typeof resCallback).toBe("function");
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

    it("responds 404 if resource not present", async () => {
      const res = await router.response(
        new Request(baseURL + endpoints.fail) as TypedRequest
      );

      expect(typeof res).toBe("object");
      expect(res.status).toBe(404);
    });

    describe("responds 200 if present with", () => {
      beforeEach(() => {
        router.static("./public_test");
      });

      "js html".split(" ").forEach((ext) => {
        it(`${ext} extension.`, async () => {
          const res = await router.response(
            new Request(`${baseURL}${endpoints.success}${ext}`) as TypedRequest
          );

          expect(typeof res).toBe("object");
          expect(res.status).toBe(200);
        });
      });
    });
  });
});
