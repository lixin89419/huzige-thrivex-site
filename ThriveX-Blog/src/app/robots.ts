import { MetadataRoute } from 'next';
import { getWebConfigDataAPI } from '@/api/config';
import { Web } from '@/types/app/config';

export default async function robots(): Promise<MetadataRoute.Robots> {
  // 获取网站配置
  const webResponse = await getWebConfigDataAPI<{ value: Web }>('web');
  const webConfig = webResponse?.data?.value as Web;

  const baseUrl = webConfig?.url || 'https://liuyuyang.net';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
