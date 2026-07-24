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
import Cookies from "js-cookie";

export default function Home(){

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [updatedProducts, setUpdatedProducts] = useState([])

  const filterState = useFilter()
  const {error} = filterState

  const {
    products,
    message,
    productsStatus
  } = useSelector((state) => state.product)

  const {
    isAuth
  } = useSelector(s => s.user)

  useEffect(() => {
    // artiq mehsullar redux-da varsa, yeniden cekmirik - eks halda
    // hansisa elana baxib geri qayidanda backend-in sirasi deyise biler
    // ve ekranda elanlarin yeri qarisir
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

  useEffect(() => {
    if(productsStatus !== 'idle'){
      setLoading(false)
    }
  }, [productsStatus])

  useEffect(() => {
    if(!isAuth){
      let favorites = []
      try { 
        favorites = JSON.parse(Cookies.get('favorites') || '[]') 
      } catch { favorites = [] }
      const favoriteSet = new Set(favorites)
      const newProducts = products.map(product => ({
        ...product,
        is_liked: favoriteSet.has(product._id)
      }))
      setUpdatedProducts(newProducts)
    }
  }, [isAuth, products])

  const isDesktop = useMediaQuery('(min-width: 1024px)', { noSsr: true })

  return(
    <div>
      <Header filter={filterState} />
      <div className="mt-40 lg:mt-6 px-4 container mx-auto max-w-[1000px] flex flex-col mb-25 z-[100]">
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
              products.length == 0 
                ? 'Urun tapilmadi'
                : isAuth
                  ?  <ProductList products={products} topMob={'0px'} topDes={'0px'} />
                  :  <ProductList products={updatedProducts} topMob={'0px'} topDes={'0px'} />
        }
        
      </div>
      <Footer />
    </div>
  )
}