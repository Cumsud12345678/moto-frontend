import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/header/Header";
import ProductList from "../components/ProductList";
import { useEffect, useState } from "react";
import { HomeSkeleton } from "../components/skeletons/HomeSkeleton";
import EmptyData from "../components/EmptyData";
import Cookies from "js-cookie";
import { toast } from "@heroui/react";
import { getFavorites, getFavoritesNotLogin } from "../redux/slices/favorite/favoritesSlice";

export default function Bookmarks(){

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  const {
    favoritesNotLogin,
    favorites,

    favoritesNotLoginStatus,
    favoritesStatus,
  } = useSelector(s => s.favorite)

  const { isAuth } = useSelector(s => s.user)

  useEffect(() => {
    if(isAuth) {
      console.log('aha')
      dispatch(getFavorites())
    }else {
      let parseFavorites = []
      try {
        parseFavorites = JSON.parse(Cookies.get('favorites') || '[]')
      } catch {
        parseFavorites = []
      }
      dispatch(getFavoritesNotLogin(parseFavorites))
    }
  }, [])

  useEffect(() => {
    if(favoritesNotLoginStatus !== 'idle' || favoritesStatus !== 'idle') {
      setLoading(false)
    }
  }, [favoritesNotLoginStatus, favoritesStatus])

  useEffect(() => {
    let newProducts = []
    if (isAuth && favoritesStatus == 'success') {
      newProducts = favorites.map(product => ({
        ...product,
        is_liked: true
      }))
      console.log(newProducts)
    } else {
      newProducts = favoritesNotLogin.map(product => ({
        ...product,
        is_liked: true
      }))
    }
    setProducts(newProducts)
  }, [isAuth, favoritesNotLogin, favorites, favoritesStatus])
  
  return(
    <div>
      <Header />
      <div className="mt-17 px-4 container mx-auto max-w-[1000px]">
        <span className='text-2xl font-semibold'>Bütün elanlar</span>
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
              ?
              <div className="mt-25">
                <EmptyData />
              </div>
              :
              <ProductList products={products} topMob={'0px'} topDes={'0px'} />
        }
      </div>
      <Footer />
    </div>
  )

}