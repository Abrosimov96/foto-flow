import { Loader } from "@/components"
import { useCheckRecoveryCodeQuery } from "@/services/auth.service"
import { useTranslation } from "@/utils/hooks/useTranslation"
import Head from "next/head"
import { useRouter } from "next/router"

export default function Recovery() {
  const router = useRouter()
  const recoveryCode = router.query.code as string
  const { isError, isLoading, isSuccess } = useCheckRecoveryCodeQuery(
    { recoveryCode },
    { skip: !recoveryCode }
  )
  const { t } = useTranslation()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    void router.push(`password-recovery-expired`)
  }

  if (isSuccess) {
    void router.push(`create-new-password/${recoveryCode}`)
  }

  return (
    <Head>
      <title>{t.auth.passwordRecovery}</title>
    </Head>
  )
}
