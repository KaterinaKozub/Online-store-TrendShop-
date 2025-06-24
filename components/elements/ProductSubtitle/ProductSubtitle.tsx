import React from 'react';
import styles from '@/styles/ProductSubtitle/index.module.scss'
import { useLang } from '@/hooks/useLang';
import { IProductSubtitleProps } from '@/types/elements';

const ProductSubtitle = ({
    subtitleClassName,
    subtitleRectClassName,
}: IProductSubtitleProps) => {
    const { lang, translations } = useLang()
    const descriptionSlicePosition = lang === 'uk' ? 5 : 2
    
    return (
        <div className={`${styles.product_subtitle__subtitle} ${subtitleClassName}`}>
            <div className={`${styles.product_subtitle__subtitle__rect} ${subtitleRectClassName}`}/>
                <span>
                    {translations[lang].main_page.hero_description.slice(
                        0, 
                        descriptionSlicePosition
                )}
                </span>
                    <br/>
                    <span>
                        {translations[lang].main_page.hero_description.slice(
                        descriptionSlicePosition
                )}
                </span>
            </div>
    );
};

export default ProductSubtitle;