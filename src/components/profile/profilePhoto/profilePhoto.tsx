import { Loader, callToaster } from "@/components"
import { DefaultAvatar } from "@/components/profile/profilePhoto/defaultAvatar"
import { useProfilePhoto } from "@/components/profile/profilePhoto/useProfilePhoto"
import { Button, IconClose, Modal, Typography } from "@teamlead.incubator/ui-kit"

import s from "./profilePhoto.module.scss"

export const ProfilePhoto = () => {
  const {
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
  } = useProfilePhoto()

  if (uploadAvatarError) {
    callToaster("error", uploadAvatarError)
  }

  if (deleteAvatarError) {
    callToaster("error", deleteAvatarError)
  }

  // const hasAvatar = data?.avatars?.[0]?.url
  const hasAvatar = data?.avatars

  /*  const ProfileAvatarImage = hasAvatar ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={t.profilePhoto.photo} src={data.avatars[0].url} />
  ) : (
    <IconImageOutline />
  )*/

  //TODO поправить стили (при загрузке прыгает вёрстка)
  if (isLoading) {
    return <Loader />
  }

  const modalAvatar = avatar ? (
    <div className={s.modalAvatarPreviewContainer}>
      <div className={s.modalAvatarPreview}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={t.profilePhoto.photoPreview} src={URL.createObjectURL(avatar)} />
      </div>
      <Button className={s.modalSaveButton} onClick={saveAvatar} variant={"primary"}>
        {t.commonWords.save}
      </Button>
    </div>
  ) : (
    <div className={s.modalSelectAvatarContainer}>
      {fileError && <div className={s.modalError}>{fileError}</div>}
      <DefaultAvatar />
      <Button onClick={selectAvatar} variant={"primary"}>
        {t.profilePhoto.selectPhoto}
      </Button>
      <input
        accept={"image/jpeg, image/png"}
        hidden
        onChange={changeAvatar}
        ref={inputUploadAvatar}
        type={"file"}
      />
    </div>
  )

  return (
    <>
      <div className={s.profilePhoto}>
        <div className={s.deletePhotoWrapper}>
          {/*<div className={s.photo}>{ProfileAvatarImage}</div>*/}
          <DefaultAvatar avatar={hasAvatar} t={t.profilePhoto.photo} />
          {hasAvatar && (
            <Button className={s.deletePhotoIcon} onClick={openDeleteAvatarModal}>
              <IconClose />
            </Button>
          )}
        </div>
        <Button fullWidth onClick={openUploadAvatarModal} variant={"outlined"}>
          {t.profilePhoto.addPhoto}
        </Button>
      </div>
      <Modal
        className={s.uploadAvatarModal}
        onOpenChange={closeUploadAvatarModal}
        open={isUploadAvatarModalOpen}
        title={t.profilePhoto.addPhoto}
      >
        {modalAvatar}
      </Modal>
      <Modal
        className={s.deleteAvatarModal}
        onOpenChange={closeDeleteAvatarModal}
        open={isDeleteAvatarModalOpen}
        title={t.profilePhoto.deletePhoto}
      >
        <Typography variant={"regular_text_16"}>{t.profilePhoto.deletePhotoConfirm}</Typography>
        <div className={s.buttonContainer}>
          <Button onClick={onDeleteAvatar} variant={"outlined"}>
            {t.commonWords.yes}
          </Button>
          <Button onClick={closeDeleteAvatarModal} variant={"primary"}>
            {t.commonWords.no}
          </Button>
        </div>
      </Modal>
    </>
  )
}
