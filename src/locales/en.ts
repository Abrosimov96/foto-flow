export const en = {
  auth: {
    backToSignIn: "Back to Sign In",
    backToSignUp: "Back to Sign Up",
    confirmPassword: "Password confirmation",
    congratulations: "Congratulations!",
    createNewPassword: "Create new password",
    email: "Email",
    emailConfirmed: "Your email has been confirmed",
    emailSent: "Email sent",
    emailSentText: (email: string) => `We have sent a link to confirm your email to ${email}`,
    enterEmailInstructions: "Enter your email address and we will send you further instructions",
    forgotPassword: "Forgot Password?",
    haveAccount: "Do you have an account?",
    linkExpired: "Email verification link expired",
    linkExpiredDescription:
      "Looks like the verification link has expired. Not to worry, we can send the link again",
    linkSentByEmail:
      "The link has been sent by email.\nIf you don’t receive an email send link again",
    loginViaGithub: "Login via GitHub",
    loginViaGoogle: "Login via Google",
    maxCharsNumber: (maxChars: number) => `Maximum number of characters ${maxChars}`,
    minCharsNumber: (minChars: number) => `Minimum number of characters ${minChars}`,
    missingRecaptchaKey: "Missing recaptcha key",
    newPassword: "New password",
    noAccount: "Don’t have an account?",
    password: "Password",
    passwordMatch: "The passwords must match",
    passwordMustContain: "Password must contain uppercase and lowercase letters, numbers, symbols",
    passwordRecovery: "Password recovery",
    passwordRequirements: (minChars: number, maxChars: number) =>
      `Your password must be between ${minChars} and ${maxChars} characters`,
    privacyPolicy: "Privacy Policy",
    registrationAgree: "I agree to the <1>terms</1> and <2>policy</2>",
    resendVerificationLink: "Resend verification link",
    sendLink: "Send Link",
    sendLinkAgain: "Send Link Again",
    signin: "Sign In",
    signinTitle: "Sign In",
    signup: "Sign Up",
    signupTitle: "Sign Up",
    termsOfService: "Terms of Service",
    userName: "Username"
  },
  commonWords: {
    no: "No",
    ok: "Ok",
    yes: "Yes"
  },
  error: "Error",
  header: {
    logo: "Logo"
  },
  sidebar: {
    create: "Create",
    favorites: "Favorites",
    home: "Home",
    logOut: "Log Out",
    logOutModalMessage: (email: string) =>
      `Are you really want to log out of your account ${email}?`,
    messenger: "Messenger",
    myProfile: "My Profile",
    search: "Search",
    statistics: "Statistics"
  }
}

export type LocaleType = typeof en
