import { Avatar } from "@/services/profile/profile.types"
import { IconImageOutline } from "@teamlead.incubator/ui-kit"

import s from "@/components/profile/profilePhoto/profilePhoto.module.scss"

type Props = {
  avatar?: Avatar[]
  t?: string
}
//TODO сделать более универсальной
export const DefaultAvatar = ({ avatar, t }: Props) => {
  return (
    <div className={s.photo}>
      {avatar?.length ? <img alt={t} src={avatar[0].url} /> : <IconImageOutline />}
    </div>
  )
}
