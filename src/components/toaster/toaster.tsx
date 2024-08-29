import { IconClose } from "@teamlead.incubator/ui-kit"
import { Toaster as Sonner, toast } from "sonner"

import s from "./toaster.module.scss"

export const Toaster = () => {
  return (
    <Sonner
      position={"bottom-left"}
      toastOptions={{
        classNames: {
          cancelButton: s.close,
          icon: s.emptyIcon,
          title: s.text,
          toast: s.toast
        },
        unstyled: true
      }}
    />
  )
}

type ToastTypes = "error" | "info" | "loading" | "success" | "warning"
export function callToaster(type: ToastTypes, message: string) {
  return toast[type](message, {
    cancel: {
      label: <IconClose />,
      onClick: () => {}
    }
  })
}
