export type RegistrationArgs = {
  baseUrl?: string
  email: string
  password: string
  userName: string
}

export type RegistrationConfirmationArgs = {
  confirmationCode: string
}

export type GoogleLoginArgs = {
  code: string
}

export type GoogleLoginResponse = {
  accessToken: string
  email: string
}

export type CheckRecoveryCodeArgs = {
  recoveryCode: string
}

export type RegistrationEmailResendingArgs = {
  baseUrl?: string
  email: string
}

export type NewPasswordArgs = {
  newPassword: string
  recoveryCode: string
}

export type PasswordRecoveryArgs = {
  baseUrl?: string
  email: string
  recaptcha: string
}

export type CheckRecoveryCodeResponse = {
  email: string
}

export type ErrorResponse = {
  data: {
    error: string
    messages: [
      {
        field: string
        message: string
      }
    ]
    statusCode: number
  }
}

export type Signin = {
  email: string
  password: string
}

export type SigninResponse = {
  accessToken: string
}

export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
