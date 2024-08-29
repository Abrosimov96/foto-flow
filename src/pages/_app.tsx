import type { AppProps } from "next/app"

import { ReactNode } from "react"
import { Provider } from "react-redux"

import { Container, Header, Sidebar, Toaster } from "@/components"
import { useMeQuery } from "@/services/auth.service"
import { wrapper } from "@/store"

import "../styles/index.scss"
// eslint-disable-next-line import/extensions
import "@teamlead.incubator/ui-kit/css"

export default function App({ Component, ...rest }: AppProps) {
  const { props, store } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
        <Toaster />
      </Layout>
    </Provider>
  )
}

function Layout({ children }: { children: ReactNode }) {
  const { isSuccess: isSuccessMe } = useMeQuery()

  return (
    <>
      <Header />
      <Container className={"content"}>
        {isSuccessMe && <Sidebar />}
        <main className={"mainContent"}>{children}</main>
      </Container>
    </>
  )
}
