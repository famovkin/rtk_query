import z from 'zod';

export const meResponseSchema = z.object({
  userId: z.string(),
  login: z.string(),
});

export const loginResponseSchema = z.object({
  accessToken: z.jwt(),
  refreshToken: z.jwt(),
});
