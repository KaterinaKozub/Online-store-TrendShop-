import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const ContactsListItems = () => {
  const { lang, translations } = useLang()

  return (
    <>
      <li className='nav-menu__accordion__item'>
        <a
          href='tel:+380970938900'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
        >
          +380 (97) 093-89-00
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <a
          href='mailto:kkozub13@gmail.com'
          className='nav-menu__accordion__item__link'
        >
          Email
        </a>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='https://t.me/KozubKaterina'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.tg}
        </Link>
      </li>
    </>
  )
}

export default ContactsListItems