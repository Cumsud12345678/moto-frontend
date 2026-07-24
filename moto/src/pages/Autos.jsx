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
      <Header filter={filterState} />
      <div className="mt-43 lg:mt-6 px-4 container mx-auto max-w-[1000px] flex flex-col mb-20">
        <span className='text-2xl font-semibold'>Butun elanlar</span>
        {
          loading
            ?
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 lg:mt-3">
              {
                [...Array(8)].map((_, index) => (
                  <HomeSkeleton key={index} />
                ))
              }
            </div>
            :
            filteredProducts.length == 0
              ? 'Urun tapilmadi'
              : <ProductList products={filteredProducts} topMob={'0px'} topDes={'0px'} />
        }
      </div>
      {/* <div className="mt-15 lg:mt-6 px-4 container mx-auto max-w-[1000px]">
        <span className='text-2xl font-semibold'>Butun elanlar</span>
        <ProductList products={products} topMob={'0px'} topDes={'0px'} />
      </div>
      <Footer /> */}
    </div>
  )
}