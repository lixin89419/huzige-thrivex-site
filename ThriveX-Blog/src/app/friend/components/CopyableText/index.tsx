'use client';

import { toast } from 'react-toastify';

interface CopyableTextProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export default function CopyableText({ text, children, className = '' }: CopyableTextProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('复制成功！', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      // 降级处理，使用传统方法复制
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      toast.success('复制成功！', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.error(error);
    }
  };

  return (
    <span className={`hover:text-primary cursor-pointer ${className}`} onClick={handleCopy} title="点击复制">
      {children}
    </span>
  );
}
