import { Container } from "@/components"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { Button, Typography } from "@teamlead.incubator/ui-kit"
import Image from "next/image"
import Link from "next/link"

import s from "./confirmedRegistration.module.scss"

export const ConfirmedRegistration = () => {
  const { t } = useTranslation()

  return (
    <Container className={s.mainContainer}>
      <div className={s.confirmContainer}>
        <Typography variant={"h1"}>{t.auth.congratulations}</Typography>
        <Typography className={s.infoText}>{t.auth.emailConfirmed}</Typography>
      </div>
      <Button as={Link} className={s.signinButton} href={"sign-in"} variant={"primary"}>
        {t.auth.signin}
      </Button>
      <Image
        alt={t.auth.emailConfirmed}
        height={"300"}
        priority
        src={"/assets/svg/confirmRegistration.svg"}
        width={"432"}
      />
    </Container>
  )
}
