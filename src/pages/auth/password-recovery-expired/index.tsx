import { useTranslation } from "@/utils/hooks/useTranslation"
import { Button, Typography } from "@teamlead.incubator/ui-kit"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"

import s from "./passwordRecoveryExpired.module.scss"

const passwordTitle = "Password recovery"

export default function PasswordRecoveryExpired() {
  const router = useRouter()
  const openForgotPassword = () => router.push("forgot-password")

  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t.auth.linkExpired(passwordTitle)}</title>
      </Head>
      <main className={s.passwordRecoveryExpired}>
        <div className={s.container}>
          <Typography className={s.title} variant={"h1"}>
            {t.auth.linkExpired(passwordTitle)}
          </Typography>
          <Typography className={s.text} variant={"regular_text_16"}>
            {t.auth.linkExpiredDescription(passwordTitle.toLowerCase())}
          </Typography>
          <Button fullWidth onClick={openForgotPassword} variant={"primary"}>
            {t.auth.resendLink}
          </Button>
        </div>
        <Image
          alt={t.auth.linkExpired(passwordTitle)}
          height={"352"}
          priority
          src={"/assets/svg/waitingTime.svg"}
          width={"473"}
        />
      </main>
    </>
  )
}
