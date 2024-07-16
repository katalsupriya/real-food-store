import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  function darkTheme() {
    document.documentElement.classList.add("dark");
  }
  function lightTheme() {
    document.documentElement.classList.remove("dark");
  }
  return (
    <footer className="bg-gray-100 sm:mt-10 mt-5 dark:bg-slate-800 dark:text-white">
      <hr />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 w-11/12 mx-auto py-10 gap-y-8">
        <div className="col-span-1">
          <Link href="/home" className="dark:hidden">
            <img
              src="https://i.postimg.cc/5t1DXWdp/image-4-removebg-preview.png"
              alt="lp-grocery-logo"
              className="md:w-52 w-36"
            />
          </Link>
          <Link href="/home" className="hidden dark:block">
            <img
              src="https://i.postimg.cc/SxxKrhq1/image-4-removebg-preview.png"
              alt="lp-grocery-logo"
              className="md:w-52 w-36"
            />
          </Link>
          <h3 className="mt-5 text-sm font-light">Your one stop destination for all<br /> your grocery needs.</h3>
          <div className="flex gap-x-5 sm:mt-5 mt-2">
            <Link href="https://twitter.com/lpinfotech"><FontAwesomeIcon icon={faTwitter} /></Link>
            <Link href="https://www.facebook.com/lpinfotechnologies/"><FontAwesomeIcon icon={faFacebook} /></Link>
            <Link href="https://www.instagram.com/lpinfotechnologies/"><FontAwesomeIcon icon={faInstagram} /></Link>
            <Link href="https://www.youtube.com/channel/UCGkIAujB1ii0cdU8SWfRS5g"><FontAwesomeIcon icon={faYoutube} /></Link>
          </div>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-medium">Quick Links</h3>
          <ul className="sm:mt-5 mt-2 *:mb-1">
            <li className="hover:font-bold"><Link href="/home">Home</Link></li>
            <li className="hover:font-bold"><Link href="/products">Shop Now</Link></li>
            <li className="hover:font-bold"><Link href="/cart">Cart</Link></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-medium">Categories</h3>
          <ul className="sm:mt-5 mt-2 *:mb-1">
            <li className="hover:font-bold"><Link href="/products">Beverages</Link></li>
            <li className="hover:font-bold"><Link href="/products">Millets</Link></li>
            <li className="hover:font-bold"><Link href="/products">Dairy</Link></li>
            <li className="hover:font-bold"><Link href="/products">Sweet</Link></li>
            <li className="hover:font-bold"><Link href="/products">Oil</Link></li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="text-2xl font-medium">Change Theme</h3>
          <ul className="sm:mt-5 mt-2 *:mb-1">
            <li><button
              onClick={lightTheme}
              type="button"
              className="hover:font-bold">
              <FontAwesomeIcon icon={faSun} />
              <span className="ms-3">Light</span></button>
            </li>
            <li><button
              onClick={darkTheme}
              type="button"
              className="hover:font-bold">
              <FontAwesomeIcon icon={faMoon} />
              <span className="ms-4">Dark</span></button>
            </li>
          </ul>
        </div>
      </div>
      <div className='bg-white dark:bg-slate-800 dark:text-white py-3 text-black text-center'>
        © All rights reserved<span className='text-lime-500 mx-2'>LP Grocery Store</span>{new Date().getFullYear()}.
      </div>
    </footer>
  );
};

export default Footer;