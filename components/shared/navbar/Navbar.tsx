import { SignedIn, UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import GlobalSearch from "../search/GlobalSearch";
import MobileNav from "./MobileNav";
import getUserById from "@/lib/actions/user.action";
import { get } from "http";

const Navbar = () => {
  const { userId } = auth();
  if (userId) {
    console.log(auth());
    getuser(userId);
    async function getuser(userId: string) {
      const user = await getUserById({ userId });
      console.log(user);
    }
  }
  return (
    <nav
      className="flex-between background-light900_dark200
  fixed z-50 w-full gap-5 p-6 shadow-light-300
  dark :shadow-none sm:px-12"
    >
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt="onlineExamPlatform_logo"
        />
        <p className="h2-bold  text-dark100_light900 font-spaceGrotesk max-sm:hidden">
          Exam Platform <span className="text-primary-500">Online</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-5 ">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
