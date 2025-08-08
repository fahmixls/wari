import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/home/index.tsx"),
  ...prefix("api", [
    ...prefix("wallet", [route("create", "api/wallet/create.ts")]),
  ]),
] satisfies RouteConfig;
