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
  const router = useRouter()
  const { data } = useMeQuery()

  const { t } = useTranslation()

  return (
    <aside className={s.sidebar}>
      <nav>
        <ul className={s.primaryNav}>
          <li>
            <Button as={Link} href={"/home"}>
              <IconHomeOutline />
              <span className={s.linkText}>{t.sidebar.home}</span>
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/create"}>
              <IconPlusSquareOutline />
              <span className={s.linkText}>{t.sidebar.create}</span>
            </Button>
          </li>
          <li>
            <Button
              as={Link}
              className={router.pathname.startsWith("/profile") ? s.currentpage : undefined}
              href={`/profile/${data?.userId}`}
            >
              <IconPersonOutline />
              <span className={s.linkText}>{t.sidebar.myProfile}</span>
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/messenger"}>
              <IconMessageCircleOutline />
              <span className={s.linkText}>{t.sidebar.messenger}</span>
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/search"}>
              <IconSearch />
              <span className={s.linkText}>{t.sidebar.search}</span>
            </Button>
          </li>
        </ul>
        <ul className={s.secondaryNav}>
          <li>
            <Button as={Link} href={"/statistics"}>
              <IconTrendingUp />
              <span className={s.linkText}>{t.sidebar.statistics}</span>
            </Button>
          </li>
          <li>
            <Button as={Link} href={"/favorites"}>
              <IconBookmarkOutline />
              <span className={s.linkText}>{t.sidebar.favorites}</span>
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
