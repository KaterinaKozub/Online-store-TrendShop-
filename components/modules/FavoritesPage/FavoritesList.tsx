"use client";

import { $favorites, $favoritesFromLS } from '@/context/favorites';
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '@/styles/favorites/index.module.scss';
import React from 'react';
import { basePropsForMotion } from '@/constants/motion';
import FavoritesListItem from './FavoritesListItem';

const FavoritesList = () => {
    const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS);

    return (
        <ul className={styles.favorites__list}>
            <AnimatePresence>
                {currentFavoritesByAuth.map((item) => (
                    <motion.li
                        {...basePropsForMotion}
                        key={item._id || item.clientId}
                        className={styles.favorites__list__item}
                    >
                        <FavoritesListItem item={item} /> 
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    );
};

export default FavoritesList;
