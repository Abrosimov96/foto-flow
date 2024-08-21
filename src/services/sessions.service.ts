import { service } from "@/services/service"

export const sessionsService = service.injectEndpoints({
  endpoints: builder => ({
    terminateAll: builder.mutation<void, void>({
      query: () => ({
        method: "DELETE",
        url: "v1/sessions/terminate-all"
      })
    })
  })
})

export const { useTerminateAllMutation } = sessionsService
