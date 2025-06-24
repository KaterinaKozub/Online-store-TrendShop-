import styles from '@/styles/catalog/index.module.scss'
import CategorySelect from './CategorySelect';
import PriceSelect from './PriceSelect';
import { ICatalogFiltersProps } from '@/types/catalog';
import SizesSelect from './SizesSelect';
import { $sizesOptions, setSizes, setSizesOptions } from '@/context/catalog';
import { useUnit } from 'effector-react';
import { motion } from 'framer-motion';
import { basePropsForMotion } from '@/constants/motion';
import SelectInfoItem from './SelectInfoItem';
import ColorsSelect from './ColorsSelect';
import SortSelect from './SortSelect';



const CatalogFilters = ({
  handleApplyFiltersWithPrice,
  handleApplyFiltersWithSizes,
  handleApplyFiltersWithColors,
  handleApplyFiltersBySort
}: ICatalogFiltersProps) => {
  const sizesOptions = useUnit($sizesOptions)

   const handleRemoveSizeOption = (id: number) => {
    const updatedOptions = sizesOptions.map((item) =>
      item.id === id ? { ...item, checked: false } : item
    )

    setSizesOptions(updatedOptions)

    const updatedSizes = updatedOptions
      .filter((item) => item.checked)
      .map((item) => item.size)

    setSizes(updatedSizes)
    handleApplyFiltersWithSizes(updatedSizes)
  }
  return (
    <div className={styles.catalog__filters}>
      <div className={styles.catalog__filters__top}>
        <div className={styles.catalog__filters__top__left}>
          <CategorySelect />
          <SizesSelect handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}/>
          <PriceSelect handleApplyFiltersWithPrice={handleApplyFiltersWithPrice} />
          <ColorsSelect handleApplyFiltersWithColors={handleApplyFiltersWithColors} />
          <SortSelect handleApplyFiltersBySort={handleApplyFiltersBySort}/>
        </div>
      </div>
    </div>
  );
};


export default CatalogFilters;