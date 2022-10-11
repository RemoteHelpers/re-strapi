/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */

import { useEffect, useState } from "react";

// import { useState } from "react";

// export default function useLocalStorage<T>(key: string, initialValue: T) {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     if (typeof window === "undefined") {
//       return initialValue;
//     }
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });
//   const setValue = (value: T | ((val: T) => T)) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;

//       setStoredValue(valueToStore);
//       if (typeof window !== "undefined") {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue] as const;
// }

// function parseJSON<T>(value: string | null): T | undefined {
//   try {
//     return value === "undefined" ? undefined : JSON.parse(value ?? "");
//   } catch {
//     console.log("parsing error on", { value });
//     return undefined;
//   }
// }

const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
