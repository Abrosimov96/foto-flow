import { useMemo } from "react"

import { AuthTitle, Loader } from "@/components"
import { useMeQuery, useSignInMutation } from "@/services/auth.service"
import { ErrorResponse } from "@/services/auth.types"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, FormInput, Typography } from "@teamlead.incubator/ui-kit"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import s from "./signIn.module.scss"

import { SignInFields, signInSchema } from "./signIn.schema"

export default function SignIn() {
  const [signin, { isLoading }] = useSignInMutation()
  const { data: dataMe, isFetching: isFetchingMe } = useMeQuery()
  const router = useRouter()

  const { t } = useTranslation()

  const zodSignInSchema = useMemo(() => signInSchema(t), [t])

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError
  } = useForm<SignInFields>({
    defaultValues: {
      email: "teamlead.incubator@gmail.com",
      password: "12345Qwert-"
    },
    mode: "onTouched",
    resolver: zodResolver(zodSignInSchema)
  })

  const onSubmit = handleSubmit(data => {
    signin(data)
      .unwrap()
      .catch((error: ErrorResponse) => {
        setError("password", {
          message: error?.data?.messages?.[0]?.message ?? "An unexpected error occurred."
        })
      })
  })

  if (isLoading || isFetchingMe) {
    return <Loader />
  }

  if (dataMe) {
    void router.replace(`/profile/${dataMe.userId}`)

    return null
  }

  return (
    <>
      <Head>
        <title>{t.auth.signIn}</title>
      </Head>
      <Card className={s.signIn}>
        <AuthTitle title={t.auth.signIn} />
        <form className={s.signInForm} onSubmit={onSubmit}>
          <FormInput
            control={control}
            error={errors?.email?.message}
            labelText={t.auth.email}
            name={"email"}
          />
          <FormInput
            autoComplete={"on"}
            control={control}
            error={errors?.password?.message}
            labelText={t.auth.password}
            name={"password"}
            type={"password"}
          />
          <Typography
            as={Link}
            className={s.forgotPassword}
            href={"forgot-password"}
            title={"forgot password"}
            variant={"regular_text_14"}
          >
            {t.auth.forgotPassword}
          </Typography>
          <Button disabled={isLoading || !isValid} fullWidth type={"submit"} variant={"primary"}>
            {t.auth.signIn}
          </Button>
        </form>
        <Typography className={s.noAccount} variant={"regular_text_16"}>
          {t.auth.noAccount}
        </Typography>
        <Button as={Link} fullWidth href={"sign-up"} variant={"text"}>
          {t.auth.signUp}
        </Button>
      </Card>
    </>
  )
}
