"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/GetProducts";

const Product = ({
  productId,
  productImage,
  productBrief,
  productRating,
  brand,
  isDiscount = false,
  productName,
  originalPrice = null,
  sellingPrice,
  stock,
}) => {
  const [exists, setExists] = useState(false);

  const [items] = useContext(ProductsContext);

  useEffect(() => {
    const inCart = items.cartList.find((item) => item.id === productId);
    inCart ? setExists(true) : setExists(false);
  }, []);

  function addToCart(
    productId,
    productImage,
    productName,
    sellingPrice,
    stock
  ) {
    const cartItem = {
      key: productId,
      id: productId,
      productImage: productImage,
      productName: productName,
      sellingPrice: sellingPrice,
      qty: 1,
      stock: stock,
    };

    // add items to the api
    !exists &&
      fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setExists(true);
          items.trigger((prevTrigger) => prevTrigger + 1);
        });
  }

  // rating stars
  let rating = [];
  for (var i = 1; i <= productRating; i++) {
    rating.push(<span key={i}>⭐️</span>);
  }

  return (
    <div className="mx-auto sm:w-full max-w-sm bg-white dark:bg-slate-700 dark:text-white border border-gray-200 dark:border-slate-600 rounded-lg shadow hover:scale-105 transition hover:shadow-md group">
      <Link href={`/products/product/${productId}`}>
        <Image
          className="sm:p-4 p-8 w-full bg-slate-300 dark:bg-slate-800 rounded-t-lg"
          priority={true}
          src={productImage}
          alt="product image"
          width={300}
          height={300}
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/product/${productId}`}>
          <h5 className="text-base md:text-lg font-semibold tracking-tight dark:text-white text-gray-900 mb-2 group-hover:text-lime-500">
            {productName}
          </h5>
        </Link>
        <div className="text-xs mb-2 group-hover:text-lime-500">
          {brand} - {productBrief}
        </div>
        <div className="flex sm:block items-center justify-between">
          <div className="mb-2">
            <span className="font-bold text-sm md:text-base dark:text-white text-gray-900 me-2 group-hover:text-lime-500">
              ${sellingPrice}
            </span>
            {isDiscount && (
              <span className="text-sm md:text-base dark:text-slate-200 text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <div className="mb-2 text-[12px] sm:text-base">{rating}</div>
        </div>
        {exists ? (
          <Link
            className="inline-block text-white bg-lime-500 border py-2 rounded-full px-3 shadow text-sm"
            href="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="me-2" />
            <span>Go to Cart</span>
          </Link>
        ) : (
          <button
            className="inline-block border dark:border-slate-600 dark:bg-slate-900 py-2 rounded-full px-3 shadow text-sm hover:bg-lime-500 hover:text-white"
            onClick={() =>
              addToCart(
                productId,
                productImage,
                productName,
                sellingPrice,
                stock
              )
            }
          >
            <FontAwesomeIcon icon={faCartShopping} className="me-2 text-sm" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
