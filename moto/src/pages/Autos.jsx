import { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import ProductList from "../components/ProductList";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@heroui/react";
import { useLocation } from "react-router-dom";
import { HomeSkeleton } from "../components/skeletons/HomeSkeleton";
import { getFilteredProducts } from "../redux/slices/product/productSlice";
import { useFilter } from '../components/header/filter/hooks/useFilter'
import { toast } from "@heroui/react";
import { Helmet } from "react-helmet-async";
import { clickAdsense, getAdsense } from "../redux/slices/admin/adminAdsenseSlice";
import EmptyData from "../components/EmptyData";
import PaginationComponent from "../components/customs/libs/LibPagination";
import { useGenerateFavorites } from "../components/customs/hooks/useGenerateFavorites";
import { useAdsense } from "../components/customs/hooks/useAdsense";

export default function Autos(){

  const BASE_URL = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  const location = useLocation()

  const [loading, setLoading] = useState(true)

  // Generate Favorites
  const {
    displayProducts
  } = useGenerateFavorites()

  // Adsense
  const {
    mobileAdsense,
    handleAdsClick,
    deskopLeftAdsense,
    deskopRightAdsense
  } = useAdsense()
  
  const filterState = useFilter()
  const {error, page, setPage, applyFilter} = filterState

  const {
    totalFilteredProducts,
    message,
    filteredStatus,
  } = useSelector(s => s.product)

  useEffect(() => {
    if(filteredStatus !== 'idle'){
      setLoading(false)
    }
  }, [filteredStatus])

  useEffect(() => {
    setLoading(true)
    dispatch(getFilteredProducts(location.search))
  }, [location.search])

  useEffect(() => {
    if (filteredStatus === 'idle') {
      dispatch(getFilteredProducts(location.search))
    }
  }, [])


  const manageUrlAndPage = (newPage) => {
    setPage(newPage)
    applyFilter(newPage)
  }

  useEffect(() => {
    if(message) toast.danger(message)
    if(error) toast.danger(error)
  }, [message, error])

  useEffect(() => {
    if(filteredStatus !== 'idle'){
      setLoading(false)
    }
  }, [filteredStatus])

  const isDesktop = useMediaQuery('(min-width: 1000px)', { noSsr: true })

  return(
    <div>

      <Helmet>
        <title>Bütün Elanlar — Moto</title>
        <meta name="description" content="Motosiklet elanlarını marka, model, qiymət və s. görə axtarın və filterləyin." />
        <meta property="og:title" content="Bütün Elanlar — Moto" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dir-indexed-five-prep.trycloudflare.com" />
      </Helmet>

      <div className="flex flex-col">
      
        {
          deskopRightAdsense.length > 0 &&
          <div className="hidden xl:block lg:fixed top-0 bg-red-500 w-[250px] h-[100vh] z-[10000] left-0">
            <div 
              onClick={() => handleAdsClick(deskopRightAdsense[0]?._id, deskopRightAdsense[0]?.link)}
              className="w-full h-[100vh]"
            >
              <img src={`${BASE_URL}/uploads/${deskopRightAdsense[0]?.image}`} className="w-[2000px] h-[1000px]" alt="" />
            </div>
          </div>
        }

        <div className="z-[9999] bg-[#f5f5f5]">
          <Header filter={filterState} />

          <div className="mt-45 lg:mt-6 px-4 flex flex-col max-w-[1000px] mx-auto">
            
            {/* Burda mobile reklam olacaq */}
            {
              mobileAdsense.length > 0 && 
              <div 
                onClick={() => handleAdsClick(mobileAdsense[0]?._id, mobileAdsense[0]?.link)}
                className="lg:hidden w-full h-[100px] rounded-lg my-2 border max-w-[500px] mx-auto">
                <img src={`${BASE_URL}/uploads/${mobileAdsense[0]?.image}`} className="w-full h-full object-contain" alt="" />
              </div>
            }

            <span className='text-xl mt-1'>BÜTÜN ELANLAR</span>
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
                  : <ProductList products={displayProducts} topMob={'0px'} topDes={'0px'} />
                  
            }
          </div>

          <div className="flex items-center justify-center my-5 py-3 mb-30 bg-white">
            <PaginationComponent page={page} setPage={manageUrlAndPage} totalPages={totalFilteredProducts} />
          </div>
          
          <Footer />
        </div>

        {
          deskopLeftAdsense.length > 0 &&
          <div className="hidden xl:block lg:fixed top-0 bg-red-500 w-[250px] h-[100vh] z-[10000] right-0">
            <div 
              onClick={() => handleAdsClick(deskopLeftAdsense[0]?._id, deskopLeftAdsense[0]?.link)}
              className="w-full h-[100vh]"
            >
              <img src={`${BASE_URL}/uploads/${deskopLeftAdsense[0]?.image}`} className="w-[2000px] h-[1000px]" alt="" />
            </div>
          </div>
        }

      </div>
      
    </div>
  )
}