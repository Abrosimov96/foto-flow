import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"

import { AuthModal, AuthTitle, Translation } from "@/components"
import { useSignUpMutation } from "@/services/auth.service"
import { ErrorResponse } from "@/services/auth.types"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, FormCheckbox, FormInput, Typography } from "@teamlead.incubator/ui-kit"
import Head from "next/head"
import Link from "next/link"

import s from "./singUp.module.scss"

import { SignupFields, signUpSchema } from "./signUp.schema"

export default function SignUp() {
  const [signup, { isLoading }] = useSignUpMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { t } = useTranslation()

  const zodSignUpSchema = useMemo(() => signUpSchema(t), [t])

  const onCloseModal = () => {
    setIsModalOpen(false)
    reset({ confirmPassword: "", email: "", password: "", policy: false, userName: "" })
  }

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError
  } = useForm<SignupFields>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      password: "",
      policy: false,
      userName: ""
    },
    mode: "onTouched",
    resolver: zodResolver(zodSignUpSchema)
  })

  const onSubmit = handleSubmit(data => {
    signup({
      email: data.email,
      password: data.password,
      userName: data.userName
    })
      .unwrap()
      .then(() => {
        setIsModalOpen(true)
      })
      .catch((err: ErrorResponse) => {
        const errorField = err?.data?.messages?.[0]?.field
        const errorMessage = err?.data?.messages?.[0]?.message

        if (errorField === "email" || errorField === "userName") {
          setError(errorField, { message: errorMessage }, { shouldFocus: true })
        }
      })
  })

  return (
    <>
      <Head>
        <title>{t.auth.signUpTitle}</title>
      </Head>
      <Card className={s.signup}>
        <AuthTitle title={t.auth.signUpTitle} />
        <form className={s.signUpForm} onSubmit={onSubmit}>
          <FormInput
            control={control}
            labelText={t.auth.userName}
            name={"userName"}
            placeholder={"Epam11"}
          />
          <FormInput
            control={control}
            error={errors.email?.message}
            labelText={t.auth.email}
            name={"email"}
            placeholder={"Epam@epam.com"}
          />
          <FormInput
            autoComplete={"on"}
            control={control}
            error={errors.password?.message}
            labelText={t.auth.password}
            name={"password"}
            placeholder={t.auth.password}
            type={"password"}
          />
          <FormInput
            autoComplete={"on"}
            control={control}
            error={errors.confirmPassword?.message}
            labelText={t.auth.confirmPassword}
            name={"confirmPassword"}
            placeholder={t.auth.confirmPassword}
            type={"password"}
          />
          <FormCheckbox
            className={s.privacyPolicy}
            control={control}
            labelText={
              <Typography as={"span"} variant={"regular_text_14"}>
                <Translation
                  tags={{
                    1: () => (
                      <Typography as={Link} href={"terms-of-service"} variant={"regular_link"}>
                        {t.auth.termsOfService}
                      </Typography>
                    ),
                    2: () => (
                      <Typography as={Link} href={"privacy-policy"} variant={"regular_link"}>
                        {t.auth.privacyPolicy}
                      </Typography>
                    )
                  }}
                  text={t.auth.registrationAgree}
                />
              </Typography>
            }
            name={"policy"}
          />
          <Button disabled={!isValid || isLoading} fullWidth type={"submit"} variant={"primary"}>
            {t.auth.signUp}
          </Button>
        </form>
        <Typography className={s.haveAccount}>{t.auth.haveAccount}</Typography>
        <Button as={Link} fullWidth href={"sign-in"} variant={"text"}>
          {t.auth.signIn}
        </Button>
      </Card>
      <AuthModal
        description={t.auth.emailSentText(getValues("email"))}
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={t.auth.emailSent}
      />
    </>
  )
}
