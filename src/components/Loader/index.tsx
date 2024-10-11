"use client";

import Image from "next/image";

const Loader: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image src="/loader.gif" alt="Loading..." width={100} height={100} />
    </div>
  );
};

export default Loader;
