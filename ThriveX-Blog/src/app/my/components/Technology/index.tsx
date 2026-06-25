'use client';

import { useEffect } from 'react';

import IconCloud from '@/app/my/components/IconCloud';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default ({ list }: { list?: string[] }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div data-aos="zoom-in" className="w-full md:w-7/12 flex flex-col items-center justify-center mt-52 md:mt-0">
        <div className="text-center text-xl mb-8">我的技术栈</div>

        <div className="flex justify-center w-3/6">
          <IconCloud iconSlugs={list ?? []} />
        </div>
      </div>
    </>
  );
};
