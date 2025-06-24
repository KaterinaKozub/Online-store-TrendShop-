import { useClickOutside } from '@/hooks/useClickOutside';
import { useLang } from '@/hooks/useLang';
import React from 'react';
import styles from '@/styles/catalog/index.module.scss'
import { useCategoryFilter } from '@/hooks/useCategoryFilter';
import { AnimatePresence } from 'framer-motion';
import CategoryFilterList from './CategoryFilterList';



const CategorySelect = () => {
    const { lang, translations } = useLang()
    const { open, setOpen, ref, toggle } = useClickOutside()
    const {
        handleSelectAllCategories,
        currentOptions,
        option,
        setOption,
        allCategoriesTitle,
        catalogCategoryOptions,
    } = useCategoryFilter()

    return (
        <div  className={styles.catalog__filters__select} ref={ref}>
            <button className={`btn-reset ${styles.catalog__filters__btn} 
                ${styles.bg_category}
                ${open ? styles.is_open: ''}`} 
                onClick={toggle}
            >
                {option ? (
                    <span className={styles.catalog__filters__btn__inner}>
                        <span className={styles.catalog__filters__btn__text}>
                            {translations[lang].catalog.categories}
                        </span>
                        <span className={styles.catalog__filters__btn__info}>
                            {option}
                        </span>
                    </span>
                ): ''}
            </button> 
            <AnimatePresence>
                {open && (
                    <CategoryFilterList
                        handleSelectAllCategories={handleSelectAllCategories}
                        currentOptions={currentOptions}
                        option={option}
                        setOption={setOption}
                        allCategoriesTitle={allCategoriesTitle}
                        catalogCategoryOptions={catalogCategoryOptions}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategorySelect;