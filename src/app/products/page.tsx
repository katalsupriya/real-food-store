"use client";
import React, { useContext, useState } from "react";
import Navbar from "../ui/Navbar";
import Page from "./(overview)/page";
import Footer from "../ui/Footer";
import { ProductsContext } from "../context/GetProducts";

export default function Products({ filteredData, searchData }) {
  const [productList] = useContext(ProductsContext);
  const [dataFromChild, setDataFromChild] = useState(null);
  const [newData, setNewData] = useState(productList.productList);
  searchData = dataFromChild;

  // get search data from child
  function handleDataFromChild(childData) {
    setDataFromChild(childData);
    filterData(childData);
  }

  // filter data for search
  const filterData = (childData) => {
    setNewData(
      productList.productList.filter((item) =>
        item.productName.toLowerCase().includes(childData)
      )
    );
  };

  // pass filtered data to the page component
  filteredData = newData;

  function toggleFilter() {
    let filter = document.getElementById("filter");
    if(filter.classList.contains('-translate-x-full')){
      filter.classList.remove('-translate-x-full');
    }else
    {
      filter.classList.add('-translate-x-full') 
    }
  }

  return (
    <main className="flex flex-col h-full">
      <Navbar sendDataToParent={handleDataFromChild} isSearch={true} />
      <div className="container mx-auto">
        <button type="button" onClick={toggleFilter} className="float-end md:hidden bg-white border border-gray-500 px-3 mx-5 rounded-full mt-3 hover:bg-lime-500 hover:text-white hover:border-white">Filter</button>
        <Page filterData={filteredData} searchItem={searchData} />{" "}
      </div>
      <Footer />
    </main>
  );
}
