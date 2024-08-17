import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useEffect, useState, useRef } from "react";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mainRef = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    const currentWidth = window.innerWidth;

    // Check if the window size has changed from > 1024 to < 1024 to close menu
    if (windowWidth > 1536 && currentWidth <= 1536) {
      setIsOpen(false);
    } else if (windowWidth <= 1536 && currentWidth > 1536) {
      setIsOpen(true);
    } else if (windowWidth <= 1536 && currentWidth > 1024) {
      setIsOpen(false);
    }

    // Update the window width state
    setWindowWidth(currentWidth);
  };

  const handleClickOutside = (event) => {
    if (mainRef.current && mainRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener on mount
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const addClickOutsideListener = () => {
      if (isOpen && window.innerWidth <= 1024) {
        document
          .querySelector(".disabler-overlay")
          .addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };

    addClickOutsideListener();
    console.log(isOpen)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isOpen} />
      <main
        ref={mainRef}
        className={`relative min-h-screen  mt-16 max-sm:text-sm rounded-tl-xl bg-slate-100 dark:bg-neutral-950 ${
          isOpen ? "lg:ml-52 max-lg:b" : "lg:ml-20"
        }`}
      >
        <div
          className={`z-30 fixed inset-0 transition-opacity duration-300  ${
            isOpen ? "bg-black bg-opacity-70 hidden max-lg:block" : "hidden"
          } disabler-overlay`}
          ></div>
        {children}
      </main>
    </>
  );
};

export default Layout;
 