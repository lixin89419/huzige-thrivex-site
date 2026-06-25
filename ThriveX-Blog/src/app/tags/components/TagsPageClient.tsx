'use client';

import React, { useMemo } from 'react';
import { Tag } from '@/types/app/tag';
import TagCloudBackground from '@/app/tags/components/TagCloudBackground';
import VirtualizedTagList from './VirtualizedTagList';

interface TagsPageClientProps {
  tags: Tag[];
}

export default function TagsPageClient({ tags }: TagsPageClientProps) {
  // 使用 useMemo 缓存标签名称数组
  const tagNames = useMemo(() => {
    return tags.map((item: Tag) => item.name).filter(Boolean);
  }, [tags]);

  return (
    <div className="py-[50px] mt-[60px] min-h-screen relative hide_sliding">
      <h1 className="relative z-20 text-4xl font-bold text-center mb-5">标签墙</h1>

      {/* 标签列表 */}
      <div className="relative z-20 w-11/12 mx-auto">
        <VirtualizedTagList tags={tags} initialBatchSize={30} batchSize={30} />
      </div>

      {/* 背景动画 */}
      <TagCloudBackground tags={tagNames} />
    </div>
  );
}
