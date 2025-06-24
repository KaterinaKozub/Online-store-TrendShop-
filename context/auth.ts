'use client'
import { handleJWTError } from "@/lib/utils/errors";
import { ISignUpFx } from "@/types/authPopup";
import { ILoginCheckFx } from "@/types/user";
import { createDomain, createEffect, sample } from "effector";
import toast from "react-hot-toast";
import api from '../api/apiInstance'
import { onAuthSuccess } from "@/lib/utils/auth";

export const signUpFx = createEffect(async ({ name, password, email }: ISignUpFx) => {
  try {
    const { data } = await api.post('/api/users/signup', { name, password, email });

    if (data.warningMessage) {
      toast.error(data.warningMessage);
      return null; // Явно возвращаем null при ошибке
    }

    onAuthSuccess('Реєстрація пройшла успішно!', data);

    return data;
  } catch (error) {
    toast.error((error as Error).message);
    return null;
  }
});

export const signInFx = createEffect(async ({ email, password }: ISignUpFx) => {
  try {
    const { data } = await api.post('/api/users/login', { email, password });

    if (data.warningMessage) {
      toast.error(data.warningMessage);
      return null;
    }

    onAuthSuccess('Вхід виконаний!', data);

    return data;
  } catch (error) {
    toast.error((error as Error).message);
    return null;
  }
})



export const refreshTokenFx = createEffect(async ({jwt}: {jwt: string}) => {
    const {data} = await api.post('/api/users/refresh', {jwt})

    localStorage.setItem('auth', JSON.stringify(data))

    return data
})

const auth = createDomain()

export const openAuthPopup = auth.createEvent()
export const closeAuthPopup = auth.createEvent()
export const handleSignUp = auth.createEvent<ISignUpFx>()
export const handleSignIn = auth.createEvent<ISignUpFx>()
export const setIsAuth = auth.createEvent<boolean>()

export const $openAuthPopup = auth
    .createStore<boolean>(false)
    .on(openAuthPopup, () => true)
    .on(closeAuthPopup, () => false)

export const $isAuth = auth
    .createStore(false)
    .on(setIsAuth, (_, isAuth) => isAuth)

    export const $auth = auth
  .createStore({})
  .on(signInFx.done, (_, { result }) => result)
  .on(signInFx.fail, (_, { error }) => {
    toast.error(error.message)
  })
  .on(signInFx.done, (_, { result }) => result)
  .on(signInFx.fail, (_, { error }) => {
    toast.error(error.message)
  })

  sample({
    clock: handleSignUp,
    source: $auth,
    fn: (_, { name, email, password, isOAuth }) => ({
      name,
      password,
      email,
      isOAuth,
    }),
    target: signUpFx ,
  })
  
  sample({
    clock: handleSignIn,
    source: $auth,
    fn: (_, { email, password, isOAuth, name }) => ({
      email,
      password,
      isOAuth,
      name,
    }),
    target: signInFx,
  })