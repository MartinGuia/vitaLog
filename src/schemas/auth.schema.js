import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  lastName: z.string({
    required_error: "Lastname is required",
  }),
  userName: z.string({
    required_error: "Username is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  userName: z.string({
    required_error: "Username is required",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});
