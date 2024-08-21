import { useTranslation } from "@/utils/hooks/useTranslation"
import { Button, IconGithub, IconGoogle, Typography } from "@teamlead.incubator/ui-kit"
import Link from "next/link"

import s from "./authTitle.module.scss"

// https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
const GOOGLE_LOGIN_URL = {
  pathname: "https://accounts.google.com/o/oauth2/v2/auth",
  query: {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    redirect_uri: process.env.NEXT_PUBLIC_BASE_URL,
    response_type: "code",
    scope: "email profile"
  }
} as const

// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
const GITHUB_LOGIN_URL = "https://inctagram.work/api/v1/auth/github/login"

type Props = {
  title: string
}

export const AuthTitle = ({ title }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Typography className={s.title} variant={"h1"}>
        {title}
      </Typography>
      <div className={s.btnActions}>
        <Button as={Link} href={GOOGLE_LOGIN_URL} title={t.auth.loginViaGoogle}>
          <IconGoogle height={36} width={36} />
        </Button>
        <Button as={Link} href={GITHUB_LOGIN_URL} title={t.auth.loginViaGithub}>
          <IconGithub height={36} width={36} />
        </Button>
      </div>
    </>
  )
}
