import React from "react"

import { IconRussiaFlag, IconUnitedKingdomFlag, Select } from "@teamlead.incubator/ui-kit"
import { useRouter } from "next/router"

import s from "@/components/header/header.module.scss"

const languages = [
  { icon: <IconUnitedKingdomFlag />, text: "English", value: "en" },
  { icon: <IconRussiaFlag />, text: "Russian", value: "ru" }
]

export const LanguageSelect = () => {
  const { asPath, locale, pathname, push, query } = useRouter()

  const onChangeLanguage = (locale: string) => {
    void push({ pathname, query }, asPath, { locale })
  }

  return (
    <Select
      className={s.language}
      defaultValue={locale}
      onValueChange={onChangeLanguage}
      options={languages}
    />
  )
}
