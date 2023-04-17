import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Styles from './BaseLayout.module.css'

import { SidebarContext } from '../../context/SidebarContext/GlobalProvider'
import { useActiveItem } from '../../hooks/setActiveItem'
import { ThemeContext } from '../../context/ThemeContext/ThemeProvider'
import Topbar from '../Topbar/Topbar'

export default function BaseLayout({
  children,
  noTopbar,
  noSidebar,
  title,
  subpage,
  title_img,
  page_name,
  page_description,
  admin,
  setAdminMode,
}) {
  const { showSidebar, setShowSidebar } = useContext(SidebarContext)
  const { theme, setTheme } = useContext(ThemeContext)
  const [sideBarMobile, setSideBarMobile] = useState(false)
  const [tempfixed, setTempFixed] = useState(true)
  const [activeItem] = useActiveItem()
  const [modal, showModal] = useState(false)

  const handleTempFixed = () => {
    setTheme(!tempfixed ? 'light' : 'dark')
    setTempFixed(!tempfixed)
  }

  const hideSidebar = () => {
    if (sideBarMobile) {
      setSideBarMobile(false)
    }
  }

  useEffect(() => {
    if (theme === 'dark') {
      setTempFixed(false)
    }
  }, [theme])

  return (
    <div className="w-full dark:bg-dark">

      <div className={`flex w-full ${noTopbar ? '' : ''}`}>
        {noSidebar ? null : (
          <div className="fixed top-0 z-20">
            <div
              className={`${
                sideBarMobile ? 'block' : 'hidden'
              } md:hidden w-[270px] h-screen bg-white absolute dark:bg-dark-1 `}
            >
              <Sidebar
                fullSidebar={true}
                tempfixed={tempfixed}
                handleTempFixed={handleTempFixed}
                activeLink={activeItem}
              />
            </div>
          </div>
        )}
        {noSidebar ? null : (
          <div
            className={`hidden md:flex w-[270px] bg-white dark:bg-dark-1 ${Styles.sideBar} ease-in-out duration-300 ${
              showSidebar ? 'translate-x-0' : '-translate-x-[130px]'
            }`}
          >
            <Sidebar
              fullSidebar={showSidebar}
              tempfixed={tempfixed}
              handleTempFixed={handleTempFixed}
              activeLink={activeItem}
            />

            <div className="absolute z-100 ml-[90%] mt-20">
              <div
                className="h-12 w-12 bg-white dark:bg-dark-1 rounded-full flex justify-center items-center cursor-pointer"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <img
                  className={`${showSidebar ? '' : 'rotate-180'}`}
                  src="/images/sidebar/arrow-left.svg"
                  alt="arrow-left"
                />
              </div>
            </div>
          </div>
        )}

        <div
          className={`w-full dark:bg-dark md:w-[calc(100%-270px)] md:ml-[270px] ease-in-out duration-300 ${
            showSidebar ? ' translate-x-0' : '-translate-x-[100px]'
          }`}
        >
          {noTopbar ? null : (
            <div className={`${Styles.topBar} w-full`}>
              <Topbar
                setSideBarMobile={setSideBarMobile}
                page_description={page_description}
                sideBarMobile={sideBarMobile}
                activeLink={activeItem}
                title={title}
                title_img={title_img}
                subpage={subpage}
                page_name={page_name}
                showModal={showModal}
                admin={false}
                setAdminMode={setAdminMode}
              />
            </div>
          )}
          <div
            className="pb-10 mt-[130px] min-h-[calc(100vh-130px)] font-gilroy bg-tree-pattern-mobile md:bg-tree-pattern bg-center bg-no-repeat bg-contain"
            onClick={hideSidebar}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
