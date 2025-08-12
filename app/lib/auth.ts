import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    provider: "postgres",
    url: import.meta.env.VITE_DATABASE_URL,
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET as string,
    },
  },
});
