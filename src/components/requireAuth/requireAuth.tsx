import { PropsWithChildren } from "react"

import { Loader } from "@/components/loader"
import { useMeQuery } from "@/services/auth.service"
import { useRouter } from "next/router"

export function RequireAuth({ children }: PropsWithChildren) {
  const router = useRouter()
  const { isError, isLoading } = useMeQuery()

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    void router.replace("/auth/sign-in")

    return null
  }

  return <>{children}</>
}
