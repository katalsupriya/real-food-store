"use client";
import ProductDetail from "@/app/ui/ProductDetail";
import { useContext } from "react";
import { ProductsContext } from "@/app/context/GetProducts";
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";

const Page = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  const [productList] = useContext(ProductsContext);
  let productDetail = productList.productList.filter(
    (product) => product.id == id
  );

  return (
    <main className="flex flex-col h-full">
      <Navbar />
      <div className="container mx-auto py-5 xl:py-10">
        {productDetail.map((product) => (
          <ProductDetail
            key={product.id}
            id={product.id}
            productRating={product.productRating}
            productIngredients={product.productIngredients}
            detailedDescription={product.detailedDescription}
            productImage={product.productImage}
            productDescription={product.productDescription}
            productName={product.productName}
            originalPrice={product.originalPrice}
            sellingPrice={product.sellingPrice}
            isDiscount={product.isDiscount}
            shipping={product.shipping}
            category={product.category}
            brand={product.brand}
            stock={product.stock}
            availability={product.availability}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
};

export default Page;
