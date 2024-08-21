import type { AppProps } from "next/app"

import { ReactNode } from "react"
import { Provider } from "react-redux"

import { Container, Header, Sidebar } from "@/components"
import { wrapper } from "@/store"
import { Toaster } from "@teamlead.incubator/ui-kit"
import Router from "next/router"

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
  return (
    <>
      <Header />
      <Container className={"content"}>
        {Router.pathname.startsWith("/profile") && <Sidebar />}
        <main className={"mainContent"}>{children}</main>
      </Container>
    </>
  )
}
