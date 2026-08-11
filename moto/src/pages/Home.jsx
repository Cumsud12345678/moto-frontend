import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slices/product/productSlice";
import { HomeSkeleton } from "../components/skeletons/HomeSkeleton";
import { useMediaQuery } from "@heroui/react";
import { toast } from "@heroui/react";
import { useFilter } from '../components/header/filter/hooks/useFilter'
import { Helmet } from "react-helmet-async";
import { getAdsense } from "../redux/slices/admin/adminAdsenseSlice";
import EmptyData from "../components/EmptyData";
import { useGenerateFavorites } from "../components/customs/hooks/useGenerateFavorites";
import { useCursorBasedPagination } from "../components/customs/hooks/useCursorBasedPagination";
import { useAdsense } from "../components/customs/hooks/useAdsense";

export default function Home(){

  const BASE_URL = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  
  // Generate Favorites
  const {
    displayProducts
  } = useGenerateFavorites()
  
  // Scroll Pagination
  const {
    loading,
    setLoading,
    lastProductRef,
    loadingMore
  } = useCursorBasedPagination()

  // Adsense
  const {
    mobileAdsense,
    handleAdsClick
  } = useAdsense()

  const filterState = useFilter()
  const {error} = filterState

  const {
    message,
    productsStatus
  } = useSelector((state) => state.product)

  useEffect(() => {
    // artiq mehsullar redux-da varsa, yeniden cekmirik - eks halda hansisa elana baxib geri qayidanda backend-in sirasi deyise biler ve ekranda elanlarin yeri qarisir
    if(productsStatus === 'idle'){
      dispatch(getAllProducts())
    }else{
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if(message) toast.danger(message)
    if(error) toast.danger(error)
  }, [message, error])

  const isDesktop = useMediaQuery('(min-width: 1024px)', { noSsr: true })

  return(
    <div>

      <Helmet>
        <title>Moto — Motosiklet Elanları | Al, Sat</title>
        <meta name="description" content="Azərbaycanda ən böyük motosiklet elanları platforması. Motosiklet al, sat, elan yerləşdir." />
        <meta property="og:title" content="Moto — Motosiklet Elanları" />
        <meta property="og:description" content="Azərbaycanda motosiklet al-sat platforması" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dir-indexed-five-prep.trycloudflare.com/" />
      </Helmet>

      <div className="flex flex-col">
      
        {/* <div className="hidden xl:block lg:fixed top-0 bg-red-500 w-[250px] h-[100vh] z-[2000] left-0">
          Burda reklam olacaq
          <div className="w-full h-[100vh]">
            <img src="../../public/download.png" className="w-[2000px] h-[1000px]" alt="" />
          </div>

        </div> */}

        <div className="z-[9999] bg-[#f5f5f5]">
          <Header filter={filterState} />

          <div className="mt-45 lg:mt-6 px-4 flex flex-col mb-25 max-w-[1000px] mx-auto">

            {/* Burda mobile reklam olacaq */}
            {
              mobileAdsense.length > 0 && 
              <div 
                onClick={() => handleAdsClick(mobileAdsense[0]?._id, mobileAdsense[0]?.link)}
                className="lg:hidden w-full h-[100px] rounded-lg my-2 border max-w-[500px]">
                <img src={`${BASE_URL}/uploads/${mobileAdsense[0]?.image}`} className="w-full h-full object-contain" alt="" />
              </div>
            }
            

            <span className='text-xl'>BÜTÜN ELANLAR</span>
            {
              loading
                ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 lg:mt-3">
                    {[...Array(8)].map((_, index) => <HomeSkeleton key={index} />)}
                  </div>
                )
                : displayProducts.length == 0
                  ? <div>
                      <EmptyData />
                    </div>
                  : (
                    <>
                      <ProductList products={displayProducts} topMob={'0px'} topDes={'0px'} />
                      {/* Sonuncu elementin görünüşünü izləmək üçün trigger */}
                      <div ref={lastProductRef} style={{ height: '1px' }} />
                      {loadingMore && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 lg:mt-3">
                          {[...Array(4)].map((_, index) => <HomeSkeleton key={`more-${index}`} />)}
                        </div>
                      )}
                    </>
                  )
            }
          </div>

          <Footer />
        </div>

        {/* <div className="hidden xl:block fixed top-0 bg-red-500 w-[250px] h-[100vh] z-[2000] right-0">
          Burda reklam olacaq
        </div> */}

      </div>
      
    </div>
  )
}