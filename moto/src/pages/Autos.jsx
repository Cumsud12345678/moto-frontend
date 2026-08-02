import { useEffect, useState } from "react";
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
import { clickAdsense } from "../redux/slices/admin/adminAdsenseSlice";
import EmptyData from "../components/EmptyData";

export default function Autos(){

  const BASE_URL = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  const filterState = useFilter()
  const {error} = filterState

  const {
    filteredProducts,
    filteredStatus,
    message
  } = useSelector(s => s.product)

  const {
    adsenseData,
    clickStatus
  } = useSelector(s => s.adminAdsense)

  useEffect(() => {
    setLoading(true)
    dispatch(getFilteredProducts(location.search))

  }, [location.search])

  useEffect(() => {
    if(message) toast.danger(message)
    if(error) toast.danger(error)
  }, [message, error])

  useEffect(() => {
    if(filteredStatus !== 'idle'){
      setLoading(false)
    }
  }, [filteredStatus])

  const [mobileAdsense, setMobileAdsense] = useState([])
  const [deskopAdsense, setDeskopAdsense] = useState([])

  const isDesktop = useMediaQuery('(min-width: 1000px)', { noSsr: true })
  
  const handleAdsClick = async (id, link) => {
    dispatch(clickAdsense(id))
    if (clickStatus === 'success') {
      window.open(
        `https://${link}`,
        "_blank",
        "noopener,noreferrer"
      )
    }
  }

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

            <span className='text-xl mt-1'>BÜTÜN ELANLAR</span>
            {
              loading
                ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 lg:mt-3">
                    {[...Array(8)].map((_, index) => <HomeSkeleton key={index} />)}
                  </div>
                )
                : filteredProducts.length == 0
                  ? <div>
                      <EmptyData />
                    </div>
                  : <ProductList products={filteredProducts} topMob={'0px'} topDes={'0px'} />
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