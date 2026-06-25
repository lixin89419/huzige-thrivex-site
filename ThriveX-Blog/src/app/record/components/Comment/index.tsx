'use client';

import { Accordion, AccordionItem } from '@heroui/react';

export default () => {
  return (
    <>
      <Accordion>
        <AccordionItem key="1" aria-label="评论" title="评论" className="[&>h2]:text-base [&>h2]:w-[10%] [&>h2]:mx-auto [&>h2>button]:pb-0">
          <div className="space-y-2">
            <div className="flex items-center w-full p-4 bg-[#fafafa] rounded-lg">
              <img src="https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />

              <div>
                <div className="font-bold mb-1">宇阳</div>
                <div className="text-gray-700">再渺小的星光也有属于它的光芒</div>
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
};
