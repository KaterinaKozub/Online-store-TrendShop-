import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useLang } from '@/hooks/useLang';
import { usePriceFilter } from '@/hooks/usePriceFilter';
import SelectBtn from './SelectBtn';
import { basePropsForMotion } from '@/constants/motion';
import styles from '@/styles/catalog/index.module.scss';
import {
  getCheckedPriceFrom,
  getCheckedPriceTo,
} from '@/lib/utils/catalog'; // виправлено імпорт

type PriceSelectProps = {
  handleApplyFiltersWithPrice: (priceFrom: string, priceTo: string) => void;
};

const PriceSelect = ({ handleApplyFiltersWithPrice }: PriceSelectProps) => {
  const { lang, translations } = useLang();
  const { open, ref, toggle, setOpen } = useClickOutside();

  const {
    setPriceFrom,
    setPriceTo,
    priceFrom,
    priceTo,
    setPriceInfo,
    priceInfo,
    priceFromInfo,
    priceToInfo,
    handleChangePriceFrom,
    handleChangePriceTo,
  } = usePriceFilter();

  const handleSelectPrice = () => {
    const validFrom = getCheckedPriceFrom(+priceFrom) as string;
    const validTo = getCheckedPriceTo(+priceTo) as string;

    setPriceFrom(validFrom);
    setPriceTo(validTo);
    setPriceInfo(`${priceFromInfo(validFrom)} ${priceToInfo(validTo)}`);
    setOpen(false);
    handleApplyFiltersWithPrice(validFrom, validTo);
  };

  return (
    <div className={styles.catalog__filters__select} ref={ref}>
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={translations[lang].catalog.price}
        dynamicText={priceInfo}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className={`list-reset ${styles.catalog__filters__list}`}
            {...basePropsForMotion}
          >
            <li
              className={`${styles.catalog__filters__list__item} ${styles.catalog__filters__list__item__price}`}
            >
              <div className={styles.catalog__filters__list__item__inputs}>
                <label>
                  <span>{translations[lang].catalog.from}</span>
                  <input
                    type="text"
                    placeholder="130 ₴"
                    value={priceFrom}
                    onChange={handleChangePriceFrom}
                  />
                </label>
                <label>
                  <span>{translations[lang].catalog.to}</span>
                  <input
                    type="text"
                    placeholder="15 000 ₴"
                    value={priceTo}
                    onChange={handleChangePriceTo}
                  />
                </label>
              </div>
              <button
                className={`btn-reset ${styles.catalog__filters__list__item__done}`}
                disabled={!priceFrom || !priceTo}
                onClick={handleSelectPrice}
              >
                {translations[lang].catalog.done}
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceSelect;
