import {
  CheckRecoveryCodeArgs,
  CheckRecoveryCodeResponse,
  GoogleLoginArgs,
  GoogleLoginResponse,
  MeResponse,
  NewPasswordArgs,
  PasswordRecoveryArgs,
  RegistrationArgs,
  RegistrationConfirmationArgs,
  RegistrationEmailResendingArgs,
  Signin,
  SigninResponse
} from "@/services/auth.types"
import { setTokenToLocalStorage } from "@/services/auth.utils"
import { service } from "@/services/service"

export const authService = service.injectEndpoints({
  endpoints: builder => ({
    checkRecoveryCode: builder.query<CheckRecoveryCodeResponse, CheckRecoveryCodeArgs>({
      query: body => ({
        body,
        method: "POST",
        url: "v1/auth/check-recovery-code"
      })
    }),
    googleLogin: builder.query<GoogleLoginResponse, GoogleLoginArgs>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          setTokenToLocalStorage(data.accessToken)
          dispatch(authService.util.invalidateTags(["Me"]))
        } catch (error) {
          console.error(error, "error")

          return
        }
      },
      query: body => ({
        body,
        method: "POST",
        url: "v1/auth/google/login"
      })
    }),
    me: builder.query<MeResponse, void>({
      providesTags: ["Me"],
      query: () => ({
        url: "v1/auth/me"
      })
    }),
    newPassword: builder.mutation<void, NewPasswordArgs>({
      query: body => ({
        body,
        method: "POST",
        url: "v1/auth/new-password"
      })
    }),
    passwordRecovery: builder.query<void, PasswordRecoveryArgs>({
      query: body => ({
        body: body,
        method: "POST",
        url: "v1/auth/password-recovery"
      })
    }),
    registrationConfirmation: builder.query<void, RegistrationConfirmationArgs>({
      query: body => ({
        body,
        method: "POST",
        url: "/v1/auth/registration-confirmation"
      })
    }),
    resendRegistrationLink: builder.mutation<void, RegistrationEmailResendingArgs>({
      query: body => ({
        body,
        method: "POST",
        url: "/v1/auth/registration-email-resending"
      })
    }),
    signIn: builder.mutation<SigninResponse, Signin>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled

          setTokenToLocalStorage(data.accessToken)
          dispatch(authService.util.invalidateTags(["Me"]))
        } catch (error) {
          console.error(error, "error")

          return
        }
      },
      query: body => ({
        body,
        method: "POST",
        url: "v1/auth/login"
      })
    }),
    signOut: builder.mutation<void, void>({
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
          localStorage.removeItem("token")
          dispatch(authService.util.resetApiState())
        } catch (error) {
          console.error(error)
        }
      },
      query: () => ({
        method: "POST",
        url: "v1/auth/logout"
      })
    }),
    signUp: builder.mutation<void, RegistrationArgs>({
      query: body => ({
        body,
        method: "POST",
        url: "/v1/auth/registration"
      })
    })
  })
})

export const {
  useCheckRecoveryCodeQuery,
  useGoogleLoginQuery,
  useLazyMeQuery,
  useLazyPasswordRecoveryQuery,
  useMeQuery,
  useNewPasswordMutation,
  useRegistrationConfirmationQuery,
  useResendRegistrationLinkMutation,
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation
} = authService
