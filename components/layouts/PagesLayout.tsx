'use client'
import { Next13ProgressBar } from 'next13-progressbar'
import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { $showQuickViewModal, $showSizeTable, closeQuickViewModal } from '@/context/modals';
import { useUnit } from 'effector-react';
import { closeSizeTableByCheck, handleCloseAuthPopup, removeOverflowHiddenFromBody } from '@/lib/utils/common';
import SizeTable from '../modules/SizeTable/SizeTable';
import { $openAuthPopup } from '@/context/auth';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const showQuickViewModal = useUnit($showQuickViewModal);
  const showSizeTable = useUnit($showSizeTable)
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)
  const openAuthPopup = useUnit($openAuthPopup)

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)
  
  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=TrendShop')
    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000)
  }, [])


  return (
    <>
    <Next13ProgressBar height='4px' color='#9466FF' showOnShallow />
      <Layout>
        {children}
      </Layout>

      <div
        className={`quick-view-modal-overlay ${
          showQuickViewModal ? 'overlay-active' : ''
        }`}
        onClick={handleCloseQuickViewModal}
      />
      <div
          className={`size-table-overlay ${
          showSizeTable ? 'overlay-active' : ''
        }`}
        onClick={handleCloseSizeTable}
    />
     {showSizeTable && <SizeTable />}
     <div
        className={`auth-overlay ${
        openAuthPopup ? 'overlay-active' : ''
      }`}
      onClick={handleCloseAuthPopup}
      />
      <Toaster position='top-center' reverseOrder={false}/>
    </>
  );
};

export default PagesLayout;
