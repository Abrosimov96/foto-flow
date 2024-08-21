import { useEffect } from "react"

import { Loader } from "@/components"
import { useLazyMeQuery } from "@/services/auth.service"
import { setTokenToLocalStorage } from "@/services/auth.utils"
import { useTranslation } from "@/utils/hooks/useTranslation"
import Head from "next/head"
import { useRouter } from "next/router"

export default function Github() {
  const router = useRouter()
  const accessToken = router.query.accessToken as string
  const { t } = useTranslation()
  const [getMe, { isFetching }] = useLazyMeQuery()

  useEffect(() => {
    if (accessToken) {
      setTokenToLocalStorage(accessToken)
      getMe().then(response => {
        void router.push(`/profile/${response.data?.userId}`)
      })
    }
  }, [accessToken])

  if (isFetching) {
    return <Loader />
  }

  return (
    <Head>
      <title>{t.auth.loginViaGithub}</title>
    </Head>
  )
}
