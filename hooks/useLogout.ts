import { setIsAuth } from "@/context/auth"
import { useRouter } from 'next/navigation'  

export const useUserLogout = () => {
  const router = useRouter()

  return () => {
    localStorage.removeItem('auth') 
    setIsAuth(false) 
    router.push('/') 
    window.location.reload() 
  }
}
