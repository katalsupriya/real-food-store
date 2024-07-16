"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { faBagShopping, faCartShopping, faMinus, faPlus, faShop, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductsContext } from "../context/GetProducts";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

const Cartlist = () => {
  const [items] = useContext(ProductsContext);

  // cart item UI
  function CartItem({
    productImage,
    productName,
    sellingPrice,
    productId,
    stock,
    qty,
  }) {
    const [purchaseQty, setPurchaseQty] = useState(qty);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // add quantity
    function addQty() {
      const url = "http://localhost:5000/cart/" + productId;
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qty: purchaseQty + 1 }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPurchaseQty(purchaseQty + 1);
        });
    }

    // remove quantity
    function removeQty() {
      const url = "http://localhost:5000/cart/" + productId;
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qty: purchaseQty - 1 }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPurchaseQty(purchaseQty - 1);
        });
    }

    // delete modal
    function DeleteModal() {
      function removeFromCart() {
        const url = "http://localhost:5000/cart/" + productId;
        fetch(url, {
          method: "DELETE",
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            items.trigger((prevTrigger) => prevTrigger + 1);
            setIsModalOpen(false);
          });
      }

      return (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${isModalOpen ? "" : "hidden"
            }`}>
          <div className="bg-white dark:bg-slate-800 dark:text-white p-4 sm:p-8 rounded-md shadow-md">
            <button type="button" className="text-gray-500 float-end" onClick={() => setIsModalOpen(false)}><FontAwesomeIcon icon={faXmark} size="xl" /></button>
            <div className="flex justify-center border-4 border-red-600 border-spacing-2 w-fit m-auto px-4 py-3 rounded-full text-2xl my-5 text-red-600"><FontAwesomeIcon icon={faXmark} size="xl" /></div>
            <p className="text-3xl mb-10 px-8 text-center">
              Are you sure?
            </p>
            <p className="capitalize mb-5 text-base px-5">do you really want to delete this item?</p>
            <div className="flex justify-end px-8 mb-5">
              <button
                className="bg-white border hover:bg-gray-400 shadow-md text-gray-800 font-bold py-2 px-4 rounded mr-4"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 shadow-md text-white font-bold py-2 px-4 rounded"
                onClick={removeFromCart}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <tr className="border-b dark:border-none odd:bg-gray-100 even:bg-white dark:even:bg-slate-700 dark:text-white dark:odd:bg-slate-500">
        <td className="py-2 md:px-4 px-2">
          <div className="flex flex-col md:flex-row items-center md:ps-12 text-center">
            <Image
              className="h-12 w-12 object-cover rounded"
              src={productImage}
              width={600}
              height={400}
              alt="product image"
            />
            <span className="font-medium md:ml-4">{productName}</span>
          </div>
        </td>
        <td className="py-2 px-4">${sellingPrice}</td>
        <td className="py-2 px-4">
          <div className={`flex items-center my-4 w-fit py-2 rounded-md ${purchaseQty === 0 ? 'bg-white' : 'bg-lime-600'} border dark:border-none ${purchaseQty === 0 ? 'text-black' : 'text-white'}`}>
            <button onClick={removeQty} disabled={purchaseQty === 0} className="md:w-10 w-8">
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span className="md:w-10 text-center w-8">
              {purchaseQty}
            </span>
            <button onClick={addQty} disabled={purchaseQty === stock} className="md:w-10 w-8">
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </td>
        <td className="py-2 px-4">${purchaseQty * sellingPrice}</td>
        <td className="py-2 px-4">
          <button
            className="text-red-500 hover:text-red-700 focus:outline-none"
            onClick={() => setIsModalOpen(true)}
          >
            <div className="relative flex flex-col items-center group">
              <FontAwesomeIcon icon={faTrashCan} size="lg" />
              <div className="absolute bottom-1 flex-col items-center hidden mb-6 group-hover:flex w-28">
                <span className="relative rounded-md z-10 p-3 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">Delete Item</span>
                <div className="w-3 h-3 -mt-2 rotate-45 bg-black absolute top-9 left-[50px]"></div>
              </div>
            </div>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg> */}
          </button>
          <DeleteModal />
        </td>
      </tr>
    );
  }

  return (
    <>
      <Navbar />
      <h1 className="my-10 text-center uppercase text-xl md:text-2xl font-medium text-lime-600">My Shopping Cart</h1>
      <div className="bg-white shadow-lg md:w-11/12 mx-auto overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-lime-600 h-16 text-white">
            <tr className="border-b text-left md:text-xl *:py-5">
              <th className="md:ps-16 ps-4">Product</th>
              <th className="px-4">Price</th>
              <th className="px-4">Quantity</th>
              <th className="px-4">Total</th>
              <th className="px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.cartList.length > 0 ? (
              items.cartList.map((cartItem) => (
                <CartItem
                  qty={cartItem.qty}
                  key={cartItem.id}
                  stock={cartItem.stock}
                  productImage={cartItem.productImage}
                  productName={cartItem.productName}
                  sellingPrice={cartItem.sellingPrice}
                  productId={cartItem.id}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="ps-4 py-8">No products added to the cart!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-8 sm:w-11/12 sm:mx-auto mx-2">
        <Link href="/products">
          <button type="button" className="text-lime-600 border border-lime-600 sm:py-4 py-2 sm:px-10 px-5 font-medium hover:bg-lime-600 hover:text-white">
          <FontAwesomeIcon icon={faShop} className="me-2" /><span>Continue Shopping</span></button>
        </Link>
        <Link href="/checkout">
          <button type="button" className="bg-lime-600 text-white sm:py-4 py-2 sm:px-10 px-5 font-medium hover:bg-lime-700">
          <FontAwesomeIcon icon={faCartShopping} className="me-2" /><span>Checkout</span></button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Cartlist;
