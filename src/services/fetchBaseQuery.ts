import { setTokenToLocalStorage } from "@/services/auth.utils"
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react"
import { Mutex } from "async-mutex"
import Router from "next/router"

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
  baseUrl: "https://inctagram.work/api",
  credentials: "include",
  prepareHeaders: headers => {
    const token = localStorage.getItem("token")

    headers.set("Authorization", `Bearer ${token}`)

    return headers
  }
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = (await baseQuery(
          {
            method: "POST",
            url: "/v1/auth/update-tokens"
          },
          api,
          extraOptions
        )) as any

        if (refreshResult.data) {
          setTokenToLocalStorage(refreshResult.data.accessToken)
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          if (Router.pathname !== "/" && !Router.pathname.startsWith("/auth")) {
            void Router.push("/auth/sign-in")
          }
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
