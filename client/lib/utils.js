import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// /**
//  * Combines multiple class names into a single string
//  * @param  {...any} classes - Class names to combine
//  * @returns {string} - Combined class names
//  */
// export function cn(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
