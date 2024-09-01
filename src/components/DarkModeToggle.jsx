import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "../utils/icons";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve the dark mode preference from local storage
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    // Apply the dark mode class to the document element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save the dark mode preference to local storage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <button
      type="button"
      className="rounded-full hover:bg-slate-300 dark:hover:bg-neutral-800 focus:outline-none"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      <div className="flex shrink-0 justify-center items-center size-9">
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </div>
    </button>
  );
};

export default DarkModeToggle;
