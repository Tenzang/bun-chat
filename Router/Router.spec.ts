import { describe, expect, it, beforeEach } from "bun:test";
import { Router } from "./Router";
import { Method, TypedRequest } from "./types";

const baseURL = "http://test.com/";

const endpoints = {
  index: "",
  fail: "not-found.js",
  success: "found.",
};

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    router = createRouter();
  });

  it("exists.", () => {
    expect(router).toBeDefined();
  });

  describe(".route()", () => {
    testForDecorator(new Router().route, "GET", "/");

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
    testForDecorator(new Router().static);

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

function testForDecorator(method: Function, ...args: any) {
  it("returns a Router object instance", () => {
    expect(getStringyProperties(method.apply(new Router(), args))).toBe(
      getStringyProperties(new Router())
    );
  });
}

const getStringyProperties = (object: Object) =>
  JSON.stringify(Object.getOwnPropertyNames(object));

const createRouter = () =>
  new Router().notFound(() => "not found").static("./Router/public_test");
