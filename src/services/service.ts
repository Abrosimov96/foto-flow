import { baseQueryWithReauth } from "@/services/fetchBaseQuery"
import { createApi } from "@reduxjs/toolkit/query/react"

export const service = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: "service",
  tagTypes: ["Me"]
})
