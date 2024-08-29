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
    emailType: "The email must match the format example@example.com",
    enterEmailInstructions: "Enter your email address and we will send you further instructions",
    forgotPassword: "Forgot Password?",
    haveAccount: "Do you have an account?",
    linkExpired: (title: string) => `${title} link expired`,
    linkExpiredDescription: (title: string) =>
      `Looks like the ${title} link has expired. Not to worry, we can send the link again`,
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
    resendLink: "Resend link",
    sendLink: "Send Link",
    sendLinkAgain: "Send Link Again",
    signIn: "Sign In",
    signInTitle: "Sign In",
    signUp: "Sign Up",
    signUpTitle: "Sign Up",
    termsOfService: "Terms of Service",
    userName: "Username",
    userNameContains: "Username may contain 0-9; A-Z; a-z; _; -"
  },
  commonWords: {
    no: "No",
    ok: "Ok",
    save: "Save",
    yes: "Yes"
  },
  editProfile: {
    generalInformation: {
      aboutMe: "About Me",
      city: "Select your city",
      cityDefaultValue: "City",
      country: "Select your country",
      countryDefaultValue: "Country",
      dateOfBirth: "Date of birth",
      errorEditAlert: "Error! Server is not available!",
      firstName: "First Name",
      firstNameContains: "Username may contain A-Z; a-z; А-Я; а-я",
      lastName: "Last Name",
      lastNameContains: "Username may contain A-Z; a-z; А-Я; а-я",
      saveChanges: "Save сhanges",
      successEditAlert: "Your settings are saved!",
      userAgeProfile: "A user under 13 cannot create a profile. <1>policy</1>",
      userName: "Username",
      userNameContains: "Username may contain 0-9; A-Z; a-z; _; -"
    },
    tabs: {
      accountManagement: "Account Management",
      devices: "Devices",
      generalInformation: "General Information",
      myPayments: "My Payments"
    }
  },
  error: "Error",
  header: {
    logo: "Logo"
  },
  profilePhoto: {
    addPhoto: "Add a Profile Photo",
    deletePhoto: "Delete Photo",
    deletePhotoConfirm: "Are you sure you want to delete the photo?",
    errorPhotoFormat: "Error! The format of the uploaded photo must be PNG and JPEG",
    errorPhotoSize: "Error! Photo size must be less than 10 MB!",
    photo: "Photo",
    photoPreview: "Photo preview",
    selectPhoto: "Select from Computer"
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
