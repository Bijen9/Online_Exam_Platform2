"use client";
import { sidebarLinksStudent, sidebarLinksTeacher } from "@/constants";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { SidebarLink } from "@/types";
import { useState } from "react";

const LeftSidebar = () => {
  const pathname = usePathname();
  const [tnav, setTnav] = useState(false);
  return (
    <section
      className="background-light900_dark200 light-border custom-scrollbar sticky
     left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto 
     border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
    >
      {tnav ? (
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinksTeacher.map((item: SidebarLink) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;
            return (
              <Link
                key={item.route}
                href={item.route}
                className={`${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={item.imgURL}
                  width={20}
                  height={20}
                  alt={item.label}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinksStudent.map((item: SidebarLink) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;
            return (
              <Link
                key={item.route}
                href={item.route}
                className={`${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={item.imgURL}
                  width={20}
                  height={20}
                  alt={item.label}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      )}
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href="/sign-in">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
              <Image
                src="/assets/icons/account.svg"
                width={20}
                height={20}
                alt="login"
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button className="small-medium light-border-2 btn-tertiary  text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none ">
              <Image
                src="/assets/icons/sign-up.svg"
                width={20}
                height={20}
                alt="login"
                className="invert-colors lg:hidden"
              />
              <span className=" max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col gap-3">
          {tnav ? (
            <Link href="/teacher/create-test">
              <Button className="small-medium light-border-2 btn-tertiary  primary-gradient  text-light-900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/edit.svg"
                  width={20}
                  height={20}
                  alt="login"
                  className="invert-colors lg:hidden"
                />
                <span className=" max-lg:hidden base-bold">Create a Test</span>
              </Button>
            </Link>
          ) : (
            " "
          )}
          <Button
            className="small-medium light-border-2 btn-tertiary  text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none "
            onClick={() => {
              tnav ? setTnav(false) : setTnav(true);
            }}
          >
            <Image
              src="/assets/icons/edit.svg"
              width={20}
              height={20}
              alt="login"
              className="invert-colors lg:hidden"
            />
            <span className=" max-lg:hidden ">Switch Role </span>
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
