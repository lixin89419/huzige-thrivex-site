'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import directory from '@/assets/svg/other/directory.svg';
import { motion, AnimatePresence } from 'framer-motion';

import './index.scss';

interface NavItem {
  name: string;
  href: string;
  start: number;
  end?: number;
  className: string;
}

const OFFSET = 85;

const ContentNav = () => {
  const [open, setOpen] = useState(false);
  const [navs, setNavs] = useState<NavItem[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const list = document.querySelectorAll<HTMLHeadingElement>(
        '.content h1, .content h2, .content h3, .content h4, .content h5, .content h6'
      );

      list?.forEach((nav, index) => {
        const tag = nav.tagName.toLowerCase(); // "h1"~"h6"
        nav.setAttribute('id', nav.textContent! + index);
        nav.setAttribute('class', tag);
      });

      const titles = Array.from(list).map((t) => {
        const top = t.getBoundingClientRect().top + window.scrollY;
        return {
          href: t.textContent!,
          top,
          className: t.className,
        };
      });

      const titlesList: NavItem[] = titles.map((title, index) => ({
        name: title.href,
        href: title.href + index,
        start: title.top - OFFSET,
        end:
          index < titles.length - 1 ? titles[index + 1].top - OFFSET : Infinity,
        className: title.className,
      }));

      setNavs(titlesList);

      const onScroll = () => {
        const scrollPosition = window.scrollY;
        const activeIndex = titlesList.findIndex(
          (item) => scrollPosition >= item.start && scrollPosition < item.end!
        );
        if (activeIndex !== -1) {
          setActive(activeIndex);
        }
      };

      onScroll();
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, 0);
  }, []);

  const onHandleToNavItem = (index: number, href: string) => {
    const element = document.getElementById(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({
        top,
        behavior: 'instant', // 可改为 "smooth" 实现平滑滚动
      });
      setActive(index);
    }
  };

  return (
    <>
      {/* 遮罩层 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="content-nav-mask"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 49, background: '#000' }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 展开/收起按钮 */}
      {open ? (
        <div
          className="fixed bottom-5 right-5 sm:top-[80%] sm:left-[320px] z-50 cursor-pointer flex justify-center items-center w-12 h-12 rounded-xl bg-white dark:bg-black-b dark:border-[#4e5969] p-3 border"
          onClick={() => setOpen(false)}
        >
          <MdOutlineKeyboardDoubleArrowLeft className="w-full text-4xl text-primary" />
        </div>
      ) : (
        !!navs?.length && (
          <div
            className="fixed top-[80%] left-[2%] z-50 cursor-pointer w-12 h-12 rounded-xl bg-white dark:bg-black-b dark:border-[#4e5969] p-3 border"
            onClick={() => setOpen(true)}
          >
            <Image
              src={directory}
              alt=""
              width={23}
              height={23}
              className="text-5xl text-primary"
            />
          </div>
        )
      )}

      {/* 侧边栏动画 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={`ContentNavComponent overflow-auto w-[280px] fixed top-0 z-[60] h-screen bg-[rgba(255,255,255,0.9)] dark:bg-[rgba(30,36,46,0.9)] backdrop-blur-sm shadow-[16px_0px_15px_-3px_rgba(101,155,246,0.1)] transition-[min-width] hide_sliding`}
            initial={{ minWidth: 0, opacity: 0, x: -40 }}
            animate={{ minWidth: 280, opacity: 1, x: 0, padding: '20px 30px 20px 10px' }}
            exit={{ minWidth: 0, opacity: 0, x: -40, padding: 0 }}
            transition={{ duration: 0.25 }}
            style={{ maxWidth: 280 }}
          >
            <div className="flex justify-center items-center mt-5">
              <Image
                src={directory}
                alt=""
                width={23}
                height={23}
                className="mr-2"
              />
              目录
            </div>

            <div className="text-[#4d4d4d] dark:text-[#8c9ab1] text-sm w-full mt-4">
              {navs?.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onHandleToNavItem(index, item.href);
                  }}
                  className={`nav_item overflow-hidden relative block p-1 pl-5 mb-[5px] hover:text-primary ${
                    active === index
                      ? 'text-primary pl-[30px] rounded-[10px] text-[15px] dark:bg-[#313d4e99] before:!left-4'
                      : ''
                  } ${item.className}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContentNav;
