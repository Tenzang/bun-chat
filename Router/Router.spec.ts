import { describe, expect, it, beforeEach } from "bun:test";
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
    configureDefaults(router);
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
    it("is defined", () => {
      expect(router.static).toBeDefined();
    });

    it("responds 404 if resource not present", async () => {
      const res = await router.response(
        new Request(baseURL + endpoints.fail) as TypedRequest
      );
      expect(res.status).toBe(404);
    });

    describe("responds 200 if present with", () => {
      "js html".split(" ").forEach((ext) => {
        it(`${ext} extension.`, async () => {
          const res = await router.response(
            new Request(`${baseURL}${endpoints.success}${ext}`) as TypedRequest
          );
          expect(res.status).toBe(200);
        });
      });
    });
  });
});

function configureDefaults(router: Router) {
  router.notFound(() => "not found");
  router.static("./Router/public_test");
}
