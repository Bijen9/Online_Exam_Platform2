import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Convert milliseconds to seconds
  const seconds = Math.floor(timeDifference / 1000);

  // Define time intervals in seconds
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // Calculate time ago
  if (seconds < minute) {
    return `${seconds} seconds ago`;
  } else if (seconds < hour) {
    const minutes = Math.floor(seconds / minute);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (seconds < day) {
    const hours = Math.floor(seconds / hour);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (seconds < week) {
    const days = Math.floor(seconds / day);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else if (seconds < month) {
    const weeks = Math.floor(seconds / week);
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  } else if (seconds < year) {
    const months = Math.floor(seconds / month);
    return `${months} month${months !== 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(seconds / year);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
  }
};

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
  const formattedNum = (num / 1000000).toFixed(1);
  return `$(formattedNum)M`;
} else if (num >= 1000) {
  const formattedNum = (num / 1000).toFixed(1);
  return `${formattedNum}K`;
} else {
  return num.toString();
}
}




