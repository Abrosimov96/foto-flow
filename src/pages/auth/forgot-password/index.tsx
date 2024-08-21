import { useState } from "react"
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"

import { AuthModal } from "@/components"
import { useLazyPasswordRecoveryQuery } from "@/services/auth.service"
import { ErrorResponse } from "@/services/auth.types"
import { Nullable } from "@/shared/types/nullable"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, FormInput, Typography } from "@teamlead.incubator/ui-kit"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { z } from "zod"

import s from "./forgotPassword.module.scss"

const forgotPasswordSchema = z.object({
  email: z.string().email()
})

type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    setError
  } = useForm<ForgotPasswordFields>({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema)
  })

  const [recoveryPassword, { isLoading }] = useLazyPasswordRecoveryQuery()
  const [recaptcha, setRecaptcha] = useState<Nullable<string>>()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isLinkSent, setLinkSent] = useState(false)
  const { t } = useTranslation()
  const { locale } = useRouter()

  const sendLinkText = isLinkSent ? t.auth.sendLinkAgain : t.auth.sendLink

  const closeModal = () => setModalOpen(false)

  const onSubmit = handleSubmit(({ email }) => {
    if (!recaptcha) {
      return
    }

    recoveryPassword({ email, recaptcha })
      .unwrap()
      .then(() => {
        setModalOpen(true)
        setLinkSent(true)
      })
      .catch((error: ErrorResponse) => {
        const errorField = error?.data?.messages?.[0]?.field

        if (errorField !== "email") {
          return
        }

        const message = error?.data?.messages?.[0]?.message

        setError(errorField, {
          message
        })
      })
  })

  const onRecaptchaChange = (recaptchaToken: Nullable<string>) => setRecaptcha(recaptchaToken)

  const recaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY_ID

  if (!recaptchaKey) {
    throw new Error(t.auth.missingRecaptchaKey)
  }

  return (
    <>
      <Head>
        <title>{t.auth.forgotPassword}</title>
      </Head>
      <Card className={s.forgotPassword}>
        <Typography as={"h1"} className={s.title} variant={"h1"}>
          {t.auth.forgotPassword}
        </Typography>
        <form onSubmit={onSubmit}>
          <FormInput
            control={control}
            error={errors.email?.message}
            inputMode={"email"}
            labelText={t.auth.email}
            name={"email"}
            placeholder={"Example@mail.com"}
          />
          <Typography className={s.emailHint} variant={"regular_text_14"}>
            {t.auth.enterEmailInstructions}
          </Typography>
          {isLinkSent && (
            <Typography className={s.linkSent} variant={"regular_text_14"}>
              {t.auth.linkSentByEmail}
            </Typography>
          )}
          <Button
            className={s.sendLinkButton}
            disabled={!isValid || !recaptcha || isLoading}
            fullWidth
            type={"submit"}
            variant={"primary"}
          >
            {sendLinkText}
          </Button>
        </form>
        <Button as={Link} className={s.signInButton} fullWidth href={"sign-in"} variant={"text"}>
          {t.auth.backToSignIn}
        </Button>
        <ReCAPTCHA
          className={s.recaptcha}
          hl={locale}
          onChange={onRecaptchaChange}
          sitekey={recaptchaKey}
          theme={"dark"}
        />
      </Card>
      <AuthModal
        description={t.auth.emailSentText(getValues("email"))}
        isOpen={isModalOpen}
        onClose={closeModal}
        title={t.auth.emailSent}
      />
    </>
  )
}
