export interface IUser{
    _id: string
    name: string
    password: string
    email: string
    image: string
    role: string
}

export interface ILoginCheckFx {
  jwt: string
  setShouldShowContent?: (arg0: boolean) => void
}