import { useMemo } from "react"
import { useForm } from "react-hook-form"

import { useNewPasswordMutation } from "@/services/auth.service"
import { useTerminateAllMutation } from "@/services/sessions.service"
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/shared/constants"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, FormInput, Typography } from "@teamlead.incubator/ui-kit"
import Head from "next/head"
import { useRouter } from "next/router"

import s from "./createNewPassword.module.scss"

import { CreateNewPasswordFields, createNewPasswordSchema } from "./createNewPassword.schema"

export default function CreateNewPassword() {
  const router = useRouter()
  const recoveryCode = router.query.recoveryCode as string

  const [sendNewPassword, { isLoading: isSendNewPasswordLoading }] = useNewPasswordMutation()
  const [terminateAllSessions, { isLoading: isTerminateAllSessionsLoading }] =
    useTerminateAllMutation()

  const { t } = useTranslation()
  const isLoading = isSendNewPasswordLoading || isTerminateAllSessionsLoading

  const newPasswordSchema = useMemo(() => createNewPasswordSchema(t), [t])

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
