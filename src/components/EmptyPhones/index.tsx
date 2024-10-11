"use client";

import Image from "next/image";

const EmptyPhones: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Image src="/no-numbers.png" alt="No numbers" width={196} height={196} />

      <p className="text-[20px] font-bold mt-[16px]">
        Welcome to Number Generator!
      </p>
      <p className="text-[16px] font-normal">
        No numbers yet. Click the button to generate your first set.
      </p>
    </div>
  );
};

export default EmptyPhones;
