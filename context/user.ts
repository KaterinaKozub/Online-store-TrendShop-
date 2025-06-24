
import api from '../api/apiInstance'
import { handleJWTError } from "@/lib/utils/errors";
import { IUser } from "@/types/user";
import { createDomain, createEffect, sample } from "effector";
import toast from 'react-hot-toast';

export const loginCheckFx = createEffect(async ({jwt}: {jwt: string}) => {
    try {
        const {data} = await api.get('/api/users/login-check', {
            headers: {Authorization:  `Bearer ${jwt}`}
        })

        if (data?. error){
            handleJWTError(data.error.name, {
                repeatRequestMethodName: 'loginCheckFx'
            })
            return
        }

        setIsAuth(true)
        return data.user
    } catch (error) {
        toast.error((error as Error).message)
    }
} )

export const userDomain = createDomain('user');

export const setIsAuth = userDomain.createEvent<boolean>();
export const $isAuth = userDomain.createStore(false).on(setIsAuth, (_, payload) => payload);

export const loginCheck = userDomain.createEvent<{ jwt: string }>();

export const $user = userDomain
  .createStore<IUser | null>(null)
  .on(loginCheckFx.done, (_, { result }) => {
    if (result) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    return result;
  });

sample({
  clock: loginCheck,
  fn: ({ jwt }) => ({ jwt }),
  target: loginCheckFx,
});

loginCheckFx.fail.watch(({ error }) => {
  console.error('❌ Login failed:', error);
});
