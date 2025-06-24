'use client'
import AllLink from "@/components/elements/AllLink/AllLink";
import useImagePreloader from "@/hooks/useImagePreloader";
import { useLang } from "@/hooks/useLang";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import img1 from '@/public/img/categories-img-1.png'
import img2 from '@/public/img/categories-img-2.png'
import img3 from '@/public/img/categories-img-3.png'
import img4 from '@/public/img/categories-img-4.png'
import img5 from '@/public/img/categories-img-5.png'
import styles from '@/styles/main-page/index.module.scss'
import Image from "next/image";
import Link from "next/link";
import MainSlider from "../MainSlider";


const Categories = () => {
    const { lang, translations } = useLang()
    const isMedia490 = useMediaQuery(490)
    const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
    const imgSpinnerClass = imgSpinner ? styles.img_loading : ''


    const images = [
      {
        src: img1,
        id: 1,
        title: translations[lang].main_page.category_cloth
      },
      {
        src: img2,
        id: 2,
        title: translations[lang].main_page.category_footwear
      },
      {
        src: img5,
        id: 3,
        title: translations[lang].main_page.catalog_outerwear
      },
      {
        src: img3,
        id: 4,
        title: translations[lang].main_page.category_accessories
      },
      {
        src: img4,
        id: 5,
        title: translations[lang].main_page.catalog_jewelry_watches
      }
    ]

    return (
        <section className={styles.categories}>
            <div className={`container ${styles.categories__container}`}>
            <h2 className={`site-title ${styles.categories__title}`}>
                {translations[lang].main_page.category_title}
            </h2>
            <div className={styles.categories__inner}>
                <AllLink/>
                {!isMedia490 &&(
                  <>
                  <div className={styles.categories__left}>
                  <div className={styles.categories__left__top}>
                    <Link
                href='/catalog/cloth'
                className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
              >
                <Image
                  src={img1}
                  alt='Cloth'
                  width={300}
                  height={400}
                  className='transition-opacity opacity-0 duration'
                  onLoad={handleLoadingImageComplete}
                />
                <span>{translations[lang].main_page.category_cloth}</span>
              </Link>
              
                  <Link
                     href='/catalog/footwear'
                     className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                     <Image
                      src={img2}
                      alt='Footwear'
                      width={300}
                      height={400}
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>
                      {translations[lang].main_page.category_footwear}
                    </span>
                  </Link>
                  <Link
                  href='/catalog/outerwear'
                  className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <Image
                    src={img5}
                    alt='Outerwear'
                    width={300}
                    height={400}
                    className='transition-opacity opacity-0 duration'
                    onLoad={handleLoadingImageComplete}
                  />
                  <span>
                    {translations[lang].main_page.catalog_outerwear}
                  </span>
                </Link>
                  <Link
                    href='/catalog/accessories'
                    className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={img3}
                      alt='Accessories'
                      width={300}
                      height={400}
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>
                      {translations[lang].main_page.category_accessories}
                    </span>
                  </Link>
                  <Link
                    href='/catalog/jewelry_watches'
                    className={`${styles.categories__left__top__right} ${styles.categories__img} ${imgSpinnerClass}`}
                  >
                    <Image
                      src={img4}
                      alt='Jewelry and Watches'
                      width={300}
                      height={400}
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                    <span>
                      {translations[lang].main_page.catalog_jewelry_watches}
                    </span>
                  </Link>
                </div>
              </div>
                  </>
                )}
                {isMedia490 && <MainSlider images={images}/>}
            </div>
            </div>
        </section>
    );
};

export default Categories;