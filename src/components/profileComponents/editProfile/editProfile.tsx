import { useMemo } from "react"
import { useForm } from "react-hook-form"

import { ProfilePhoto } from "@/components/profile/profilePhoto"
import {
  EditProfileFields,
  editProfileSchema
} from "@/components/profileComponents/editProfile/editProfileSchema"
import { callToaster } from "@/components/toaster"
import { Translation } from "@/components/translation"
import { ErrorResponse } from "@/services/auth.types"
import {
  useLazyGetProfileQuery,
  useUpdateProfileMutation
} from "@/services/profile/profile.service"
import { useTranslation } from "@/utils/hooks/useTranslation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  FormDatePicker,
  FormInput,
  FormSelect,
  FormTextArea,
  Typography
} from "@teamlead.incubator/ui-kit"
import { enUS, ru } from "date-fns/locale"
import Link from "next/link"
import { useRouter } from "next/router"

import s from "./editProfile.module.scss"

const countries = [
  { text: "English", value: "en" },
  { text: "Russian", value: "ru" },
  { text: "Germany", value: "de" },
  { text: "Bulgaria", value: "bg" }
]

const cities = [
  { text: "London", value: "London" },
  { text: "Moskow", value: "Moskow" },
  { text: "Berlin", value: "Berlin" },
  { text: "Sofia", value: "Sofia" }
]

export const EditProfile = () => {
  const [getProfileData] = useLazyGetProfileQuery()
  // const { data: dataprofile } = useGetProfileQuery()
  const [editProfile, { isLoading: isLoadingEditProfile }] = useUpdateProfileMutation()

  const { t } = useTranslation()
  const { locale } = useRouter()

  const zodEditProfileSchema = useMemo(() => editProfileSchema(t), [t])

  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    setError
  } = useForm<EditProfileFields>({
    defaultValues: async () => {
      const response = await getProfileData()

      // console.log("dataprofile", dataprofile)
      // if (dataprofile) {
      //   response = dataprofile
      // } else {
      //   const res = await getProfileData()

      //   response = res.data
      // }
      //TODO if (response.data){...}
      return {
        aboutMe: "",
        city: "",
        country: "",
        dateOfBirth: new Date(response?.data?.dateOfBirth ?? "1990-08-19T10:05:40.757Z"),
        firstName: response?.data?.firstName ?? "",
        lastName: response?.data?.lastName ?? "",
        userName: response?.data?.userName ?? ""
      }
    },
    mode: "onChange",
    resolver: zodResolver(zodEditProfileSchema)
  })

  const onSubmit = handleSubmit(({ dateOfBirth, ...data }) => {
    editProfile({ ...data, dateOfBirth: dateOfBirth.toISOString() })
      .unwrap()
      .then(() => {
        callToaster("success", `${t.editProfile.generalInformation.successEditAlert}`)
      })
      .catch(() => {
        callToaster("error", `${t.editProfile.generalInformation.errorEditAlert}`)
      })
  })

  return (
    <>
      <div className={s.content}>
        <ProfilePhoto />
        <div className={s.userData}>
          <form className={s.editUserForm} onSubmit={onSubmit}>
            <FormInput
              control={control}
              error={errors?.userName?.message}
              labelText={t.editProfile.generalInformation.userName}
              name={"userName"}
            />
            <FormInput
              control={control}
              error={errors?.firstName?.message}
              labelText={t.editProfile.generalInformation.firstName}
              name={"firstName"}
              required
            />
            <FormInput
              control={control}
              error={errors?.lastName?.message}
              labelText={t.editProfile.generalInformation.lastName}
              name={"lastName"}
              required
            />
            <FormDatePicker
              control={control}
              error={
                errors.dateOfBirth?.message === "userAgeTooLow" && (
                  <Typography as={"span"} variant={"small_text"}>
                    <Translation
                      tags={{
                        1: () => (
                          <Typography
                            as={Link}
                            href={"/auth/privacy-policy"}
                            style={{ textDecoration: "underline" }}
                          >
                            {t.auth.privacyPolicy}
                          </Typography>
                        )
                      }}
                      text={t.editProfile.generalInformation.userAgeProfile}
                    />
                  </Typography>
                )
              }
              labelText={t.editProfile.generalInformation.dateOfBirth}
              locale={locale === "en" ? enUS : ru}
              name={"dateOfBirth"}
            />
            <div className={s.location}>
              <div className={s.country}>
                <FormSelect
                  control={control}
                  labelText={t.editProfile.generalInformation.country}
                  name={"country"}
                  options={countries}
                  placeholder={t.editProfile.generalInformation.countryDefaultValue}
                />
              </div>
              <div className={s.city}>
                <FormSelect
                  control={control}
                  labelText={t.editProfile.generalInformation.city}
                  name={"city"}
                  options={cities}
                  placeholder={t.editProfile.generalInformation.cityDefaultValue}
                />
              </div>
            </div>
            <FormTextArea
              control={control}
              labelText={t.editProfile.generalInformation.aboutMe}
              name={"aboutMe"}
            />
            <Button
              className={s.saveButton}
              disabled={!isValid || isLoadingEditProfile}
              type={"submit"}
              variant={"primary"}
            >
              {t.editProfile.generalInformation.saveChanges}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
