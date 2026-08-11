import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const useGenerateFavorites = () => {

  const location = useLocation()
  const path = location.pathname.split('/', 2)

  const [updatedProducts, setUpdatedProducts] = useState([])

  const {
    products,
    filteredProducts,
  } = useSelector((state) => state.product)

  const customProducts = path[1] == 'autos' ? filteredProducts : products

  const {
    isAuth
  } = useSelector(s => s.user)

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
      setUpdatedProducts(newProducts)
    }
  }, [isAuth, customProducts])

  const displayProducts = isAuth ? customProducts : updatedProducts

  return {
    displayProducts
  }
}