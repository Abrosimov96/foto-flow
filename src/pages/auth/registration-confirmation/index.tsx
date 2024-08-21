import { ConfirmedRegistration, LinkExpired, Loader } from "@/components"
import { useRegistrationConfirmationQuery } from "@/services/auth.service"
import { useRouter } from "next/router"

export default function RegistrationConfirmation() {
  const router = useRouter()
  const confirmationCode = router.query.code as string
  const email = router.query.email as string
  const { isError, isLoading } = useRegistrationConfirmationQuery(
    {
      confirmationCode
    },
    {
      skip: !router
    }
  )

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <LinkExpired email={email} />
  }

  return <ConfirmedRegistration />
}
