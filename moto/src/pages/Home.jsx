import { useCallback, useEffect, useRef, useState } from "react";
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
import { Helmet } from "react-helmet-async";

export default function Home(){

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [updatedProducts, setUpdatedProducts] = useState([])

  const filterState = useFilter()
  const {error} = filterState

  const {
    products,
    productsPage,
    productsHasMore,
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


  // Sonsuz scroll - müşahidə edilən sonuncu element
  const observerRef = useRef(null)
  const lastProductRef = useCallback((node) => {
    if(loading || loadingMore) return
    if(observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && productsHasMore){
        setLoadingMore(true)
        dispatch(getAllProducts(productsPage + 1)).finally(() => setLoadingMore(false))
      }
    })

    if(node) observerRef.current.observe(node)
  }, [loading, loadingMore, productsHasMore, productsPage])


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

  const displayProducts = isAuth ? products : updatedProducts

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

      <div className="flex flex-col container mx-auto max-w-[1000px]">
      
        <div className="hidden xl:block lg:fixed top-0 bg-red-500 w-[250px] h-[100vh] z-[2000] left-0">
          {/* Burda reklam olacaq */}
          <div className="w-full h-[100vh]">
            {/* <img src="../../public/download.png" className="w-[2000px] h-[1000px]" alt="" /> */}
          </div>

        </div>

        <div className="z-[9999] bg-[#f5f5f5]">
          <Header filter={filterState} />

          <div className="mt-40 lg:mt-6 px-4 flex flex-col mb-25">

            {/* Burda mobiloe reklam olacaq */}
            <div className="lg:hidden w-full h-[100px] rounded-lg my-2">
              <img src="../../public/mobtop2.jpg" className="w-full h-full object-contain" alt="" />
            </div>

            <span className='text-2xl font-semibold'>Bütün elanlar</span>
            {
              loading
                ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 lg:mt-3">
                    {[...Array(8)].map((_, index) => <HomeSkeleton key={index} />)}
                  </div>
                )
                : displayProducts.length == 0
                  ? 'Elan tapılmadı'
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

        <div className="hidden xl:block fixed top-0 bg-red-500 w-[250px] h-[100vh] z-[2000] right-0">
          {/* Burda reklam olacaq */}
        </div>

      </div>
      
    </div>
  )
}