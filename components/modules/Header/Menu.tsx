
import Logo from "@/components/elements/Logo/Logo";
import { AllowedLangs } from "@/constants/lang";
import { setLang } from "@/context/lang";
import { $menuIsOpen, closeMenu } from "@/context/modals";
import { useLang } from "@/hooks/useLang";
import { removeOverflowHiddenFromBody } from "@/lib/utils/common";

import { useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Accordion from "../Accordion/Accordion";
import { usePathname } from "next/navigation";
import MenuLinkItem from "./MenuLinkItem";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import BuyersListItems from "./BuyersListItems";
import ContactsListItems from "./ContactsListItems";


const Menu = () => {
    const [activeListId, setActiveListId] = useState(0)
    const menuIsOpen = useUnit($menuIsOpen)
    const { lang, translations } = useLang();
    const pathname = usePathname()
    const isMedia800 = useMediaQuery(800)
    const isMedia640 = useMediaQuery(640)



    const handleSwitchLang = (lang: string) => {
        setLang(lang as AllowedLangs)
        localStorage.setItem('lang', JSON.stringify(lang))
    }

    const handleSwitchLangToUk = () => handleSwitchLang('uk')
    const handleSwitchLangToEn = () => handleSwitchLang('en')

    const handleShowCatalogList = () => setActiveListId(1)
    const handleShowBuyersList = () => setActiveListId(2)
    const handleShowContactsList = () => setActiveListId(3)

    const handleCloseMenu = () => {
        removeOverflowHiddenFromBody()
        closeMenu()
        setActiveListId(0)
    }

    const handleRedirectToCatalog = (path: string) => {
        if (pathname.includes('/catalog')) {
          window.history.pushState({ path }, '', path)
          window.location.reload()
        }
    
        handleCloseMenu()
      }

    const clothLinks = [
        {
            id: 1,
            text: translations[lang].comparison['t-shirts'],
            href: '/catalog/cloth?offset=0&type=t-shirts',
        },
        {
            id: 2,
            text: translations[lang].comparison['shirts'],
             href: '/catalog/cloth?offset=0&type=shirts'
        },
        {
            id: 3,
            text: translations[lang].comparison['trousers'],
            href: '/catalog/cloth?offset=0&type=trousers'
        },
        {
            id: 4,
            text: translations[lang].comparison['shorts'],
            href: '/catalog/cloth?offset=0&type=shorts'
        },
        {
            id: 5,
            text: translations[lang].comparison['sports_suits'],
            href: '/catalog/cloth?offset=0&type=sports_suits'
        },
        {
            id: 6,
            text: translations[lang].comparison['hoodie'],
            href: '/catalog/cloth?offset=0&type=hoodie'
        },
        {
            id: 7,
            text: translations[lang].comparison['dresses'],
            href: '/catalog/cloth?offset=0&type=dresses'
        },
        {
            id: 8,
            text: translations[lang].comparison['sweaters'],
            href: '/catalog/cloth?offset=0&type=sweaters'
        },
        {
            id: 9,
            text: translations[lang].comparison['skirts'],
            href: '/catalog/cloth?offset=0&type=skirts'
        },
    ]

    const footwearLinks = [
        {
            id: 1,
            text: translations[lang].comparison.sneakers,
            href: '/catalog/footwear?offset=0&type=sneakers'
        },
        {
            id: 2,
            text: translations[lang].comparison.shoes,
            href: '/catalog/footwear?offset=0&type=shoes'
        }
    ]

    const outerwearLinks = [
        {
            id: 1,
            text: translations[lang].comparison['jackets'],
            href: '/catalog/outerwear?offset=0&type=jackets'
        },
        {
            id: 2,
            text: translations[lang].comparison['coat'],
            href: '/catalog/outerwear?offset=0&type=coat'
        }
    ]

    const accessoriesLinks = [
        {
            id: 1,
            text: translations[lang].comparison.belts,
            href: '/catalog/accessories?offset=0&type=belts'
        },
        {
            id:2,
            text: translations[lang].comparison['bags'],
            href: '/catalog/accessories?offset=0&type=bags'
        },
        {
            id: 3,
            text: translations[lang].comparison['backpacks'],
            href: '/catalog/accessories?offset=0&type=backpacks'

        }
    ]

    const  jewelry_watchesLinks = [
        {
            id: 1,
            text: translations[lang].comparison['watches'],
            href: '/catalog/jewelry_watches?offset=0&type=watches'
        },
        {
            id: 2,
            text: translations[lang].comparison['bracelets'],
            href: '/catalog/jewelry_watches?offset=0&type=bracelets'
        },
        {
            id: 3,
            text: translations[lang].comparison['earrings'],
            href: '/catalog/jewelry_watches?offset=0&type=earrings'
        },
        {
            id: 4,
            text: translations[lang].comparison['pendant'],
            href: '/catalog/jewelry_watches?offset=0&type=pendant'
        }
    ]

    return (
        <nav className={`nav-menu ${menuIsOpen ? "open" : "close"}`}>
            <div className="container nav-menu__container">
                <div className={`nav-menu__logo ${menuIsOpen ? 'open' : ''}`}>
                    <Logo />
                </div>
            <button
                className={`btn-reset nav-menu__close ${$menuIsOpen ? 'open' : ''}`}
                onClick={handleCloseMenu}
            />
            <div className={`nav-menu__lang ${menuIsOpen ? "open" : ""}`}>
                <button
                    className={`btn-reset nav-menu__lang__btn  ${
                        lang === 'uk' ? 'lang-active' : ''
                    }`}
                    onClick={handleSwitchLangToUk}
                >
                    UK
                </button>
                <button
                    className={`btn-reset nav-menu__lang__btn ${
                        lang === 'en' ? 'lang-active' : ''
                    }`}
                    onClick={handleSwitchLangToEn}
                >
                    EN
                </button>
            </div>
            <ul className={`list-reset nav-menu__list ${menuIsOpen ? 'open' : ''}`}>
                {!isMedia800 && 
                <li className='nav-menu__list__item'>
                    <button
                        className='btn-reset nav-menu__list__item__btn'
                        onMouseEnter={handleShowCatalogList}
                    >
                        {translations[lang].main_menu.catalog}
                    </button>
                    <AnimatePresence>
                        {activeListId === 1 && (
                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='list-reset nav-menu__accordion'
                                >
                                <li className='nav-menu__accordion__item'>
                                <Accordion
                                    title={translations[lang].main_menu.cloth}
                                    titleClass='btn-reset nav-menu__accordion__item__title'
                                >
                                    <ul className='list-reset nav-menu__accordion__item__list'>
                                        {clothLinks.map((item) => (
                                            <MenuLinkItem
                                                key={item.id}
                                                item={item}
                                                handleRedirectToCatalog={handleRedirectToCatalog}
                                            />
                                        ))}
                                    </ul>
                                </Accordion>
                                </li> 
                                <li className='nav-menu__accordion__item'>
                                <Accordion
                                    title={translations[lang].main_menu.footwear}
                                    titleClass='btn-reset nav-menu__accordion__item__title'
                                >
                                    <ul className='list-reset nav-menu__accordion__item__list'>
                                        {footwearLinks.map((item) => (
                                            <MenuLinkItem
                                                key={item.id}
                                                item={item}
                                                handleRedirectToCatalog={handleRedirectToCatalog}
                                            />
                                        ))}
                                    </ul>
                                </Accordion>
                                </li> 
                                <li className='nav-menu__accordion__item'>
                                <Accordion
                                    title={translations[lang].main_menu.outerwear}
                                    titleClass='btn-reset nav-menu__accordion__item__title'
                                >
                                    <ul className='list-reset nav-menu__accordion__item__list'>
                                        {outerwearLinks.map((item) => (
                                            <MenuLinkItem
                                                key={item.id}
                                                item={item}
                                                handleRedirectToCatalog={handleRedirectToCatalog}
                                            />
                                        ))}
                                    </ul>
                                </Accordion>
                                </li> 
                                <li className='nav-menu__accordion__item'>
                                <Accordion
                                    title={translations[lang].main_menu.accessories}
                                    titleClass='btn-reset nav-menu__accordion__item__title'
                                >
                                    <ul className='list-reset nav-menu__accordion__item__list'>
                                        {accessoriesLinks.map((item) => (
                                            <MenuLinkItem
                                                key={item.id}
                                                item={item}
                                                handleRedirectToCatalog={handleRedirectToCatalog}
                                            />
                                        ))}
                                    </ul>
                                </Accordion>
                                </li> 
                                <li className='nav-menu__accordion__item'>
                                <Accordion
                                    title={translations[lang].main_menu.jewelry_watches}
                                    titleClass='btn-reset nav-menu__accordion__item__title'
                                >
                                    <ul className='list-reset nav-menu__accordion__item__list'>
                                        {jewelry_watchesLinks.map((item) => (
                                            <MenuLinkItem
                                                key={item.id}
                                                item={item}
                                                handleRedirectToCatalog={handleRedirectToCatalog}
                                            />
                                        ))}
                                    </ul>
                                </Accordion>
                                </li> 
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </li>}
                <li className='nav-menu__list__item'>
                    {!isMedia640 &&
                    <button 
                        className='btn-reset nav-menu__list__item__btn'
                        onMouseEnter={handleShowBuyersList}
                    >
                        {translations[lang].main_menu.buyers}
                    </button>}
                    {!isMedia640 &&
                        (<AnimatePresence>
                        {activeListId === 2 && (
                            <motion.ul
                                initial = {{opacity: 0}}
                                animate = {{opacity: 1}}
                                exit={{opacity: 0}}
                                className="list-reset nav-menu__accordion"
                            >
                               <BuyersListItems/>
                            </motion.ul>
                        )}
                        </AnimatePresence>
                    )}
                    {isMedia640 && (
                        <Accordion
                            title={translations[lang].main_menu.buyers}
                            titleClass='btn-reset nav-menu__list__item__btn'
                        >
                        <ul className='list-reset nav-menu__accordion__item__list'>
                            <BuyersListItems />
                        </ul>
                    </Accordion>
                    )}
                </li>
                <li className='nav-menu__list__item'>
                    {!isMedia640 &&
                    <button
                        className='btn-reset nav-menu__list__item__btn'
                        onMouseEnter={handleShowContactsList}
                    >
                        {translations[lang].main_menu.contacts}
                    </button>}
                    {!isMedia640 &&
                        (<AnimatePresence>
                        {activeListId === 3 && (
                            <motion.ul
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className='list-reset nav-menu__accordion'
                            >
                                <ContactsListItems/>

                            </motion.ul>
                        )}
                    </AnimatePresence>
                    )}
                    {isMedia640 && (
                        <Accordion
                            title={translations[lang].main_menu.contacts}
                            titleClass='btn-reset nav-menu__list__item__btn'
                        >
                            <ul className='list-reset nav-menu__accordion__item__list'>
                                <ContactsListItems />
                            </ul>
                        </Accordion>
                    )}
                </li>
            </ul>
            </div>
        </nav>
    );
};

export default Menu;