/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */

import { useEffect, useState } from "react";

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
