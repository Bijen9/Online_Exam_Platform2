"use client";
import React from "react";
import { useTheme } from "@/context/ThemeProvider";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shodow-none">
      <MenubarMenu >
        <MenubarTrigger
          className="
        data-[state=open]bg:light-900 dark:focus-bg-dark-200 
        dark:data-[state=open]bg:dark-200
        "
        >
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              width={20}
              height={20}
              alt="light_mode"
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              width={20}
              height={20}
              alt="dark_mode"
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent
          className="absolute
        right-[-3rem] mt-3 min-w-[120px]
        rounded border py-2 bg-white dark:border-dark-400 dark:bg-dark-300"
        >
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex items-center gap-4 px-2.5 py-2 focus:bg-slate-100 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(item.value);

                if (item.value !== "system") {
                  localStorage.theme = item.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={item.icon}
                width={16}
                height={16}
                alt={item.value}
                className={`${mode === item.value && "active-them"}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {" "}
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
