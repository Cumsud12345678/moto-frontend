import Footer from "../components/Footer";
import Header from "../components/header/Header";
import { useProduct } from "../components/new-product/hooks/useProduct"
import ProductForm from "../components/new-product/ProductForm";

export default function New(){

  const productData = useProduct()

  return(
    <div>
      <Header />
      <div className="flex flex-col w-full mt-10 lg:mt-30 container mx-auto max-w-[700px]">
        <ProductForm productData={productData} />
      </div>
      <Footer />
    </div>
    
  )
}