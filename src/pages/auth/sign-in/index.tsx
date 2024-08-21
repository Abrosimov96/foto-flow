import { useForm } from "react-hook-form"

import { AuthTitle, Loader } from "@/components"
import { useMeQuery, useSignInMutation } from "@/services/auth.service"
import { ErrorResponse } from "@/services/auth.types"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, FormInput, Typography } from "@teamlead.incubator/ui-kit"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { z } from "zod"

import s from "./signIn.module.scss"

const loginSchema = z.object({
  email: z.string().email({ message: "The email must match the format example@example.com" }),
  password: z
    .string()
    .min(6, { message: "Minimum number of characters 6" })
    .max(30, { message: "Maximum number of characters 30" })
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/,
      {
        message: "Password must contain uppercase and lowercase letters, numbers, symbols"
      }
    )
})

type SignInFields = z.infer<typeof loginSchema>

export default function SignIn() {
  const [signin, { isLoading }] = useSignInMutation()
  const { data: dataMe, isFetching: isFetchingMe } = useMeQuery()
  const router = useRouter()

  const { t } = useTranslation()

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
    resolver: zodResolver(loginSchema)
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
    void router.push(`/profile/${dataMe.userId}`)

    return null
  }

  return (
    <>
      <Head>
        <title>{t.auth.signinTitle}</title>
      </Head>
      <Card className={s.signIn}>
        <AuthTitle title={t.auth.signinTitle} />
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
            {t.auth.signin}
          </Button>
        </form>
        <Typography className={s.noAccount} variant={"regular_text_16"}>
          {t.auth.noAccount}
        </Typography>
        <Button as={Link} fullWidth href={"sign-up"} variant={"text"}>
          {t.auth.signup}
        </Button>
      </Card>
    </>
  )
}
