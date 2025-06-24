import { motion, AnimatePresence } from 'framer-motion'
import { IComparisonItem } from '@/types/comparison'
import styles from '@/styles/comparison/index.module.scss'
import ComparisonItem from './ComparisonItem'




const ComparisonList = ({ items }: { items: IComparisonItem[] }) => (
  <motion.ul className={`list-reset ${styles.comparison__list}`}>
    <AnimatePresence>
      {items.length ? (
        items.map((item) => (
          <ComparisonItem key={item._id || item.clientId} item={item} />
        ))
      ) : (
        <li className={styles.comparison_main_links__empty}>
          {/* Можна текст показати, наприклад: */}
          Порівняння пусте
        </li>
      )}
    </AnimatePresence>
  </motion.ul>
)


export default ComparisonList