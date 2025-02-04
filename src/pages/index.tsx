import { Loader, callToaster } from "@/components"
import { useGoogleLoginQuery, useMeQuery } from "@/services/auth.service"
import { ErrorResponse } from "@/services/auth.types"
import Head from "next/head"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
  const code = router.query.code as string

  const { data, isFetching } = useMeQuery()
  const { error, isLoading } = useGoogleLoginQuery({ code }, { skip: !code })
  const googleLoginError = (error as ErrorResponse)?.data?.messages?.[0]?.message

  if (isLoading || isFetching) {
    return <Loader />
  }

  if (error) {
    callToaster("error", googleLoginError)
  }

  if (data) {
    //TODO пофиксить главную страничку
    //void router.push(`/profile/${data.userId}`)

    return null
  }

  return (
    <Head>
      <title>Foto Flow</title>
      <meta content={"Generated by create next app"} name={"description"} />
      <meta content={"width=device-width, initial-scale=1"} name={"viewport"} />
    </Head>
  )
}
