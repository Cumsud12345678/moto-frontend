import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HoverStyles from '../css/Hover.module.css'
import ProductCardStyle from '../css/ProductCard.module.css'
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorites, setFavorites } from '../redux/slices/favorite/favoritesSlice';
import { toggleProductLike } from '../redux/slices/product/productSlice';
import { toast, useMediaQuery } from "@heroui/react";

export default function ProductCard({ product }) {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuth } = useSelector(s => s.user)

  const { 
    _id, 
    make, 
    model, 
    year, 
    volume, 
    mileage, 
    price, 
    images, 
    city, 
    is_liked: initialIsLiked 
  } = location.pathname == '/bookmarks' ? isAuth ? product.product : product : product

  const [is_liked, setIsLiked] = useState(initialIsLiked)


  const toggleLike = (e) => {
    e.stopPropagation()
    const favorites = JSON.parse(Cookies.get("favorites") || "[]")
    if(is_liked) {
      if(isAuth) {
        toast.promise(
          dispatch(deleteFavorites(_id)).unwrap(),
          {
            loading: 'Favoriden cixardilir...',
            success: 'Favoriden cixardildi',
            error: (err) => err.message || "Xəta baş verdi."
          }  
        )
        // dispatch(deleteFavorites(_id))
      }else {
        const newFavorites = favorites.filter(id => id !== _id)
        Cookies.set("favorites", JSON.stringify(newFavorites))
      }
    }else {
      if(isAuth) {
        toast.promise(
          dispatch(setFavorites(_id)).unwrap(),
          {
            loading: 'Favorilere eklenir...',
            success: 'Favorilere eklendi',
            error: (err) => err.message || 'Xəta baş verdi.'
          }
        )
        // dispatch(setFavorites(_id))
      }else {
        favorites.push(_id)
        Cookies.set("favorites", JSON.stringify(favorites))
      }
    }
    setIsLiked(!is_liked)
    dispatch(toggleProductLike(_id))
  }

  useEffect(() => {
    if(location.pathname == '/bookmarks'){
      setIsLiked(true)
    }
  }, [location.pathname])

  const isDesktop = useMediaQuery('(min-width: 1024px)', { noSsr: true })
  
  return (
    <a
      href={`/elanlar/${_id}`}
      target={`${isDesktop ? '_blank' : ''}`}
      className="rounded-xl overflow-hidden cursor-pointer relative border 
      border-gray-100 bg-white hover:shadow-lg transition-shadow duration-200"
    >
      
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${images?.[0]}`}
          alt={`${make.label} ${model.label} ${year}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

        <button
          onClick={toggleLike}
          className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(4px)', border: 'none' }}
        >
          {is_liked
            ? <FavoriteIcon style={{ color: '#ef4444', fontSize: '18px' }} />
            : <FavoriteBorderIcon style={{ color: 'white', fontSize: '18px' }} />
          }
        </button>
      </div>

      <div className="p-2">
        <span className="block font-semibold text-lg leading-tight">{price} ₼</span>
        <p className="text-md font-medium text-gray-800 truncate mt-0.5">
          {make?.label} {model?.label}
        </p>
        <p className="text-sm text-gray-600 truncate mt-0.5">
          {year} · {volume} sm · {mileage} km
        </p>
        <p className="text-sm text-gray-400 mt-0.5">{city?.label}, bugun 16:10</p>
      </div>

    </a>
  )
}