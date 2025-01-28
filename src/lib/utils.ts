import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const pipe =
  (...fns: any[]) =>
  (arg: any) =>
    fns.reduce((value, fn) => fn(value), arg);
/* eslint-enable */
