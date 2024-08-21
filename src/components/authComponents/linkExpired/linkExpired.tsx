import { useState } from "react"

import { AuthModal, Container } from "@/components"
import { useResendRegistrationLinkMutation } from "@/services/auth.service"
import { ErrorResponse } from "@/services/auth.types"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { Button, Typography } from "@teamlead.incubator/ui-kit"
import Image from "next/image"
import { useRouter } from "next/router"

import s from "./linkExpired.module.scss"

type Props = {
  email: string
}

export const LinkExpired = ({ email }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [resendRegistrationLink, { error, isLoading }] = useResendRegistrationLinkMutation()
  const serverError = (error as ErrorResponse)?.data?.messages?.[0]?.message

  const { push } = useRouter()

  const { t } = useTranslation()

  const onCloseModal = () => {
    setIsModalOpen(false)
    void push("/auth/sign-in")
  }

  const onResendButtonClick = async () => {
    await resendRegistrationLink({ email })
    setIsModalOpen(true)
  }

  return (
    <Container className={s.mainContainer}>
      <div className={s.confirmContainer}>
        <Typography className={s.infoText} variant={"h1"}>
          {t.auth.linkExpired}
        </Typography>
        <Typography className={s.infoText}>{t.auth.linkExpiredDescription}</Typography>
      </div>
      <Button
        className={s.resendButton}
        disabled={!!serverError || isLoading}
        onClick={onResendButtonClick}
        variant={"primary"}
      >
        {t.auth.resendVerificationLink}
      </Button>
      <Image
        alt={t.auth.linkExpired}
        height={"352"}
        priority
        src={"/assets/svg/waitingTime.svg"}
        width={"473"}
      />
      <AuthModal
        description={serverError ?? t.auth.emailSentText(email)}
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title={serverError ? t.error : t.auth.emailSent}
      />
    </Container>
  )
}
