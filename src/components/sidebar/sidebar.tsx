import { useState } from "react"

import { useMeQuery, useSignOutMutation } from "@/services/auth.service"
import { useTranslation } from "@/utils/hooks/useTranslation"
import {
  Button,
  IconBookmarkOutline,
  IconHomeOutline,
  IconLogOut,
  IconMessageCircleOutline,
  IconPersonOutline,
  IconPlusSquareOutline,
  IconSearch,
  IconTrendingUp,
  Modal,
  Typography
} from "@teamlead.incubator/ui-kit"
import Link from "next/link"
import { useRouter } from "next/router"

import s from "./sidebar.module.scss"

export const Sidebar = () => {
  const { t } = useTranslation()

  return (
    <aside className={s.sidebar}>
      <nav>
        <ul className={s.primaryNav}>
          <li>
            <Button as={Link} href={"/"}>
              <IconHomeOutline /> {t.sidebar.home}
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/"}>
              <IconPlusSquareOutline /> {t.sidebar.create}
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/"}>
              <IconPersonOutline /> {t.sidebar.myProfile}
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/"}>
              <IconMessageCircleOutline /> {t.sidebar.messenger}
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/"}>
              <IconSearch /> {t.sidebar.search}
            </Button>
          </li>
        </ul>
        <ul className={s.secondaryNav}>
          <li>
            <Button as={Link} href={"/"}>
              <IconTrendingUp /> {t.sidebar.statistics}
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/"}>
              <IconBookmarkOutline /> {t.sidebar.favorites}
            </Button>
          </li>
        </ul>
        <SignOutModal />
      </nav>
    </aside>
  )
}

const SignOutModal = () => {
  const [isLogout, setIsLogout] = useState(false)
  const [signOut] = useSignOutMutation()
  const { t } = useTranslation()

  const closeModal = () => {
    setIsLogout(false)
  }
  const { data: dataMe } = useMeQuery()
  const router = useRouter()

  return (
    <Modal
      onOpenChange={setIsLogout}
      open={isLogout}
      title={`${t.sidebar.logOut}`}
      trigger={
        <Button>
          <IconLogOut /> {t.sidebar.logOut}
        </Button>
      }
    >
      <div className={s.modalBody}>
        <Typography variant={"regular_text_16"}>
          {t.sidebar.logOutModalMessage(dataMe?.email ?? "")}
        </Typography>
        <div className={s.btnActionContainer}>
          <Button
            onClick={() => {
              signOut()
                .unwrap()
                .then(() => {
                  closeModal()
                  void router.push(`/auth/sign-in`)
                })
            }}
            variant={"secondary"}
          >
            {t.commonWords.yes}
          </Button>
          <Button onClick={closeModal} variant={"primary"}>
            {t.commonWords.no}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
