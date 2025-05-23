/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
export const BoardContext = createContext({});
export const BoardProvider = ({ children }) => {
  const defaultData = {
    active: null,
    boards: [],
  };

  const [allboard, setAllBoard] = useState(() => {
    const saved = localStorage.getItem("boards");
    return saved ? JSON.parse(saved) : defaultData;
  });

  // Save to localStorage whenever allboard changes
  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(allboard));
  }, [allboard]);

  return (
    <BoardContext.Provider value={{ allboard, setAllBoard }}>
      {children}
    </BoardContext.Provider>
  );
};
