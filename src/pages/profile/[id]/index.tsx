import { Loader } from "@/components"
import { DefaultAvatar } from "@/components/profile/profilePhoto/defaultAvatar"
import { useMeQuery } from "@/services/auth.service"
import { useGetPublicUserQuery } from "@/services/profile/publicUsers.service"
import { Button, Typography } from "@teamlead.incubator/ui-kit"
import Link from "next/link"
import { useRouter } from "next/router"

const Profile = () => {
  const { data, isLoading: isLoadingMe } = useMeQuery()
  const router = useRouter()

  const userId = router.query.id as string

  const { data: publicUser, isLoading: isLoadingUser } = useGetPublicUserQuery(userId)

  const isMyProfile = data?.userId === parseInt(userId)

  if (isLoadingUser || isLoadingMe) {
    return <Loader />
  }
  if (!publicUser) {
    return <div>Страница пользователя удалена</div>
  }

  return (
    <>
      <div>
        {<DefaultAvatar avatar={publicUser.avatars} />}
        <Typography as={"h1"}>{publicUser?.userName}</Typography>
      </div>
      {isMyProfile && (
        <Button as={Link} href={`/profile/${userId}/edit`} variant={"secondary"}>
          Edit Profile
        </Button>
      )}
    </>
  )
}

export default Profile
