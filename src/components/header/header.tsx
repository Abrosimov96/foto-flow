import React, { useState } from "react"

import { Container } from "@/components/container/container"
import { LanguageSelect } from "@/components/languageSelect/languageSelect"
import { useMeQuery } from "@/services/auth.service"
import { useTranslation } from "@/utils/hooks/useTranslation"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconBellFill,
  IconBellOutline,
  Typography
} from "@teamlead.incubator/ui-kit"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

import s from "./header.module.scss"

export const Header = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const isGithubRedirectPage = router.pathname.startsWith("/github")
  const { isError } = useMeQuery(undefined, { skip: isGithubRedirectPage })
  const isNotSignedIn = isError

  return (
    <header className={s.header}>
      <Container className={s.headerWrapper}>
        <Link className={s.logo} href={"/"}>
          <Image
            alt={t.header.logo}
            height={36}
            priority
            src={"/assets/svg/fotoFlow.svg"}
            width={36}
          />
          FotoFlow
        </Link>
        {/* TODO move inline styles to header.module.scss */}
        <div className={s.controls}>
          <DropdownMenu
            onOpenChange={open => {
              setIsOpen(open)
            }}
          >
            <DropdownMenuTrigger>
              <Button className={clsx(s.notification, isOpen && s.notificationOpened)}>
                {isOpen ? <IconBellFill /> : <IconBellOutline />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ maxWidth: "331px" }}>
              <DropdownMenuLabel>
                <Typography as={"h3"} variant={"bold_text_14"}>
                  Уведомления
                </Typography>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Typography as={"h4"} variant={"bold_text_14"}>
                    Новое уведомление!{" "}
                    <Typography as={"span"} style={{ color: "#397DF6" }} variant={"small_text"}>
                      Новое
                    </Typography>
                  </Typography>
                  <div>
                    <Typography variant={"regular_text_14"}>
                      Следующий платеж у вас спишется через 1 день
                    </Typography>
                    <Typography as={"span"} style={{ color: "#8D9094" }} variant={"small_text"}>
                      1 час назад
                    </Typography>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Typography as={"h4"} variant={"bold_text_14"}>
                    Новое уведомление!{" "}
                    <Typography as={"span"} style={{ color: "#397DF6" }} variant={"small_text"}>
                      Новое
                    </Typography>
                  </Typography>
                  <div>
                    <Typography variant={"regular_text_14"}>
                      Ваша подписка истекает через 7 дней
                    </Typography>
                    <Typography as={"span"} style={{ color: "#8D9094" }} variant={"small_text"}>
                      1 день назад
                    </Typography>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Typography as={"h4"} variant={"bold_text_14"}>
                    Новое уведомление!{" "}
                    <Typography as={"span"} style={{ color: "#397DF6" }} variant={"small_text"}>
                      Новое
                    </Typography>
                  </Typography>
                  <div>
                    <Typography variant={"regular_text_14"}>
                      Ваша подписка истекает через 7 дней
                    </Typography>
                    <Typography as={"span"} style={{ color: "#8D9094" }} variant={"small_text"}>
                      1 день назад
                    </Typography>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <LanguageSelect />
          {isNotSignedIn && (
            <>
              <Button as={Link} className={s.signin} href={"/auth/sign-in"} variant={"text"}>
                {t.auth.signInTitle}
              </Button>
              <Button as={Link} className={s.signup} href={"/auth/sign-up"} variant={"primary"}>
                {t.auth.signUpTitle}
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  )
}
