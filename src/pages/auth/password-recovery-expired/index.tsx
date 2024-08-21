import { Button, Typography } from "@teamlead.incubator/ui-kit"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"

import s from "./passwordRecoveryExpired.module.scss"

const TITLE = "Password recovery link expired"

export default function PasswordRecoveryExpired() {
  const router = useRouter()
  const openForgotPassword = () => router.push("forgot-password")

  return (
    <>
      <Head>
        <title>{TITLE}</title>
      </Head>
      <main className={s.passwordRecoveryExpired}>
        <div className={s.container}>
          <Typography className={s.title} variant={"h1"}>
            {TITLE}
          </Typography>
          <Typography className={s.text} variant={"regular_text_16"}>
            Looks like the password recovery link has expired. Not to worry, we can send the link
            again
          </Typography>
          <Button fullWidth onClick={openForgotPassword} variant={"primary"}>
            Resend link
          </Button>
        </div>
        <Image
          alt={TITLE}
          height={"352"}
          priority
          src={"/assets/svg/waitingTime.svg"}
          width={"473"}
        />
      </main>
    </>
  )
}
