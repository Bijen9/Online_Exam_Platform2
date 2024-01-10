import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const UserDropdown = (params: any) => {
  const { allUsers, testId } = params;

  const users = JSON.parse(allUsers);

  return (
    <>
      <Select>
        <SelectTrigger
          className="w-[300px] h-[50px] data-[state=open]bg:light-900 dark:focus-bg-dark-200 
        dark:data-[state=open]bg:dark-200"
        >
          <SelectValue
            placeholder="Select Students"
            className="w-[300px] h-[50px] data-[state=open]bg:light-900 dark:focus-bg-dark-200 
        dark:data-[state=open]bg:dark-200"
          />
        </SelectTrigger>
        <SelectContent
          className="absolute
        right- mt-3 min-w-[300px]
        rounded border py-2 bg-white dark:border-dark-400 dark:bg-dark-300"
        >
          {users?.map((user: any) => (
            <SelectItem
              key={user._id}
              value={user._id}
              className="flex items-center gap-4 px-2.5 py-2 focus:bg-slate-100 dark:focus:bg-dark-400"
            >
              <Image
                src={user.image}
                width={25}
                height={25}
                alt={user.name}
                className="rounded-full"
              />
              <p
                className={`body-semibold text-light-500 
                  text-dark100_light900
                `}
              >
                {" "}
                {user.name}
              </p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default UserDropdown;
