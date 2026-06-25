import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export interface ArticleInfo {
  id: number;
  title: string;
}

export interface ArticleNavigationProps {
  currentId: number;
  prev?: ArticleInfo | null;
  next?: ArticleInfo | null;
}

export default function ArticleNavigation({ prev, next }: ArticleNavigationProps) {
  const baseCardStyle = `
    group relative flex flex-col justify-center w-full p-5 sm:p-6 
    rounded-2xl border 
    transition-[transform,box-shadow]
    focus:outline-none focus:ring-2 focus:ring-blue-500/50
  `;

  const activeStyle = `
    bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg hover:-translate-y-1
    dark:bg-black-b dark:border-gray-800 dark:hover:border-blue-400
  `;

  const disabledStyle = `
    bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed
    dark:bg-[#313842] dark:border-gray-800/50
  `;

  return (
    <nav className="w-full mt-12 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* ================= 上一篇 ================= */}
        {prev ? (
          <Link href={`/article/${prev.id}`} className={`${baseCardStyle} ${activeStyle} items-start`}>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
              <FiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
              <span>上一篇</span>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-2 leading-relaxed">{prev.title}</h3>
          </Link>
        ) : (
          <div className={`${baseCardStyle} ${disabledStyle} items-start`}>
            <div className="flex items-center space-x-2 text-sm text-gray-300 dark:text-gray-600 mb-2">
              <FiArrowLeft className="text-lg" />
              <span>上一篇</span>
            </div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white">已经是第一篇了</p>
          </div>
        )}

        {/* ================= 下一篇 ================= */}
        {next ? (
          <Link href={`/article/${next.id}`} className={`${baseCardStyle} ${activeStyle} items-end text-right`}>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500 mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
              <span>下一篇</span>
              <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 line-clamp-2 leading-relaxed">{next.title}</h3>
          </Link>
        ) : (
          <div className={`${baseCardStyle} ${disabledStyle} items-end text-right`}>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500 mb-2">
              <span>下一篇</span>
              <FiArrowRight className="text-lg" />
            </div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-white">已经是最后一篇了</p>
          </div>
        )}
      </div>
    </nav>
  );
}
