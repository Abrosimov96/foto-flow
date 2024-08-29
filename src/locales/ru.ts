import { LocaleType } from "@/locales/en"

export const ru: LocaleType = {
  auth: {
    backToSignIn: "Вернуться к входу",
    backToSignUp: "Вернуться к регистрации",
    confirmPassword: "Подтверждение пароля",
    congratulations: "Поздравляем!",
    createNewPassword: "Создание нового пароля",
    email: "Почта",
    emailConfirmed: "Ваш адрес электронной почты подтвержден",
    emailSent: "Письмо отправлено",
    emailSentText: (email: string) =>
      `Мы отправили ссылку для подтверждения вашего адреса электронной почты на ${email}`,
    emailType: "Адрес почты должен соответствовать формату example@example.com",
    enterEmailInstructions:
      "Введите свой адрес электронной почты и мы вышлем вам дальнейшие инструкции",
    forgotPassword: "Забыл пароль?",
    haveAccount: "У вас есть аккаунт?",
    linkExpired: () => `Ссылка устарела`,
    linkExpiredDescription: () =>
      "Похоже, срок действия ссылки для проверки истек. Не волнуйтесь, мы можем отправить ссылку еще раз",
    linkSentByEmail:
      "Ссылка была отправлена по электронной почте.\nЕсли вы не получили ссылку по электронной почте, отправьте её еще раз",
    loginViaGithub: "Вход через GitHub",
    loginViaGoogle: "Вход через Google",
    maxCharsNumber: (maxChars: number) => `Максимальное количество символов  ${maxChars}`,
    minCharsNumber: (minChars: number) => `Минимальное количество символов ${minChars}`,
    missingRecaptchaKey: "Отсутствует ключ рекапчи",
    newPassword: "Новый пароль",
    noAccount: "Нет аккаунта?",
    password: "Пароль",
    passwordMatch: "Пароли должны совпадать",
    passwordMustContain: "Пароль должен содержать прописные и строчные буквы, цифры, символы",
    passwordRecovery: "Восстановление пароля",
    passwordRequirements: (minChars: number, maxChars: number) =>
      `Ваш пароль должен содержать от ${minChars} до ${maxChars} символов`,
    privacyPolicy: "Политика конфиденциальности",
    registrationAgree: "Я согласен с <1>terms</1> и <2>policy</2>",
    resendLink: "Отправить ссылку повторно",
    sendLink: "Отправить ссылку",
    sendLinkAgain: "Отправить ссылку повторно",
    signIn: "Войти",
    signInTitle: "Вход",
    signUp: "Зарегистрироваться",
    signUpTitle: "Регистрация",
    termsOfService: "Условия пользования",
    userName: "Имя пользователя",
    userNameContains: "Имя пользователя должно содержать 0-9; A-Z; a-z; _; -"
  },
  commonWords: {
    no: "Нет",
    ok: "Ок",
    save: "Сохранить",
    yes: "Да"
  },
  editProfile: {
    generalInformation: {
      aboutMe: "О себе",
      city: "Выберите ваш город",
      cityDefaultValue: "Город",
      country: "Выберите вашу страну",
      countryDefaultValue: "Страна",
      dateOfBirth: "Дата рождения",
      errorEditAlert: "Ошибка! Сервер недоступен!",
      firstName: "Имя",
      firstNameContains: "Имя пользователя должно содержать A-Z; a-z; А-Я; а-я",
      lastName: "Фамилия",
      lastNameContains: "Имя пользователя должно содержать A-Z; a-z; А-Я; а-я",
      saveChanges: "Сохранить изменения",
      successEditAlert: "Ваши настройки сохранены!",
      userAgeProfile: "Пользователь младше 13 лет не может создать профиль. <1>policy</1>",
      userName: "Имя пользователя",
      userNameContains: "Имя пользователя должно содержать 0-9; A-Z; a-z; _; -"
    },
    tabs: {
      accountManagement: "Управление аккаунтом",
      devices: "Устройства",
      generalInformation: "Общая информация",
      myPayments: "Мои платежи"
    }
  },
  error: "Ошибка",
  header: {
    logo: "Логотип"
  },
  profilePhoto: {
    addPhoto: "Добавить фотографию профиля",
    deletePhoto: "Удалить фотографию",
    deletePhotoConfirm: "Вы уверены, что хотите удалить фотографию?",
    errorPhotoFormat: "Ошибка! Формат загружаемой фотографии должен быть PNG и JPEG",
    errorPhotoSize: "Ошибка! Размер фотографии должен быть менее 10 МБ!",
    photo: "Фотография",
    photoPreview: "Предпросмотр фотографии",
    selectPhoto: "Выбрать с компьютера"
  },
  sidebar: {
    create: "Создать",
    favorites: "Избранное",
    home: "Домой",
    logOut: "Выйти",
    logOutModalMessage: (email: string) =>
      `Вы действительно хотите выйти из своей учетной записи ${email}?`,
    messenger: "Сообщения",
    myProfile: "Мой профиль",
    search: "Поиск",
    statistics: "Статистика"
  }
}
