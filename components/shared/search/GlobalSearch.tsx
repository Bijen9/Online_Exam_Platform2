import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div
        className="background-light800_darkgradient relative flex 
      min-h-[56px] grow items-center gap-1 rounded-x1 px-4"
      >
        <Image
          src="/assets/icons/search.svg"
          width={20}
          height={20}
          alt="search"
          className="cursor-pointer"
        ></Image>
        <Input
          type="text"
          placeholder="Search globally"
          className="paragraph-regular no-focus text-dark400_light700
          background-light800_darkgradient border-none shadow-none ontline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
