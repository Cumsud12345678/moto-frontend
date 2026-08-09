import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { getAllProducts, getFilteredProducts } from "../../redux/slices/product/productSlice"
import { getAdsense } from "../../redux/slices/admin/adminAdsenseSlice"
import { useFilter } from "../../components/header/filter/hooks/useFilter"
import Cookies from "js-cookie";

export const useHomeAutos = () => {
  const type = useState('home')

  const BASE_URL = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  const location = useLocation()

  // Home
  const [homeLoading, setHomeLoading] = useState(true)
  const [homeLoadingMore, setHomeLoadingMore] = useState(false)
  const [homeUpdatedProducts, setHomeUpdatedProducts] = useState([])

  // Autos
  const [autosLoading, setAutosLoading] = useState(true)
  const [autosLoadingMore, setAutosLoadingMore] = useState(false)
  const [autosUpdatedProducts, setAutosUpdatedProducts] = useState([])

  const filterState = useFilter()
  const {error} = filterState

  const {
    // Home page
    products,
    productsPage,
    productsHasMore,
    productsStatus,

    message,

    // Autos page
    filteredProducts,
    filteredProductsPage,
    filteredProductsHasMore,
    filteredStatus,
  } = useSelector((state) => state.product)

  // Birlesdirdik
  const [customLoading, setCustomLoading] = useState(true)
  const [customLoadingMore, setCustomLoadingMore] = useState(false)
  const [customUpdatedProducts, setCustomUpdatedProducts] = useState([])
  
  const customProducts = type === 'home' ? products : filteredProducts
  const customPage = type === 'home' ? productsPage : filteredProductsPage
  const customHasMore = type === 'home' ? productsHasMore : filteredProductsHasMore
  const customStatus = type === 'home' ? productsStatus : filteredStatus

  const {
    isAuth
  } = useSelector(s => s.user)

  const {
    adsenseData,
    clickStatus
  } = useSelector(s => s.adminAdsense)

  useEffect(() => {
    // artiq mehsullar redux-da varsa, yeniden cekmirik - eks halda
    // hansisa elana baxib geri qayidanda backend-in sirasi deyise biler
    // ve ekranda elanlarin yeri qarisir
    if(customStatus === 'idle'){
      if(type === 'home') {
        dispatch(getAllProducts())
      }else {
        dispatch(getFilteredProducts({customPage, query: location.search}))
      }
    } else {
      setCustomLoading(false)
    }

    dispatch(getAdsense())
  }, [location.search])

  // Sonsuz scroll - müşahidə edilən sonuncu element
  const observerRef = useRef(null)
  const lastProductRef = useCallback((node) => {
    if (customLoading || customLoadingMore) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && customHasMore) {
        setCustomLoadingMore(true)
        if(type === 'home') {
          dispatch(getAllProducts(customPage + 1)).finally(() => setCustomLoadingMore(false))
        }else {
          dispatch(getFilteredProducts({filteredProductsPage, query: location.search}))
        }
      }
    })

    if (node) observerRef.current.observe(node)
  }, [customLoading, customLoadingMore, customHasMore, customPage])

  useEffect(() => {
    if (message) toast.danger(message)
    if (error) toast.danger(error)
  }, [message, error])

  useEffect(() => {
    if(customStatus !== 'idle'){
      setCustomLoading(false)
    }
  }, [customStatus])

  useEffect(() => {
    if (!isAuth) {
      let favorites = []
      try {
        favorites = JSON.parse(Cookies.get('favorites') || '[]')
      } catch { favorites = [] }
      const favoriteSet = new Set(favorites)
      const newProducts = customProducts.map(product => ({
        ...product,
        is_liked: favoriteSet.has(product._id)
      }))
      setCustomUpdatedProducts(newProducts)
    }
  }, [isAuth, customProducts])

  useEffect(() => {
    if(adsenseData.length > 0) {
      setMobileAdsense(adsenseData.filter(ads => ads.position === 'mobile'))
      setDeskopAdsense(adsenseData.filter(ads => ads.position === 'deskop'))
    }
  }, [adsenseData])

  const [mobileAdsense, setMobileAdsense] = useState([])
  const [deskopAdsense, setDeskopAdsense] = useState([])

  const displayProducts = isAuth ? customProducts : customUpdatedProducts
  const isDesktop = useMediaQuery('(min-width: 1024px)', { noSsr: true })

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


  useEffect(() => {
    
  }, [location.pathname])



  return {
    filterState,
    mobileAdsense,
    handleAdsClick,
    BASE_URL,
    loading: customLoading,
    displayProducts,
    lastProductRef,
    loadingMore: customLoadingMore,
  }
}