import { useMemo } from "react"
import { useForm } from "react-hook-form"

import { LocaleType } from "@/locales/en"
import { useNewPasswordMutation } from "@/services/auth.service"
import { useTerminateAllMutation } from "@/services/sessions.service"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, FormInput, Typography } from "@teamlead.incubator/ui-kit"
import Head from "next/head"
import { useRouter } from "next/router"
import { z } from "zod"

import s from "./createNewPassword.module.scss"

const MIN_PASSWORD_LENGTH = 6
const MAX_PASSWORD_LENGTH = 20

const PASSWORD_REGEX =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/

const passwordValidation = (t: LocaleType) =>
  z
    .string()
    .min(MIN_PASSWORD_LENGTH, { message: t.auth.minCharsNumber(MIN_PASSWORD_LENGTH) })
    .max(MAX_PASSWORD_LENGTH, { message: t.auth.maxCharsNumber(MAX_PASSWORD_LENGTH) })
    .regex(PASSWORD_REGEX, {
      message: t.auth.passwordMustContain
    })

const createNewPasswordSchema = (t: LocaleType) =>
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

type CreateNewPasswordFields = z.infer<ReturnType<typeof createNewPasswordSchema>>

export default function CreateNewPassword() {
  const router = useRouter()
  const recoveryCode = router.query.recoveryCode as string

  const [sendNewPassword, { isLoading: isSendNewPasswordLoading }] = useNewPasswordMutation()
  const [terminateAllSessions, { isLoading: isTerminateAllSessionsLoading }] =
    useTerminateAllMutation()

  // ToDo: useMemo for t and so on? Can we translate in real time validate errors?
  const { t } = useTranslation()
  const newPasswordSchema = useMemo(() => createNewPasswordSchema(t), [t])
  const isLoading = isSendNewPasswordLoading || isTerminateAllSessionsLoading

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<CreateNewPasswordFields>({
    defaultValues: { confirmPassword: "", newPassword: "" },
    resolver: zodResolver(newPasswordSchema)
  })

  const onSubmit = handleSubmit(({ newPassword }) => {
    sendNewPassword({
      newPassword,
      recoveryCode
    })
      .unwrap()
      .then(() => router.push("/auth/sign-in"))
      .then(() => terminateAllSessions())
  })

  return (
    <>
      <Head>
        <title>{t.auth.createNewPassword}</title>
      </Head>
      <Card className={s.createNewPassword}>
        <Typography className={s.title} variant={"h1"}>
          {t.auth.createNewPassword}
        </Typography>
        <form onSubmit={onSubmit}>
          <FormInput
            autoComplete={"on"}
            className={s.newPassword}
            control={control}
            error={errors.newPassword?.message}
            labelText={t.auth.newPassword}
            name={"newPassword"}
            placeholder={t.auth.newPassword}
            type={"password"}
          />
          <FormInput
            autoComplete={"on"}
            className={s.confirmPassword}
            control={control}
            error={errors.confirmPassword?.message}
            labelText={t.auth.confirmPassword}
            name={"confirmPassword"}
            placeholder={t.auth.confirmPassword}
            type={"password"}
          />
          <Typography className={s.passwordHint} variant={"regular_text_14"}>
            {t.auth.passwordRequirements(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)}
          </Typography>
          <Button disabled={isLoading} fullWidth type={"submit"} variant={"primary"}>
            {t.auth.createNewPassword}
          </Button>
        </form>
      </Card>
    </>
  )
}
