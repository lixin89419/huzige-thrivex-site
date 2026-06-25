import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  title: string;
}

export default ({ title }: Props) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;
  }, [location, title]);

  return null;
};
