'use client';

import { MdOutlineError } from 'react-icons/md';

interface Props {
  error: Error & { digest?: string };
}

function ErrorPage({ error }: Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-black-a flex items-center justify-center">
      <div className="mx-auto flex flex-col items-center">
        <MdOutlineError className="text-[15vw] text-[#ff6262]" />
        <h1 className="text-[2vw] text-[#888] dark:text-white font-medium mt-8 text-xl">{error.message}</h1>
      </div>
    </div>
  );
}

export default ErrorPage;
