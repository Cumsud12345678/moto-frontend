import DetailsLeft from "../components/product-details/left/DetailsLeft";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useLocation, useParams } from "react-router-dom";
import DetailsRight from "../components/product-details/right/DetailsRight";
import Header from "../components/header/Header";
import ProductList from "../components/ProductList";
import { DetailsSkeleton } from "../components/skeletons/DetailsSkeleton";
import Details from "../components/product-details/Details";
import { toast } from "@heroui/react";
import { getMyProduct, getProductDetails, getSimilarProducts } from "../redux/slices/product/productSlice";
import { HomeSkeleton } from "../components/skeletons/HomeSkeleton";
import { Helmet } from 'react-helmet-async'

export default function ProductDetails(){

  const location = useLocation()
  const { id } = useParams()
  const dispatch = useDispatch()

  const path = location.pathname.split('/', 2)

  useEffect(() => {
    if(path[1] == 'elanlarim') {
      dispatch(getMyProduct(id))
    }
  }, [location.pathname])

  const {
    selectedProduct,
    detailsStatus,
    message,
    similarProducts,
    similarStatus,
    productsCache,
    similarCache,
    ids
  } = useSelector(s => s.product)

  // DETAYLARI VE SIMILARS I CAQIR
  useEffect(() => {
    if(path[1] !== 'elanlarim') {
      if(!productsCache[id]){
        dispatch(getProductDetails(id))
      }
      if (!similarCache[id]) {
        dispatch(getSimilarProducts(id))
      }
    }
    
    window.scrollTo({
      top: 0,
      behavior: "smooth", // və ya "auto"
    });
  }, [id])

  // ERRORU YAZDIR
  useEffect(() => {
    if(message) toast.danger(message)
  }, [message])

  // Göstəriləcək datanı keşdən, yoxdursa Redux state-dən götür
  const currentProduct = productsCache[id] || selectedProduct
  const currentSimilar = similarCache[id] || similarProducts

  const loadingDetails = detailsStatus === 'loading' || !currentProduct || currentProduct._id != id
  const loadingSimilars = similarStatus === 'loading' || !similarCache[id]

  return (
    <div className="container mx-auto max-w-[1000px]">

      {currentProduct && !loadingDetails && (
        <Helmet>
          <title>{`${currentProduct.make?.label} ${currentProduct.model?.label} ${currentProduct.year} - ${currentProduct.price} ₼`}</title>
          <meta name="description" content={`${currentProduct.make?.label} ${currentProduct.model?.label}, ${currentProduct.year}, ${currentProduct.mileage} km. ${currentProduct.city?.label}-də satılır.`} />
          <meta property="og:title" content={`${currentProduct.make?.label} ${currentProduct.model?.label}`} />
          <meta property="og:image" content={`${import.meta.env.VITE_API_URL}/uploads/${currentProduct.images?.[0]}`} />
          <meta property="og:type" content="product" />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": `${currentProduct.make?.label} ${currentProduct.model?.label}`,
              "image": `${import.meta.env.VITE_API_URL}/uploads/${currentProduct.images?.[0]}`,
              "offers": {
                "@type": "Offer",
                "price": currentProduct.price,
                "priceCurrency": "AZN",
                "availability": "https://schema.org/InStock"
              }
            })}
          </script>
        </Helmet>
      )}
      
      <Header dur={true} />

      {
        loadingDetails
          ? <DetailsSkeleton /> 
          : <Details details={currentProduct} ids={ids} />
      }

      {
        path[1] !== 'elanlarim' &&
        <div className="mt-5 px-4 pb-25">
          <h4 className="text-xl">OXŞAR ELANLAR</h4>
          {
            loadingSimilars
              ?
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 lg:mt-3">
                {
                  [...Array(8)].map((_, index) => (
                    <HomeSkeleton key={index} />
                  ))
                }
              </div>
              :
              currentSimilar.length == 0
                ? 'Elan tapılmadı'
                : <ProductList products={currentSimilar} topMob={'0px'} topDes={'0px'} />
          }
        </div>
      }
      
    </div>
  )
}