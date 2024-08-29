import { LocaleType } from "@/locales/en"
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, passwordRegex } from "@/shared/constants"
import { z } from "zod"

const passwordValidation = (t: LocaleType) =>
  z
    .string()
    .min(MIN_PASSWORD_LENGTH, { message: t.auth.minCharsNumber(MIN_PASSWORD_LENGTH) })
    .max(MAX_PASSWORD_LENGTH, { message: t.auth.maxCharsNumber(MAX_PASSWORD_LENGTH) })
    .regex(passwordRegex, {
      message: t.auth.passwordMustContain
    })

export const createNewPasswordSchema = (t: LocaleType) =>
  z
    .object({
      confirmPassword: passwordValidation(t),
      newPassword: passwordValidation(t)
    })
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
      if (newPassword !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t.auth.passwordMatch,
          path: ["confirmPassword"]
        })
      }
    })

export type CreateNewPasswordFields = z.infer<ReturnType<typeof createNewPasswordSchema>>
