'use client'

import { useLang } from "@/hooks/useLang";
import Logo from "@/components/elements/Logo/Logo";
import Link from "next/link";
import Menu from "./Menu";
import { openMenu, openSearchModal } from "@/context/modals";
import { addOverflowHiddenToBody, handleOpenAuthPopup, triggerLoginCheck } from "@/lib/utils/common";
import CartPopup from "./CartPopup/CartPopup";
import HeaderProfile from "./HeaderProfile";
import { useUnit } from "effector-react";
import { $isAuth,  } from "@/context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { $user, loginCheckFx } from "@/context/user";
import { $cart, $cartFromLs, addProductsFromLSToCart, setCartFromLS, setShouldShowEmpty } from "@/context/cart";
import { setLang } from "@/context/lang";
import { useGoodsByAuth } from "@/hooks/useGoodsByAuth";
import { $favorites, $favoritesFromLS, addProductsFromLSToFavorites, setFavoritesFromLS, setShouldShowEmptyFavorites } from "@/context/favorites";
import { $comparison, $comparisonFromLs, addProductsFromLSToComparison, setComparisonFromLS, setShouldShowEmptyComparison } from "@/context/comparison";

const Header = () => {
    const isAuth = useUnit($isAuth);
    const loginCheckSpinner = useUnit(loginCheckFx.pending);
    const { lang, translations } = useLang();
    const user = useUnit($user);
    const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs);
    const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
    const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLs)

    console.log(currentCartByAuth);

    const handleOpenMenu = () => {
        addOverflowHiddenToBody();
        openMenu();
    };

    const handleOpenSearchModal = () => {
        openSearchModal();
        addOverflowHiddenToBody();
    };

    useEffect(() => {
  const auth = JSON.parse(localStorage.getItem('auth') as string)
  const lang = JSON.parse(localStorage.getItem('lang') as string)
  const cart = JSON.parse(localStorage.getItem('cart') as string)
  const favoritesFromLS = JSON.parse(
    localStorage.getItem('favorites') as string
  )
  const comparisonFromLS = JSON.parse(
    localStorage.getItem('comparison') as string
  )

  if (lang && (lang === 'uk' || lang === 'en')) {
    setLang(lang)
  }

  triggerLoginCheck()

  if (!favoritesFromLS || !favoritesFromLS.length) {
    setShouldShowEmptyFavorites(true)
  } else if (Array.isArray(favoritesFromLS)) {
    setFavoritesFromLS(favoritesFromLS)
  }

  if (!cart || !cart.length) {
    setShouldShowEmpty(true)
  } else if (Array.isArray(cart)) {
    setCartFromLS(cart)
  }

  if (!comparisonFromLS || !comparisonFromLS.length) {
    setShouldShowEmptyComparison(true)
  } else if (Array.isArray(comparisonFromLS)) {
    setComparisonFromLS(comparisonFromLS)
  }

  // Якщо хочеш щось робити з auth — зроби це тут, але БЕЗ return
  if (auth?.accessToken) {
    // наприклад:
    console.log('Користувач авторизований')
  }

}, [])


useEffect(() => {
    if (isAuth) {
      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)
      const favoritesFromLS = JSON.parse(
        localStorage.getItem('favorites') as string
      )
      const comparisonFromLS = JSON.parse(
        localStorage.getItem('comparison') as string
      )

      if (cartFromLS && Array.isArray(cartFromLS)) {
        addProductsFromLSToCart({
          jwt: auth.accessToken,
          cartItems: cartFromLS,
        })
      }

      if (favoritesFromLS && Array.isArray(favoritesFromLS)) {
        addProductsFromLSToFavorites({
          jwt: auth.accessToken,
          favoriteItems: favoritesFromLS,
        })
      }

      if (comparisonFromLS && Array.isArray(comparisonFromLS)) {
        addProductsFromLSToComparison({
          jwt: auth.accessToken,
          comparisonItems: comparisonFromLS,
        })
      }
    }
  }, [isAuth])

    return (
        <header className='header'>
            <div className='container header__container'>
                <button className='btn-reset header__burger' onClick={handleOpenMenu}>
                    {translations[lang].header.menu_btn}
                </button>
                <Menu />
                <div className='header__logo'>
                    <Logo />
                </div>
                <ul className='header__links list-reset'>
                    <li className='header__links__item'>
                        <button
                            className='btn-reset header__links__item__btn header__links__item__btn--search'
                            onClick={handleOpenSearchModal}
                        />
                    </li>
                    <li className='header__links__item'>
                        <Link
                            href='/favorites'
                            className='header__links__item__btn header__links__item__btn--favorites'
                        >
                           {!!currentFavoritesByAuth.length && (
                                <span className='not-empty' />
                            )}  
                        </Link>
                    </li>
                    <li className='header__links__item'>
                        <Link
                            href='/comparison'
                            className='header__links__item__btn header__links__item__btn--compare'
                        >
                          {!!currentComparisonByAuth.length && (
                            <span className='not-empty' />
                          )}
                        </Link>
                    </li>
                    <li className='header__links__item'>
                        <CartPopup />
                    </li>
                    <li className='header__links__item header__links__item--profile'>
                        {isAuth ? (
                            <HeaderProfile />
                        ) : loginCheckSpinner ? (
                            <FontAwesomeIcon icon={faSpinner} spin />
                        ) : (
                            <button
                                className='btn-reset header__links__item__btn header__links__item__btn--profile'
                                onClick={handleOpenAuthPopup}
                            />
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;