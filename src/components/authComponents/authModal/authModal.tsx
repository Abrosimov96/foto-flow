import { useTranslation } from "@/utils/hooks/useTranslation"
import { Button, Modal, Typography } from "@teamlead.incubator/ui-kit"

import s from "./authModal.module.scss"

type EmailSentModalProps = {
  description: string
  isOpen: boolean
  onClose: () => void
  title: string
}

export const AuthModal = ({ description, isOpen, onClose, title }: EmailSentModalProps) => {
  const { t } = useTranslation()

  return (
    <Modal className={s.modal} onOpenChange={onClose} open={isOpen} title={title}>
      <div className={s.modalContent}>
        <Typography>{description}</Typography>
        <Button className={s.modalButton} onClick={onClose} variant={"primary"}>
          {t.commonWords.ok}
        </Button>
      </div>
    </Modal>
  )
}
