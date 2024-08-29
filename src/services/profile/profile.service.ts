import {
  ProfileResponse,
  UpdateProfileArgs,
  UploadAvatarArgs,
  UploadAvatarResponse
} from "@/services/profile/profile.types"
import { service } from "@/services/service"

export const profileService = service.injectEndpoints({
  endpoints: builder => ({
    deleteAvatar: builder.mutation<void, void>({
      invalidatesTags: ["Profile"],
      query: _ => ({ method: "DELETE", url: "v1/users/profile/avatar" })
    }),
    getProfile: builder.query<ProfileResponse, void>({
      providesTags: ["Profile"],
      query: () => ({ url: "v1/users/profile" })
    }),
    updateProfile: builder.mutation<void, UpdateProfileArgs>({
      invalidatesTags: ["Profile"],
      query: body => ({
        body: { ...body, region: "" },
        method: "PUT",
        url: "v1/users/profile"
      })
    }),
    uploadAvatar: builder.mutation<UploadAvatarResponse, UploadAvatarArgs>({
      invalidatesTags: ["Profile"],
      query: ({ avatar }) => {
        const formData = new FormData()

        formData.append("file", avatar)

        return {
          body: formData,
          method: "POST",
          url: "v1/users/profile/avatar"
        }
      }
    })
  })
})

export const {
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation
} = profileService
