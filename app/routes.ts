import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("pages/home/index.tsx"),
  route("signin", "pages/auth/signin.tsx"),
  route("signup", "pages/auth/signup.tsx"),
  ...prefix("api", [
    ...prefix("wallet", [route("create", "api/wallet/create.ts")]),
  ]),
] satisfies RouteConfig;
