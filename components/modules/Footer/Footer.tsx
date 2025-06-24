import Logo from "@/components/elements/Logo/Logo";
import { useLang } from "@/hooks/useLang";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import FooterMobileLink from "./FooterMobileLink";
import Link from "next/link";

const Footer = () => {
  const { lang, translations } = useLang();
  const isMedia950 = useMediaQuery(950);
  const isMedia640 = useMediaQuery(640);

  return (
    <footer className='footer'>
      <div className='footer__top'>
        <div className='container footer__top__container'>
          <div className='footer__logo'>
            <Logo />
          </div>

          
          <div className='footer__contacts'>
            {isMedia950 ? (
              <>
                <a href='tel:+380970938900'>📞 +380 (97) 093-89-00</a>
                <br />
                <a href='mailto:kkozub13@gmail.com'>📧 kkozub13@gmail.com</a>
              </>
            ) : (
              <>
                <span>
                  <a href='tel:+380970938900'>+380 (97) 093-89-00</a>
                </span>
                <span>
                  <a href='mailto:kkozub13@gmail.com'>kkozub13@gmail.com</a>
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className='footer__bottom'>
        <div className='container footer__bottom__container'>
          <div className='footer__copyright'>
            © 2025 {translations[lang].footer.copyright}
            <br />
            (18+)
          </div>

          <div className='footer__policy'>
            <div className='footer__policy__inner'>
              <Link href='/personal-data-policy'>
                {translations[lang].footer.policy}
              </Link>
              <Link href='/privacy-policy'>
                {translations[lang].footer.privacy}
              </Link>
            </div>

            {isMedia640 ? (
              <FooterMobileLink text={translations[lang].footer.full_version} />
            ) : (
              <FooterMobileLink text={translations[lang].footer.mobile_version} />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
