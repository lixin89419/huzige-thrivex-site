import { getPageConfigDataByNameAPI } from '@/api/config';
import Resume from './resume';

export default async () => {
  const { data } = await getPageConfigDataByNameAPI('resume');
  return <Resume data={data?.value} />;
};
