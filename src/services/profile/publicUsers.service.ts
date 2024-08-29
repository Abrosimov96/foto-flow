import { PublicUserResponse } from "@/services/profile/profile.types"
import { service } from "@/services/service"

export const publicUserService = service.injectEndpoints({
  endpoints: builder => ({
    getPublicUser: builder.query<PublicUserResponse, string>({
      providesTags: ["Profile"],
      query: profileId => ({ url: `v1/public-user/profile/${profileId}` })
    })
  })
})

export const { useGetPublicUserQuery } = publicUserService
