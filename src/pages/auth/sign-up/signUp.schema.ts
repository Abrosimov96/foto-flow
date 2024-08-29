import { LocaleType } from "@/locales/en"
import { passwordRegex, userNameRegex } from "@/shared/constants"

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

export const signUpSchema = (t: LocaleType) =>
  zodAlwaysRefine(
    z.object({
      confirmPassword: z.string(),
      email: z.string().email({ message: t.auth.emailType }),
      password: z
        .string()
        .min(6, { message: t.auth.minCharsNumber(6) })
        .max(30, { message: t.auth.maxCharsNumber(30) })
        .regex(passwordRegex, {
          message: t.auth.passwordMustContain
        }),
      policy: z.literal<boolean>(true),
      userName: z
        .string()
        .min(6, { message: t.auth.minCharsNumber(6) })
        .max(30, { message: t.auth.maxCharsNumber(30) })
        .regex(userNameRegex, {
          message: t.auth.userNameContains
        })
    })
  ).superRefine((values, ctx) => {
    if (values.password !== values.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t.auth.passwordMatch,
        path: ["confirmPassword"]
      })
    }
  })

export type SignupFields = z.infer<ReturnType<typeof signUpSchema>>
