import DetailsLeft from "../product-details/left/DetailsLeft";
import DetailsRight from "../product-details/right/DetailsRight";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ProductList from "../ProductList";
import { DetailsSkeleton } from "../skeletons/DetailsSkeleton";
import { HomeSkeleton } from "../skeletons/HomeSkeleton";
import { toast } from "@heroui/react";
import { toggleProductLike } from "../../redux/slices/product/productSlice";
import { deleteFavorites, setFavorites } from "../../redux/slices/favorite/favoritesSlice";
import Cookies from "js-cookie";

export default function Details({details, ids}){

  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(false)

  const {
    _id,
    year,
    volume,
    mileage,
    price,
    images,
    user,
    make,
    model,
    city,
    color
  } = details

  const {isAuth} = useSelector(s => s.user)

  useEffect(() => {
    if (isAuth) {
      if (!ids || ids.length == 0) return;
      for (const value of ids) {
        value == _id && setIsLiked(true)
      }
    } else {
      const favorites = JSON.parse(Cookies.get("favorites") || "[]")
      for (const favorite of favorites) {
        favorite == _id && setIsLiked(false)
      }
    }
  }, [])

  const toggleLike = () => {
    const favorites = JSON.parse(Cookies.get("favorites") || "[]")
    if (isLiked) {
      if (isAuth) {
        toast.promise(
          dispatch(deleteFavorites(_id)).unwrap(),
          {
            loading: 'Favoriden cixardilir...',
            success: 'Favoriden cixardildi',
            error: (err) => err.message || "Xəta baş verdi."
          }
        )
      } else {
        const newFavorites = favorites.filter(id => id !== _id)
        Cookies.set("favorites", JSON.stringify(newFavorites))
      }
    } else {
      if (isAuth) {
        toast.promise(
          dispatch(setFavorites(_id)).unwrap(),
          {
            loading: 'Favorilere eklenir...',
            success: 'Favorilere eklendi',
            error: (err) => err.message || 'Xəta baş verdi.'
          }
        )
      } else {
        favorites.push(_id)
        Cookies.set("favorites", JSON.stringify(favorites))
      }
    }
    setIsLiked(!isLiked)
    dispatch(toggleProductLike(_id))
  }


  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = `${window.location.origin}/elanlar/${_id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${make.label} ${model.label}`,
          text: `${make.label} ${model.label} elanına bax`,
          url,
        });
      } catch (err) {
        // İstifadəçi paylaşmanı ləğv edə bilər
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link kopyalandı.");
    }
  };

  return (
    <div>

      <div className="hidden lg:flex flex-row items-center justify-between bg-gray-500 text-white rounded-lg mb-2 px-3 py-2 top-[55px] sticky z-[1000]">
        <div className="flex items-center">
          <span className="font-bold text-lg">{make.label}, {model.label}, {volume}, {year}, {mileage}</span>
        </div>
        <div>
          <span className="font-bold text-lg">{price}</span>
        </div>
      </div>

      <div className="flex gap-3 flex-col lg:flex-row">

        <DetailsLeft product={details} isLiked={isLiked} toggleLike={toggleLike} share={handleShare} />
        <DetailsRight user={user} price={price} city={city.label} isLiked={isLiked} toggleLike={toggleLike} share={handleShare} />

      </div>

    </div>
  )
}