import { $user } from '@/context/user'
import { useUnit } from 'effector-react'
import { useState, useEffect } from 'react'

export const useUserAvatar = () => {
  const user = useUnit($user)
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (user && user.image) {
      setSrc(user.image)
      return
    }

    const localStorageItem = localStorage.getItem('@@oneclientjs@@::l3Q4jO58IChQRwUkzkHI::@@user@@')

    if (localStorageItem) {
      try {
        const oauthAvatar = JSON.parse(localStorageItem)
        const photoURL = oauthAvatar?.decodedToken?.user?.photoURL
        if (photoURL) {
          setSrc(photoURL)
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error)
      }
    }
  }, [user])

  return { src, alt: user?.name || 'profile' }
}
