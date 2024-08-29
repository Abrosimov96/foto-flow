import { ChangeEvent, useRef, useState } from "react"

import { ErrorResponse } from "@/services/auth.types"
import {
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useUploadAvatarMutation
} from "@/services/profile/profile.service"
import { Nullable } from "@/shared/types/nullable"
import { bytesToMegaBytes } from "@/utils/helpers/bytesToMegaBytes"
import { useTranslation } from "@/utils/hooks/useTranslation"

export const useProfilePhoto = () => {
  const { data, isFetching, isLoading: isLoadingProfile } = useGetProfileQuery()
  const [uploadAvatar, { error: uploadError, isLoading: isLoadingUploadAvatar }] =
    useUploadAvatarMutation()
  const [deleteAvatar, { error: deleteError, isLoading: isLoadingDeleteAvatar }] =
    useDeleteAvatarMutation()

  const uploadAvatarError = (uploadError as ErrorResponse)?.data?.messages?.[0]?.message
  const deleteAvatarError = (deleteError as ErrorResponse)?.data?.messages?.[0]?.message

  const isLoading = isFetching || isLoadingProfile || isLoadingUploadAvatar || isLoadingDeleteAvatar

  const { t } = useTranslation()

  const [fileError, setFileError] = useState<Nullable<string>>()
  const [avatar, setAvatar] = useState<Nullable<File>>(null)
  const [isUploadAvatarModalOpen, setIsUploadAvatarModalOpen] = useState(false)
  const [isDeleteAvatarModalOpen, setIsDeleteAvatarModalOpen] = useState(false)

  const openDeleteAvatarModal = () => setIsDeleteAvatarModalOpen(true)
  const closeDeleteAvatarModal = () => setIsDeleteAvatarModalOpen(false)

  const openUploadAvatarModal = () => setIsUploadAvatarModalOpen(true)

  const closeUploadAvatarModal = () => {
    setAvatar(null)
    setIsUploadAvatarModalOpen(false)

    if (fileError) {
      setFileError(null)
    }
  }

  const inputUploadAvatar = useRef<HTMLInputElement>(null)

  const selectAvatar = () => inputUploadAvatar.current?.click()

  const changeAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget?.files?.[0]) {
      const file = event.currentTarget.files[0]

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setFileError(t.profilePhoto.errorPhotoFormat)

        return
      }

      if (bytesToMegaBytes(file.size) >= 10) {
        setFileError(t.profilePhoto.errorPhotoSize)

        return
      }

      setAvatar(file)
    }
  }

  const saveAvatar = () => {
    if (avatar) {
      uploadAvatar({ avatar }).unwrap().then(closeUploadAvatarModal)
    }
  }

  const onDeleteAvatar = () => deleteAvatar().unwrap().then(closeDeleteAvatarModal)

  return {
    avatar,
    changeAvatar,
    closeDeleteAvatarModal,
    closeUploadAvatarModal,
    data,
    deleteAvatarError,
    fileError,
    inputUploadAvatar,
    isDeleteAvatarModalOpen,
    isLoading,
    isUploadAvatarModalOpen,
    onDeleteAvatar,
    openDeleteAvatarModal,
    openUploadAvatarModal,
    saveAvatar,
    selectAvatar,
    t,
    uploadAvatarError
  }
}
