"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faXmark,
  faCartShopping,
  faBell,
  faUser,
  faCircleUser,
  faLock,
  faCircleQuestion,
  faRightFromBracket,
  faSun,
  faMoon,
  faCircleHalfStroke,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { ProductsContext } from "../context/GetProducts";

const Navbar = ({ sendDataToParent = null, isSearch = false }) => {
  const [cartItems] = useContext(ProductsContext);

  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const search = () => {
    setSearchIsOpen(!searchIsOpen);
  };
  const [searchTerm, setSearchTerm] = useState("");

  // get value of search input
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    sendDataToParent(event.target.value.toLowerCase());
  };
  // dropdown toggle
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const closeDropdown = (event) => {
      if (showDropdown && !event.target.closest('.dropdown-content')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [showDropdown]);

  // notification dropdown toggle
  const [showNotification, setShowNotification] = useState(false);
  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };
  useEffect(() => {
    const closeNotification = (event) => {
      if (showNotification && !event.target.closest('.dropdown-content')) {
        setShowNotification(false);
      }
    };
    document.addEventListener('click', closeNotification);

    return () => {
      document.removeEventListener('click', closeNotification);
    };
  }, [showNotification]);

  //theme dropdown toggle
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const themeButton = () => {
    setShowThemeDropdown(!showThemeDropdown);
  };
  useEffect(() => {
    const closeThemeDropdown = (event) => {
      if (showThemeDropdown && !event.target.closest('.dropdown-content')) {
        setShowThemeDropdown(false);
      }
    };
    document.addEventListener('click', closeThemeDropdown);

    return () => {
      document.removeEventListener('click', closeThemeDropdown);
    };
  }, [showThemeDropdown]);

  // theme changing functions
  function darkTheme() {
    document.documentElement.classList.add("dark");
  }
  function lightTheme() {
    document.documentElement.classList.remove("dark");
  }

  //navbar toggle
  const [menuHidden, setMenuHidden] = useState(true);
  function toggleButton() {
    setMenuHidden(!menuHidden);
  }

  return (
    <header className="shadow shadow-slate-300 bg-white dark:bg-slate-800">
      <nav className="relative py-4 w-11/12 mx-auto flex justify-between items-center ">
        {!searchIsOpen}
        <div className={`${searchIsOpen ? 'hidden' : 'block'}`}>
          <Link href="/home" className="dark:hidden">
            <img
              src="https://i.postimg.cc/5t1DXWdp/image-4-removebg-preview.png"
              alt="lp-grocery-logo"
              className="w-36 md:w-52"
            />
          </Link>
          <Link href="/home" className="hidden dark:block">
            <img
              src="https://i.postimg.cc/SxxKrhq1/image-4-removebg-preview.png"
              alt="lp-grocery-logo"
              className="w-36 md:w-52"
            />
          </Link>
        </div>
        {/* added search bar */}
        {isSearch && (
          <div className="border w-1/3 hidden md:block relative rounded-lg mx-3">
            <FontAwesomeIcon
              icon={faSearch}
              width={15}
              className="absolute text-gray-400 top-3 left-3"
            />
            <input
              className="w-full outline-none text-sm text-gray-700 px-10 py-3 bg-slate-100"
              type="text"
              id="search"
              placeholder="Search something.."
              value={searchTerm}
              onInput={handleInputChange}
            />
          </div>
        )}

        {/* added search bar */}
        <div className="flex justify-end md:justify-center items-center md:w-auto gap-x-6">
          <div className="md:hidden">
            <div className="flex items-center h-10">
              {isSearch && (
                <FontAwesomeIcon
                  onClick={search}
                  className="dark:text-white"
                  icon={searchIsOpen ? faXmark : faSearch}
                  width="20"
                />
              )}
              {searchIsOpen && isSearch && (
                <div className="max-w-md mx-auto w-full md:hidden">
                  <div className="relative w-full rounded-lg bg-white overflow-hidden">
                    <input
                      className="w-full outline-none text-sm bg-white text-gray-700 px-2"
                      type="text"
                      id="search"
                      placeholder="Search something.."
                      value={searchTerm}
                      onInput={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <button type="button" className="md:hidden justify-end" onClick={toggleButton}>
            <FontAwesomeIcon icon={faBars} className="dark:text-white" />
          </button>
          <div className={`md:flex md:divide-x divide-y md:divide-y-0 *:py-2 md:*:px-1 lg:*:px-3 absolute md:relative bg-gray-50 md:bg-transparent md:top-0 top-14 z-10 py-2 px-4 md:px-0 md:py-2 rounded-md shadow-lg md:shadow-none ${menuHidden ? 'hidden' : ''}`}>
            <div className="md:dark:text-white divide-x *:px-2 md:*:px-3 flex">
              <div className="relative md:dark:text-white">
                <Link href="#" onClick={toggleNotification}>
                  <FontAwesomeIcon icon={faBell} size="lg" />
                  <span className="flex items-center justify-center absolute right-1 -top-2 rounded-full text-white bg-red-500 w-4 h-4 text-[10px]">
                    2
                  </span>
                </Link>
                <div className={`dropdown-content absolute md:top-[4.5rem] -right-6 top-10 z-10 origin-top-right divide-y *:py-3 *:px-5 *:text-sm *:block *:text-gray-700 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showNotification ? "block" : "hidden"
                  }`}>
                  <Link href="#" className="hover:font-bold">
                    <span className="">Claim your discount</span>
                  </Link>
                  <Link href="#" className="hover:font-bold">
                    <span className="">Unlock free shipping for your first two orders🙌</span>
                  </Link>
                  <Link href="#" className="hover:font-bold">
                    <span className="">Welcome [name]! Use [personalized code] on checkout to get [offer amount] off. Hurry, the offer ends in [expiry time]⏳.</span>
                  </Link>
                  <Link href="#" className="hover:font-bold">
                    <span className="">Price drop alert: Hey [name], there is Link flat [% discount] off on [product] valid only for the next [duration]. Hurry!</span>
                  </Link>
                </div>
              </div>
              <Link
                href="/cart"
                className="relative">
                <FontAwesomeIcon icon={faCartShopping} size="lg" />
                <span className="flex items-center justify-center absolute right-1 -top-2 rounded-full text-white bg-red-500 w-4 h-4 text-[10px]">
                  {cartItems.cartList.length}
                </span>
              </Link>
            </div>
            <div className="relative md:dark:text-white">
              <Link
                href="#"
                onClick={toggleDropdown}
                className="flex items-center">
                <FontAwesomeIcon icon={faUser} size="lg" />
                <span className="ps-1">User</span>
              </Link>
              <div className={`dropdown-content absolute md:top-20 md:-right-2 -right-6 top-10 z-10 origin-top-right divide-y *:py-3 *:px-5 *:text-sm *:block *:text-gray-700 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showDropdown ? "block" : "hidden"
                }`}>
                <Link href="#" className="hover:font-bold">
                  <FontAwesomeIcon icon={faCircleUser} />
                  <span className="ms-3">View Profile</span>
                </Link>
                <Link href="#" className="hover:font-bold">
                  <FontAwesomeIcon icon={faLock} />
                  <span className="ms-3">Change Password</span>
                </Link>
                <Link href="#" className="hover:font-bold">
                  <FontAwesomeIcon icon={faCircleQuestion} />
                  <span className="ms-3">Online Help</span>
                </Link>
                <Link href="#" className="hover:font-bold">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  <span className="ms-3">Logout</span>
                </Link>
              </div>
            </div>
            <div className="relative md:dark:text-white">
              <Link
                href="#"
                onClick={themeButton}
                className="flex items-center"
              >
                <FontAwesomeIcon icon={faCircleHalfStroke} />
                <span className="ps-1">Theme</span>
              </Link>
              <div
                className={`dropdown-content absolute md:top-20 top-12 -right-2 z-10 origin-top-right divide-y *:py-3 *:px-5 *:text-sm *:block *:text-gray-700 w-28 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showThemeDropdown ? "block" : "hidden"
                  }`}
              >
                <button
                  onClick={lightTheme}
                  type="button"
                  className="w-full hover:font-bold"
                >
                  <FontAwesomeIcon icon={faSun} />
                  <span className="ms-3">Light</span>
                </button>
                <button
                  onClick={darkTheme}
                  type="button"
                  className="w-full hover:font-bold hover:rounded-b-md hover:text-white hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faMoon} />
                  <span className="ms-3">Dark</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {searchIsOpen && isSearch && (
        <div
          className="relative w-full hidden md:block bg-white shadow-xl"
          id="search-content"
        >
          <div className="container mx-auto py-4 text-black">
            <input
              className="w-full h-8 outline-none text-sm bg-white text-gray-700 px-2"
              type="text"
              id="search"
              placeholder="Search something.."
              value={searchTerm}
              onInput={handleInputChange}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
