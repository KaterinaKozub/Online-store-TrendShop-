import { forwardRef } from 'react'
import Image from 'next/image'
import { IWrappedComponentProps } from '@/types/hocs'
import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useUserLogout } from '@/hooks/useLogout'
import { useLang } from '@/hooks/useLang'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useUserAvatar } from '@/hooks/useUserAvatar' 

const HeaderProfile = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const handleTogglePopup = () => setOpen(!open)
    const handleLogout = useUserLogout()
    const { lang, translations } = useLang()

  
    const { src, alt } = useUserAvatar()

    return (
      <div className='header-profile__wrapper' ref={ref}>
        <button
          className='btn-reset header-profile__btn'
          onClick={handleTogglePopup}
        >
          <Image
            src={src ? src : '/img/profile.svg'}
            alt={alt ? alt : 'profile'}
            width={24}
            height={24}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className='list-reset header-profile__inner'
            >
              <li className='header-profile__arrow' />
              <li className='header-profile__item'>
                <Link
                  href='/profile'
                  className='btn-reset header-profile__item__btn'
                >
                  {translations[lang].header.profile}
                </Link>
              </li>
              <li className='header-profile__item'>
                <button
                  className='btn-reset header-profile__item__btn'
                  onClick={handleLogout}
                >
                  {translations[lang].header.logout}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

HeaderProfile.displayName = 'HeaderProfile'

export default withClickOutside(HeaderProfile)