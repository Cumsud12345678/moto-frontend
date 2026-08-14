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
import Cookies from "js-cookie";
import { useAdsense } from "../components/customs/hooks/useAdsense";

export default function ProductDetails(){

  const BASE_URL = import.meta.env.VITE_API_URL
  
  const location = useLocation()
  const { id } = useParams()
  const dispatch = useDispatch()

  const [updatedProducts, setUpdatedProducts] = useState([])
  const path = location.pathname.split('/', 2)


  // Adsense
  const {
    mobileAdsense,
    handleAdsClick,
    deskopLeftAdsense,
    deskopRightAdsense
  } = useAdsense()

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

  const {
    isAuth
  } = useSelector(s => s.user)

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

  useEffect(() => {
    if (!isAuth) {
      const currentSimilarData = similarCache[id] || similarProducts
      let favorites = []
      try {
        favorites = JSON.parse(Cookies.get('favorites') || '[]')
      } catch { favorites = [] }
      const favoriteSet = new Set(favorites)
      const newProducts = currentSimilarData.map(product => ({
        ...product,
        is_liked: favoriteSet.has(product._id)
      }))
      setUpdatedProducts(newProducts)
    }
  }, [isAuth, similarProducts, similarCache, id])

  // ERRORU YAZDIR
  useEffect(() => {
    if(message) toast.danger(message)
  }, [message])

  // Göstəriləcək datanı keşdən, yoxdursa Redux state-dən götür
  const currentProduct = productsCache[id] || selectedProduct
  const currentSimilar = similarCache[id] || similarProducts

  const loadingDetails = !currentProduct || currentProduct._id != id
  const loadingSimilars = similarStatus === 'loading' || !similarCache[id]

  const displayProducts = isAuth ? currentSimilar : updatedProducts

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

      {
        (deskopRightAdsense.length > 0 && deskopLeftAdsense[0]?.is_details) &&
        <div
          className="hidden xl:block lg:fixed top-0 left-0 h-[100vh] z-[10000] overflow-hidden"
          style={{
            width: 'calc((100vw - 1000px) / 2)',
            boxSizing: 'border-box',
            paddingRight: '20px'
          }}   // maxWidth silindi
        >
          <div
            onClick={() => handleAdsClick(deskopRightAdsense[0]?._id, deskopRightAdsense[0]?.link)}
            className="w-full h-full cursor-pointer"
          >
            <img
              src={`${BASE_URL}/uploads/${deskopRightAdsense[0]?.image}`}
              className="w-full h-full object-cover object-right"
              alt=""
            />
          </div>
        </div>
      }
      
      <Header dur={true} />

      {
        loadingDetails
          ? <DetailsSkeleton /> 
          : <Details details={currentProduct} ids={ids} />
      }

      {
        path[1] !== 'elanlarim' &&
        <div className="mt-5 px-4 pb-25">
          {/* Burda mobile reklam olacaq */}
          {
            (mobileAdsense.length > 0 && mobileAdsense[0]?.is_home) &&
            <div
              onClick={() => handleAdsClick(mobileAdsense[0]?._id, mobileAdsense[0]?.link)}
              className="lg:hidden w-full h-[100px] rounded-lg my-2 border max-w-[500px] mx-auto">
              <img src={`${BASE_URL}/uploads/${mobileAdsense[0]?.image}`} className="w-full h-full object-contain" alt="" />
            </div>
          }
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
              displayProducts.length == 0
                ? 'Elan tapılmadı'
                : <ProductList products={displayProducts} topMob={'0px'} topDes={'0px'} />
          }
        </div>
        
      }

      {
          (deskopLeftAdsense.length > 0 && deskopLeftAdsense[0]?.is_details) &&
          <div
            className="hidden xl:block lg:fixed top-0 right-0 h-[100vh] z-[10000] overflow-hidden"
            style={{ 
              width: 'calc((100vw - 1000px) / 2)',
              boxSizing: 'border-box',
              paddingLeft: '20px' 
            }}
          >
            <div
              onClick={() => handleAdsClick(deskopLeftAdsense[0]?._id, deskopLeftAdsense[0]?.link)}
              className="w-full h-full cursor-pointer"
            >
              <img
                src={`${BASE_URL}/uploads/${deskopLeftAdsense[0]?.image}`}
                className="w-full h-full object-cover object-left"
                alt=""
              />
            </div>
          </div>
        }
      
    </div>
  )
}