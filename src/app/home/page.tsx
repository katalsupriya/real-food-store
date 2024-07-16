"use client";
import { useContext } from "react";
import Link from "next/link";
import Footer from "../ui/Footer";
import Navbar from "../ui/Navbar";
import Product from "../ui/Product";
import { ProductsContext } from "@/app/context/GetProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faTruckFast, faRightLeft, faRankingStar } from "@fortawesome/free-solid-svg-icons";


const Landing = () => {
    const [productList] = useContext(ProductsContext);
    let bestSellerList = productList.productList.filter(
        (item) => item.productRating == 5
    );
    return (
        <div className='bg-white dark:bg-gray-950  text-black'>
            <Navbar />
            {/* hero section */}
            <div className="md:h-[80vh] grid sm:grid-cols-2 items-center bg-center bg-cover bg-[url('https://fruityflavor-store-demo.myshopify.com/cdn/shop/files/1.jpg?v=1623471846')]">
                <div className="col-span-1 sm:ps-20">
                    <div className="px-3 sm:px-0 text-center sm:text-start">
                    <p className="text-xl font-medium tracking-wider my-5">Quality always comes first</p>
                    <h1 className="sm:text-8xl text-5xl font-medium uppercase tracking-wide">Fresh Fruit</h1>
                    <h3 className="text-xl font-medium py-3 sm:mb-12 mb-5 tracking-wider">Fruit is a good choice every day for us</h3>
                    </div>
                    <div className="grid md:flex justify-center md:justify-start gap-x-5 gap-y-3 mb-5">
                        <Link href="#service">
                            <button type="button" className="bg-black text-white sm:py-4 py-2 sm:px-10 px-5 font-medium hover:bg-lime-600">Read More</button>
                            </Link>
                        <Link href="/products">
                            <button type="button" className="bg-white sm:py-4 py-2 sm:px-10 px-5 w-[122px] sm:w-auto font-medium hover:bg-lime-600 hover:text-white">Shop Now</button>
                            </Link>
                    </div>
                </div>
            </div>
            {/* /hero section */}
            {/* best sellers section */}
            <div className="sm:my-28 my-5 mx-auto w-11/12">
                <h2 className="sm:text-5xl text-3xl mb-5 text-center font-semibold dark:text-white">Our Best Sellers</h2>
                <h4 className="font-medium text-gray-500 text-lg text-center dark:text-gray-200">Best Seller Product This week</h4>
                <div>
                    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:mx-10">
                        {bestSellerList.slice(0, 4).map((product) => (
                            <Product
                                key={product.id}
                                stock={product.stock}
                                productId={product.id}
                                productImage={product.productImage}
                                productName={product.productName}
                                productBrief={product.productBrief}
                                productRating={product.productRating}
                                brand={product.brand}
                                originalPrice={product.originalPrice}
                                sellingPrice={product.sellingPrice}
                                isDiscount={product.isDiscount}                            />
                        ))}
                    </div>
                </div>
                <div className="sm:mt-10 mt-5 flex justify-center">
                    <Link href="/products"><button type="button" className="bg-transparent dark:bg-white dark:text-black border border-black sm:py-4 py-2 sm:px-10 px-5 font-medium hover:text-white hover:bg-black dark:hover:bg-lime-500">View All Products</button>
                    </Link>
                </div>
            </div>
            {/* /best sellers section */}
            {/* shop now section */}
            <div className="bg-gray-100 grid lg:grid-cols-2 dark:text-white dark:bg-gray-800">
                <div className="col-span-1 h-full flex flex-col text-center items-center justify-center py-5">
                    <h4 className="sm:text-3xl mb-2 sm:mb-5">Get Up To 15% Off</h4>
                    <h2 className="sm:text-5xl text-2xl tracking-wider font-bold">LP Grocery Store</h2>
                    <h4 className="text-lg sm:my-5 my-2 font-medium text-gray-500 dark:text-gray-200">Highest Quality</h4>
                    <Link href="/products"><button type="button" className="bg-transparent dark:bg-white dark:text-black border border-black sm:py-4 py-2 sm:px-10 px-5 font-medium hover:text-white hover:bg-black dark:hover:bg-lime-500">Shop Now</button>
                    </Link>
                </div>
                <div className="col-span-1">
                    <img src="https://cdn.pixabay.com/photo/2023/12/29/10/39/woman-8475957_1280.jpg" alt="fruits banner" />
                </div>
            </div>
            {/* /shop now section */}
            {/* why choose section */}
            <div className="text-center sm:px-10 px-5 w-11/12 mx-auto sm:my-28 my-5" id="service">
                <h2 className="sm:text-5xl text-3xl sm:mb-16 mb-8 dark:text-white font-semibold">Why Choose Us?</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 gap-y-10 dark:text-white md:divide-x sm:*:px-8">
                    <div className="col-span-1 grid justify-items-center">
                        <FontAwesomeIcon icon={faHeadset} size="2xl" />
                        <h3 className="uppercase font-semibold my-2">24/7 Friendly Support</h3>
                        <p className="text-base font-medium text-gray-600 dark:text-white">Our support team is always ready for you to 7 days a week</p>
                    </div>
                    <div className="col-span-1 grid justify-items-center">
                        <FontAwesomeIcon icon={faTruckFast} size="2xl" />
                        <h3 className="uppercase font-semibold my-2">Free Shipping</h3>
                        <p className="text-base font-medium text-gray-600 dark:text-white">Free worldwide shipping on all area orders above $100</p>
                    </div>
                    <div className="col-span-1 grid justify-items-center">
                        <FontAwesomeIcon icon={faRightLeft} size="2xl" />
                        <h3 className="uppercase font-semibold my-2">Flexible Delivery Options</h3>
                        <p className="text-base font-medium text-gray-600 dark:text-white">Enjoy the convenience of our flexible delivery options at LP Grocery.</p>
                    </div>
                    <div className="col-span-1 grid justify-items-center">
                        <FontAwesomeIcon icon={faRankingStar} size="2xl" />
                        <h3 className="uppercase font-semibold my-2">Quality Guaranteed</h3>
                        <p className="text-base font-medium text-gray-600 dark:text-white">We guarantee a delightful grocery shopping experience for you.</p>
                    </div>
                </div>
            </div>
            {/* /why choose section */}
            <Footer />
        </div>
    );
};

export default Landing;