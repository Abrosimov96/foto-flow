import { LocaleType } from "@/locales/en"
import { z } from "zod"

export const editProfileSchema = (t: LocaleType) =>
  z
    .object({
      aboutMe: z.string().max(200, { message: t.auth.maxCharsNumber(200) }),
      city: z.string(),
      country: z.string(),
      dateOfBirth: z.date(),
      firstName: z
        .string()
        .min(1, { message: t.auth.minCharsNumber(1) })
        .max(50, { message: t.auth.maxCharsNumber(50) })
        .regex(/^[a-zA-Zа-яА-Я]*$/, {
          message: t.editProfile.generalInformation.firstNameContains
        }),
      lastName: z
        .string()
        .min(1, { message: t.auth.minCharsNumber(1) })
        .max(50, { message: t.auth.maxCharsNumber(50) })
        .regex(/^[a-zA-Zа-яА-Я]*$/, {
          message: t.editProfile.generalInformation.lastNameContains
        }),
      userName: z
        .string()
        .min(6, { message: t.auth.minCharsNumber(6) })
        .max(30, { message: t.auth.maxCharsNumber(30) })
        .regex(/^[a-zA-Z0-9_-]*$/, {
          message: t.editProfile.generalInformation.userNameContains
        })
    })
    .superRefine((val, ctx) => {
      const today = new Date()
      const birth = new Date(val.dateOfBirth)
      let age = today.getFullYear() - birth.getFullYear()
      const monthDifference = today.getMonth() - birth.getMonth()

      // Если текущий месяц меньше месяца рождения или текущий день меньше дня рождения,
      // значит, еще не наступил день рождения в этом году, поэтому уменьшаем возраст на 1
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--
      }

      if (age > 13) {
        return
      }

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        //TODO how paste link
        message: "userAgeTooLow",
        path: ["dateOfBirth"]
      })
    })

export type EditProfileFields = z.infer<ReturnType<typeof editProfileSchema>>
