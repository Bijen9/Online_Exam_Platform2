import { SidebarLink } from "@/types";
export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];
export const sidebarLinksStudent: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },

  {
    imgURL: "/assets/icons/star.svg",
    route: "/studentresults",
    label: "Result",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/taketest",
    label: "Take Test",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
];

export const sidebarLinksTeacher: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/teacher",
    label: "Home ",
  },

  {
    imgURL: "/assets/icons/star.svg",
    route: "/teacher/results",
    label: "Results",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/teacher/mark-test",
    label: "Mark Tests",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/teacher/edit-test",
    label: "Edit Tests",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};
