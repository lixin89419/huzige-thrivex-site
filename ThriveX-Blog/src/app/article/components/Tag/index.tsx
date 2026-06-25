import React from 'react';
import Image from 'next/image';
import tagSvg from '@/assets/svg/other/tag.svg';
import Link from 'next/link';
import { Tag } from '@/types/app/tag';
import './index.scss'

const TagComponent = ({ data }: { data: Tag[] }) => {
    return (
        <div className="TagComponent">
            <div className="tag">
                <Image src={tagSvg} alt="标签" />

                {/* 标签列表 */}
                <div className="list">
                    {data?.map((item, index) => (
                        <Link href={`/tag/${item?.id}?name=${item?.name}`} target="_blank" key={index}>{item.name}</Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TagComponent;
