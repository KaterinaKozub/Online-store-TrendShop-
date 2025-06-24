/* eslint-disable indent */
'use client'
import { useProductFilters } from "@/hooks/useProductFilters";
import { IProductsPage } from "@/types/catalog";
import styles from '@/styles/catalog/index.module.scss'
import ReactPaginate from 'react-paginate'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { motion } from "framer-motion";
import { basePropsForMotion } from "@/constants/motion";
import ProductsListItem from "@/components/modules/ProductsListItem/ProductsListItem";
import { useLang } from "@/hooks/useLang";
import HeadingWithCount from "@/components/elements/HeadingWithCount/HeadingWithCount";
import { useEffect } from "react";
import { $catalogCategoryOptions, setCatalogCategoryOptions } from "@/context/catalog";
import { useUnit } from "effector-react";
import CatalogFilters from "@/components/modules/CatalogFilters/CatalogFilters";


const ProductsPage = ({searchParams, pageName}: IProductsPage) => {
    const { lang, translations } = useLang()
    const {
        products,
        productsSpinner,
        paginationProps,
        handlePageChange,
        handleApplyFiltersWithCategory,
        handleApplyFiltersWithPrice,
        handleApplyFiltersWithSizes,
        handleApplyFiltersWithColors,
        handleApplyFiltersBySort
    } = useProductFilters(searchParams, pageName, pageName === 'catalog')

    useEffect(() => {
        
  switch (pageName) {
    case 'catalog':
      setCatalogCategoryOptions({
        rootCategoryOptions: [
          {
            id: 2,
            title: translations[lang].main_menu.cloth,
            href: '/catalog/cloth',
          },
          {
            id: 3,
            title: translations[lang].main_menu.footwear,
            href: '/catalog/footwear',
          },
          {
            id: 4,
            title: translations[lang].main_menu.outerwear,
            href: '/catalog/outerwear',
          },
          {
            id: 5,
            title: translations[lang].main_menu.accessories,
            href: '/catalog/accessories',
          },
          {
            id: 6,
            title: translations[lang].main_menu.jewelry_watches,
            href: '/catalog/jewelry_watches',
          },
        ],
      });
      break;
    case 'accessories':
        setCatalogCategoryOptions({
            accessoriesCategoryOptions: [
                {
                    id: 1,
                    title: translations[lang].comparison.belts,
                    filterHandler: () => handleApplyFiltersWithCategory('belts'),
                },
                {
                    id: 2,
                    title: translations[lang].comparison.bags,
                    filterHandler: () =>handleApplyFiltersWithCategory('bags'),
                },
                {
                    id:3,
                    title: translations[lang].comparison.backpacks,
                    filterHandler: () =>handleApplyFiltersWithCategory('backpacks'),
                }
            ]
        });
        break;
        case 'cloth':
          setCatalogCategoryOptions({
            clothCategoryOptions:[
              {
                id:1,
                title:translations[lang].comparison['t-shirts'],
                filterHandler: () =>handleApplyFiltersWithCategory('t-shirts'),
              },
              {
                id:2,
                title:translations[lang].comparison['shirts'],
                filterHandler: () =>handleApplyFiltersWithCategory('shirts'),
              },
              {
                id:3,
                title:translations[lang].comparison['trousers'],
                filterHandler: () =>handleApplyFiltersWithCategory('trousers'),
              },
              {
                id:4,
                title:translations[lang].comparison['shorts'],
                filterHandler: () =>handleApplyFiltersWithCategory('shorts'),
              },
              {
                id:5,
                title:translations[lang].comparison['sports_suits'],
                filterHandler: () =>handleApplyFiltersWithCategory('sports_suits'),
              },
              {
                id:6,
                title:translations[lang].comparison['hoodie'],
                filterHandler: () =>handleApplyFiltersWithCategory('hoodie'),
              },
              {
                id:7,
                title:translations[lang].comparison['dresses'],
                filterHandler: () =>handleApplyFiltersWithCategory('dresses'),
              },
              {
                id:8,
                title:translations[lang].comparison['sweaters'],
                filterHandler: () =>handleApplyFiltersWithCategory('sweaters'),
              },
              {
                id:9,
                title:translations[lang].comparison['skirts'],
                filterHandler: () =>handleApplyFiltersWithCategory('skirts'),
              },
            ]
          })
        break;
        case 'footwear': 
          setCatalogCategoryOptions({
            footwearCategoryOptions:[
              {
                id:1,
                title:translations[lang].comparison.sneakers,
                filterHandler: () =>handleApplyFiltersWithCategory('sneakers'),
              },
              {
                id:2,
                title:translations[lang].comparison.shoes,
                filterHandler: () =>handleApplyFiltersWithCategory('shoes'),
              },
            ]
          })
        break;
        case 'outerwear':
          setCatalogCategoryOptions({
            outerwearCategoryOptions:[
              {
                id:1,
                title:translations[lang].comparison['jackets'],
                filterHandler: () =>handleApplyFiltersWithCategory('jackets'),
              },
              {
                id:2,
                title:translations[lang].comparison['coat'],
                filterHandler: () =>handleApplyFiltersWithCategory('coat'),
              },
            ]
          })
          break;
          case 'jewelry_watches':
            setCatalogCategoryOptions({
              jewelry_watchesCategoryOptions:[
                {
                  id:1,
                  title:translations[lang].comparison['watches'],
                  filterHandler: () =>handleApplyFiltersWithCategory('watches'),
                },
                {
                  id:2,
                  title:translations[lang].comparison['bracelets'],
                  filterHandler: () =>handleApplyFiltersWithCategory('bracelets'),
                },
                {
                  id:3,
                  title:translations[lang].comparison['earrings'],
                  filterHandler: () =>handleApplyFiltersWithCategory('earrings'),
                },
                {
                  id:4,
                  title:translations[lang].comparison['pendant'],
                  filterHandler: () =>handleApplyFiltersWithCategory('pendant'),
                },
              ]
            })
            break
          default:
      break;
  }
}, [pageName, lang, translations]);

    return (
        <>
        <HeadingWithCount
        count={products.count}
        title={
          (translations[lang].breadcrumbs as { [index: string]: string })[
            pageName
          ]
        }
        spinner={productsSpinner}
        />
        <CatalogFilters 
          handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
          handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
          handleApplyFiltersWithColors={handleApplyFiltersWithColors}
           handleApplyFiltersBySort={handleApplyFiltersBySort}
          />
        {productsSpinner && (
            <motion.ul
                {...basePropsForMotion}
                className={skeletonStyles.skeleton}
                style={{ marginBottom: 60 }}
            >
            {Array.from(new Array(12)).map((_, i) => (
                <li key={i} className={skeletonStyles.skeleton__item}>
                    <div className={skeletonStyles.skeleton__item__light} />
                </li>
            ))}
            </motion.ul>
        )}
        {!productsSpinner && (
            <motion.ul
                {...basePropsForMotion}
                 className={`list-reset ${styles.catalog__list}`}
            >
            {(products.items || []).map((item) => (
            <ProductsListItem key={item._id} item={item} />
          ))}
            </motion.ul>
        )}
        {!products.items?.length && !productsSpinner && (
            <div className={styles.catalog__list__empty}>
                {translations[lang].common.nothing_is_found}
            </div>
            )}
        
            <div className={styles.catalog__bottom}>
                <ReactPaginate
                    {...paginationProps}
                    previousLabel={<span>{translations[lang].catalog.previous_page}</span>}
                    nextLabel={<span>{translations[lang].catalog.next_page}</span>}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default ProductsPage;