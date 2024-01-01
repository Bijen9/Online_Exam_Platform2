import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";

const Layout = ({ children }: { children: React.ReactNode }) => {
  let user = null;
  //
  const getuser = async (userId: string) => {
    const oldUser = await getUserById({ userId });
    if (oldUser && oldUser._id) {
      // console.log(oldUser);
      return oldUser;
    } else {
      // console.log("Creating new User");
      return null;
    }
  };
  //
  const { userId } = auth();
  //
  if (userId) {
    getuser(userId);
  }
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {user ? (
        <>{children}</>
      ) : (
        <div>This is the user Page for any user who is not signed in.</div>
      )}
    </main>
  );
};

export default Layout;
