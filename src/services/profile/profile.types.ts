export type UploadAvatarArgs = {
  avatar: File
}

export type UploadAvatarResponse = {
  avatars: Avatar[]
}

export type ProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type UpdateProfileArgs = {
  aboutMe: string
  city: string
  country: string
  dateOfBirth: string
  firstName: string
  lastName: string
  userName: string
}

export type PublicUserResponse = {
  aboutMe: string
  avatars: Avatar[]
  id: number
  userName: string
}
