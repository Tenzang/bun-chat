type Endpoints = Map<string, () => any>;

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Routes = {
  [key in Method]: Endpoints;
};

export interface TypedRequest extends Request {
  method: Method;
}
