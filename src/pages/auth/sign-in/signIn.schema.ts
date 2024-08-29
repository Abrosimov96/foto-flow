import { LocaleType } from "@/locales/en"
import { passwordRegex } from "@/shared/constants"
import { z } from "zod"

export const signInSchema = (t: LocaleType) =>
  z.object({
    email: z.string().email({ message: t.auth.emailType }),
    password: z
      .string()
      .min(6, { message: t.auth.minCharsNumber(6) })
      .max(30, { message: t.auth.maxCharsNumber(30) })
      .regex(passwordRegex, {
        message: t.auth.passwordMustContain
      })
  })

export type SignInFields = z.infer<ReturnType<typeof signInSchema>>
