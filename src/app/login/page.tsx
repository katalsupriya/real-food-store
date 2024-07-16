"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ProductsContext } from "../context/GetProducts";
import {
  faBan,
  faCircleCheck,
  faCircleHalfStroke,
  faEye,
  faEyeSlash,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userList] = useContext(ProductsContext);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState("");
  const [alertError, setAlertError] = useState("");
  const router = useRouter();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  //toggle show password
  const toggle = () => {
    setIsPassVisible(!isPassVisible);
  };

  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const themeButton = () => {
    setShowThemeDropdown(!showThemeDropdown);
  };

  function darkTheme() {
    document.documentElement.classList.add("dark");
  }
  function lightTheme() {
    document.documentElement.classList.remove("dark");
  }

  //   get values on form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const existingUser = userList.userList.find(
      (item) =>
        item.email === userEmail.toLowerCase() && item.password === userPassword
    );

    if (existingUser != undefined) {
      setAlertSuccess("Login successfull!");
      localStorage.setItem("isAuthenticated", "true");
      setTimeout(() => {
        router.push("/home");
      }, 1000);
    } else {
      setAlertError("Incorrect email or password.");
      setTimeout(() => {
        setAlertError("");
      }, 2000);
    }
  };
  return (
    <div className="h-full flex">
      <div className="sm:w-3/4 m-auto w-11/12 xl:w-2/3">
        {alertSuccess.length > 0 && (
          <span className="bg-lime-50 border border-lime-500 rounded text-lime-600 absolute top-5 right-5 p-5">
            <span className="me-2">
              <FontAwesomeIcon icon={faCircleCheck} size="xl" />
            </span>
            {alertSuccess}
          </span>
        )}
        {alertError.length > 0 && (
          <span className="bg-red-200 border border-red-700 rounded text-red-700 absolute top-5 right-5 p-5">
            <span className="me-2">
              <FontAwesomeIcon icon={faBan} size="xl" />
            </span>
            {alertError}
          </span>
        )}
        <div className="lg:grid lg:grid-cols-2 shadow-lg">
          <div className="col-span-1 hidden lg:block bg-cover bg-[url(https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]"></div>
          <div className="bg-white col-span-1 dark:bg-slate-800 dark:text-white">
            <div className="flex justify-between items-center px-5 pt-3">
              <div>
                <Link href="/" className="dark:hidden">
                  <img
                    src="https://i.postimg.cc/5t1DXWdp/image-4-removebg-preview.png"
                    alt="lp-grocery-logo"
                    className="w-32"
                  />
                </Link>
                <Link href="/" className="hidden dark:block">
                  <img
                    src="https://i.postimg.cc/SxxKrhq1/image-4-removebg-preview.png"
                    alt="lp-grocery-logo"
                    className="w-32"
                  />
                </Link>
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
                  className={`dropdown-content  absolute top-10 -right-2 z-10 origin-top-right divide-y *:py-3 md:*:px-5 *:text-sm *:block *:text-gray-700 md:w-28 w-20 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    showThemeDropdown ? "block" : "hidden"
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
            <form
              noValidate
              onSubmit={handleSubmit}
              className="py-10 px-5 md:px-10"
            >
              <h1 className="text-2xl font-medium my-5 text-center">
                Login to your account!
              </h1>
              <div className="grid">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm lg:text-xs xl:text-sm"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="p-3 w-full bg-gray-100 mt-1"
                    placeholder="Email"
                    onChange={(event) => {
                      setUserEmail(event.target.value);
                      setIsValidEmail(emailRegex.test(userEmail));
                    }}
                  />
                  <div className="h-5">
                    {!isValidEmail && userEmail && (
                      <span className="text-red-500 text-xs">
                        Please enter a valid email
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-sm lg:text-xs xl:text-sm"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={!isPassVisible ? "password" : "text"}
                      id="password"
                      className="p-3 w-full bg-gray-100 mt-1"
                      placeholder="Password"
                      onChange={(event) => {
                        setUserPassword(event.target.value);
                      }}
                    />
                    <button
                      type="button"
                      onClick={toggle}
                      className="absolute right-4 bottom-3"
                      disabled={userPassword ? false : true}
                    >
                      <FontAwesomeIcon
                        icon={!isPassVisible ? faEye : faEyeSlash}
                      />
                    </button>
                  </div>
                </div>
                <div className="text-end my-5">
                  <Link
                    href="/forgot-password"
                    className="text-lime-500 hover:text-lime-600 font-bold"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button
                  className="py-3 bg-black w-1/3 justify-self-center font-medium text-white disabled:bg-gray-500 disabled:text-white disabled:border-gray-500"
                  type="submit"
                  disabled={
                    userEmail && userPassword && isValidEmail ? false : true
                  }
                >
                  Login
                </button>
                <div className="text-center mt-5">
                  Don't have an account?{" "}
                  <Link href="/register">
                    <span className="text-lime-500 hover:text-lime-600 font-bold">
                      <br />
                      Create Account
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
