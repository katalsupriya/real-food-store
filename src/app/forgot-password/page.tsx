"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { ProductsContext } from "../context/GetProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCircleCheck, faCircleHalfStroke, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = () => {
    const [userEmail, setUserEmail] = useState("");
    const [userList] = useContext(ProductsContext);
    const [alertSuccess, setAlertSuccess] = useState("");
    const [alertError, setAlertError] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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
                item.email === userEmail
        );

        if (existingUser != undefined) {
            setAlertSuccess("Password reset link sent to your email.");
            setTimeout(() => {
                setAlertSuccess("");
            }, 5000);
        } else {
            setAlertError("This email doesn't exist.");
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
                    <div className="col-span-1 hidden lg:block bg-cover bg-[url(https://media.istockphoto.com/id/77932955/photo/man-grocery-shopping.jpg?s=1024x1024&w=is&k=20&c=KuYjwmmOuL46IIKz59jCnbWkvsMBBQzgyMgoJTl-O7Y=)]"></div>
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
                        <form noValidate onSubmit={handleSubmit} className="py-10 px-5 md:px-10">
                            <h1 className="my-5 text-2xl font-medium text-center">Forgot your Password?</h1>
                            <div className="grid gap-5">
                                <div>
                                    <label htmlFor="email" className="text-sm lg:text-xs xl:text-sm">Email</label>
                                    <input type="email" id="email" className="p-3 w-full bg-gray-100 mt-1" placeholder="Email"
                                        onChange={(event) => {
                                            setUserEmail(event.target.value);
                                            setIsValidEmail(emailRegex.test(userEmail));
                                        }} />
                                    <div className="h-5">
                                        {!isValidEmail && userEmail && (
                                            <span className="text-red-500 text-xs">
                                                Please enter a valid email.
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button className="py-3 bg-black w-1/3 justify-self-center font-medium text-white disabled:bg-gray-500 disabled:text-white disabled:border-gray-500"
                                    type="submit"
                                    disabled={userEmail && isValidEmail ? false : true}>Submit
                                </button>
                                <div className="text-center">
                                    <Link href="/" className="text-lime-500 hover:text-lime-600 font-bold">
                                        Back to Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ForgotPassword;
