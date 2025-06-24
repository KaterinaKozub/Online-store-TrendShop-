import { IHeadingWithCountProps } from '@/types/elements'
import styles from '@/styles/heading-with-count/index.module.scss'
import { showCountMessage } from '@/lib/utils/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useLang } from '@/hooks/useLang';

const HeadingWithCount = ({
  count,
  title,
  spinner,
}: IHeadingWithCountProps) => {
    const { lang } = useLang()
    
    return (
        <h1 className={`site-title ${styles.title}`}>
      <span>{title}</span>
      <span className={styles.title__count}>
        {spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}{' '}
        {showCountMessage(`${count}`, lang)}
      </span>
    </h1>
    );
};

export default HeadingWithCount;