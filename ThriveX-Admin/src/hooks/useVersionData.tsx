import { useState, useEffect } from 'react';
import axios from 'axios';

interface Version {
  name: string;
  tag_name: string;
  html_url: string;
}

const useVersionData = () => {
  const [version, setVersion] = useState<Version>({} as Version);

  useEffect(() => {
    const getVersionData = async () => {
      try {
        // 先检查 sessionStorage 中是否有缓存的版本数据
        const cachedVersion = sessionStorage.getItem('project_version');

        if (cachedVersion) {
          const parsedVersion = JSON.parse(cachedVersion);
          // 检查缓存的数据是否有效（包含必要字段）
          if (parsedVersion.tag_name && parsedVersion.html_url) {
            setVersion(parsedVersion);
            return; // 使用缓存数据，不调用接口
          }
        }

        // 如果没有缓存或缓存无效，则调用接口获取数据
        // https://api.github.com/repos/LiuYuYang01/ThriveX-Blog/releases
        const { data } = await axios.get('https://api.github.com/repos/LiuYuYang01/ThriveX-Admin/releases/latest');
        setVersion(data);
        // 将新数据存储到 sessionStorage
        sessionStorage.setItem('project_version', JSON.stringify(data));
      } catch (error) {
        console.error('获取版本信息失败:', error);
      }
    };

    getVersionData();
  }, []);

  return version;
};

export default useVersionData;
