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

export default function Autos(){

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

      <div className="flex flex-col container mx-auto max-w-[1000px]">
      
        <div className="hidden xl:block lg:fixed top-0 bg-red-500 w-[250px] h-[100vh] z-[2000] left-0">
          {/* Burda reklam olacaq */}
        </div>

        <div className="z-[9999999] bg-[#f5f5f5]">
          <Header filter={filterState} />

          <div className="mt-40 lg:mt-6 px-4 flex flex-col mb-25">
            <span className='text-2xl font-semibold'>Bütün elanlar</span>
            {
              loading
                ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 lg:mt-3">
                    {[...Array(8)].map((_, index) => <HomeSkeleton key={index} />)}
                  </div>
                )
                : filteredProducts.length == 0
                  ? 'Elan tapılmadı'
                  : <ProductList products={filteredProducts} topMob={'0px'} topDes={'0px'} />
            }
          </div>

          <Footer />
        </div>

        <div className="hidden xl:block fixed top-0 bg-red-500 w-[250px] h-[100vh] z-[2000] right-0">
          {/* Burda reklam olacaq */}
        </div>

      </div>

      <Footer />
      
    </div>
  )
}