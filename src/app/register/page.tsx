"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ProductsContext } from "../context/GetProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck, faCircleHalfStroke, faEye, faEyeSlash, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [state, setState] = useState({ value: "" });
  const [userList] = useContext(ProductsContext);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState("");
  const [alertError, setAlertError] = useState("");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  const phoneRegex = /^[0-9\b]+$/;

  //toggle show password
  const togglePassword = () => {
    setIsPassVisible(!isPassVisible);
  }
  const toggleConfirmPassword = () => {
    setIsConfirmPassVisible(!isConfirmPassVisible);
  }

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

  const router = useRouter();

  const userInfo = {
    name: userName,
    email: userEmail.toLowerCase(),
    phone: userPhone,
    password: userPassword,
    confirmPassword: userConfirmPassword,
  };

  //   clear the alert text
  function clearText() {
    setTimeout(() => {
      setAlertError("");
    }, 2000);
  }

  //   get values on form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const existingUser = userList.userList.find(
      (item) => item.email === userEmail
    );

    if (userPassword === userConfirmPassword) {
      if (existingUser === undefined) {
        // add items to the api
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setAlertSuccess("Registered successfully!");
            userList.trigger((prevTrigger) => prevTrigger + 1);
            setTimeout(() => {
              router.push("/login");
            }, 1000);
          });
      } else {
        setAlertError("This email already exists.");
        clearText();
      }
    } else {
      setAlertError("Password and Confirm Password doesn't match.");
      clearText();
    }
  };
  return (
    <div className="h-full flex">
      <div className="sm:w-3/4 m-auto w-11/12 xl:w-2/3">
        {alertSuccess.length > 0 && (
          <span className="bg-lime-50 border border-lime-500 rounded text-lime-600 absolute top-5 right-5 p-5">
            <span className="me-2"><FontAwesomeIcon icon={faCircleCheck} size="xl" /></span>
            {alertSuccess}
          </span>
        )}
        {alertError.length > 0 && (
          <span className="bg-red-200 border border-red-700 rounded text-red-700 absolute top-5 right-5 p-5">
            <span className="me-2"><FontAwesomeIcon icon={faBan} size="xl" /></span>
            {alertError}
          </span>
        )}
        <div className="lg:grid lg:grid-cols-2 shadow-lg">
          <div className="col-span-1 hidden lg:block bg-cover bg-[url(https://images.pexels.com/photos/7129160/pexels-photo-7129160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]"></div>
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
                  className={`dropdown-content  absolute top-10 -right-2 z-10 origin-top-right divide-y *:py-3 md:*:px-5 *:text-sm *:block *:text-gray-700 md:w-28 w-20 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${showThemeDropdown ? "block" : "hidden"
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
              onSubmit={handleSubmit}
              className="py-10 px-5 md:px-10"
            >
              <h1 className="text-2xl font-medium my-5 text-center">Create an account</h1>
              <div className="grid">
                <div>
                  <label
                    htmlFor="username"
                    className="text-sm lg:text-xs xl:text-sm"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="p-3 w-full bg-gray-100 mt-1"
                    placeholder="Username"
                    onChange={(event) => setUserName(event.target.value)}
                  />
                  <div className="h-5">
                    {userName.length < 2 && userName.length > 0 && (
                      <span className="text-red-500 text-xs">Min length is 2</span>
                    )}
                  </div>
                </div>
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
                      <span className="text-red-500 text-xs">Please enter a valid email.</span>
                    )}</div>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="text-sm lg:text-xs xl:text-sm"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="p-3 w-full bg-gray-100 mt-1"
                    placeholder="Phone Number"
                    value={state.value}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      if (inputValue === '' || phoneRegex.test(inputValue)) {
                        setState({ value: inputValue })
                      }
                      setUserPhone(inputValue)
                    }}
                  />
                  <div className="h-5">
                    {userPhone.length != 10 && userPhone.length > 0 && (
                      <span className="text-red-500 text-xs">Phone number must be of 10 digits</span>
                    )}</div>
                </div>
                <div className="sm:grid sm:grid-cols-2 gap-x-2 lg:block 2xl:grid">
                  <div className="lg:mb-5 mb-5 sm:mb-0 2xl:mb-0">
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
                          setIsValidPassword(passwordRegex.test(userPassword));
                        }}
                      />
                      <button type="button" onClick={togglePassword} className="absolute right-4 bottom-3 togglePassword"
                        disabled={
                          userPassword
                            ? false
                            : true
                        }><FontAwesomeIcon icon={!isPassVisible ? faEye : faEyeSlash} /></button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm lg:text-xs xl:text-sm"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={!isConfirmPassVisible ? "password" : "text"}
                        id="confirmPassword"
                        className="p-3 w-full bg-gray-100 mt-1"
                        placeholder="Confirm Password"
                        onChange={(event) => {
                          setUserConfirmPassword(event.target.value);
                        }}
                      />
                      <button type="button" onClick={toggleConfirmPassword} className="absolute right-4 bottom-3 togglePassword"
                        disabled={
                          userConfirmPassword
                            ? false
                            : true
                        }><FontAwesomeIcon icon={!isConfirmPassVisible ? faEye : faEyeSlash} /></button>

                    </div>
                  </div>
                  <div className="col-span-2 sm:h-10 lg:h-12 h-12 2xl:h-10">
                    {!isValidPassword && userPassword && (
                      <span className="text-red-500 text-xs">
                        Password must contain min 8 characters, 1 number, 1
                        uppercase, 1 lowercase letter
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="py-3 bg-black w-1/3 justify-self-center font-medium text-white disabled:bg-gray-500 disabled:text-white disabled:border-gray-500"
                  type="submit"
                  disabled={
                    userName.length > 1 &&
                      userEmail &&
                      userPhone.length == 10 &&
                      userPassword &&
                      userConfirmPassword &&
                      isValidEmail &&
                      isValidPassword
                      ? false
                      : true
                  }
                >
                  Register
                </button>
                <div className="text-center mt-5">
                  Already have an account?{" "}
                  <Link href="/login">
                    <span className="text-lime-500 hover:text-lime-600 font-bold">
                      <br />
                      Login Now!
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

export default Register;
