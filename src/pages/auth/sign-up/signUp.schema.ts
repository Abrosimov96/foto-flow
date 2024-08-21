import { z } from "zod"

export function zodAlwaysRefine<T extends z.ZodTypeAny>(zodType: T) {
  return z.any().superRefine(async (value, ctx) => {
    const res = await zodType.safeParseAsync(value)

    if (!res.success) {
      for (const issue of res.error.issues) {
        ctx.addIssue(issue)
      }
    }
  }) as unknown as T
}

export const signUpSchema = zodAlwaysRefine(
  z.object({
    confirmPassword: z.string(),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "The email must match the format example@example.com" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Minimum number of characters 6" })
      .max(30, { message: "Maximum number of characters 30" })
      .regex(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]+$/,
        {
          message: "Password must contain uppercase and lowercase letters, numbers, symbols"
        }
      ),
    policy: z.literal<boolean>(true),
    userName: z
      .string({ message: "Username is required" })
      .min(6, { message: "Minimum number of characters 6" })
      .max(30, { message: "Maximum number of characters 30" })
      .regex(/^[a-zA-Z0-9_-]*$/, {
        message: "Username may contain 0-9; A-Z; a-z; _; -"
      })
  })
).superRefine((values, ctx) => {
  if (values.password !== values.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "The passwords must match!",
      path: ["confirmPassword"]
    })
  }
})

export type SignupFields = z.infer<typeof signUpSchema>
