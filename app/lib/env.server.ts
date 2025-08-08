export const serverEnv = {
  CIRCLE_ENTITY_SECRET_CHIPHERTEXT: import.meta.env
    .CIRCLE_ENTITY_SECRET_CIPHERTEXT,
  CIRCLE_API_KEY: import.meta.env.CIRCLE_API_KEY,
  DATABASE_URL: import.meta.env.DATABASE_URL,
};
