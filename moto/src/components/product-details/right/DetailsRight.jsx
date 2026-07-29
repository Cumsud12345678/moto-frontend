import Stack from "@mui/material/Stack";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Alert from '@mui/material/Alert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "@heroui/react";
import { deleteFavorites, setFavorites } from "../../../redux/slices/favorite/favoritesSlice";
import { toggleProductLike } from "../../../redux/slices/product/productSlice";
import { useDispatch } from "react-redux";

export default function DetailsRight({ user, price, city, id, ids, auth }){

  const dispatch = useDispatch()


  
  // if (user && price && city) {

    const { name, profile, phone } = user
    const BASE_URL = import.meta.env.VITE_API_URL;

    const [isLike, setIsLike] = useState(false)

    useEffect(() => {
      if(auth) {
        console.log(ids)
        if(!ids || ids.length == 0) return;
        for(const value of ids){
          value == id && setIsLike(true)
        }
      }else {
        const favorites = JSON.parse(Cookies.get("favorites") || "[]")
        for(const favorite of favorites) {
          favorite == id && setIsLike(false)
        }
      }
    }, [])


    const toggleLike = () => {
      const favorites = JSON.parse(Cookies.get("favorites") || "[]")
      if (isLike) {
        if (auth) {
          toast.promise(
            dispatch(deleteFavorites(id)).unwrap(),
            {
              loading: 'Favoriden cixardilir...',
              success: 'Favoriden cixardildi',
              error: (err) => err.message || "Xəta baş verdi."
            }
          )
        } else {
          const newFavorites = favorites.filter(id => id !== id)
          Cookies.set("favorites", JSON.stringify(newFavorites))
        }
      } else {
        if (auth) {
          toast.promise(
            dispatch(setFavorites(id)).unwrap(),
            {
              loading: 'Favorilere eklenir...',
              success: 'Favorilere eklendi',
              error: (err) => err.message || 'Xəta baş verdi.'
            }
          )
        } else {
          favorites.push(id)
          Cookies.set("favorites", JSON.stringify(favorites))
        }
      }
      setIsLike(!isLike)
      dispatch(toggleProductLike(id))
    }


    return (
      <div className="hidden lg:block lg:w-[35%] min-w-0">
        <div className="sticky top-[120px] z-[999] mt-3 rounded-lg border bg-white shadow-sm w-full h-auto">

          <div className="flex items-center justify-between border-b px-4 py-3">
            <h5 className="text-lg font-medium">Qiymət</h5>
            <h3 className="text-2xl font-semibold">{price} ₼</h3>
          </div>

          <div className="p-4">
            <div className="flex">
              <img
                src={profile ? `${BASE_URL}/uploads/${profile}` : '/profile.jpg'}
                alt="profile"
                className="h-[60px] w-[60px] rounded-full"
              />

              <div className="mx-2 flex flex-col">
                <span className="text-[18px] font-bold">{name}</span>
                <span>{city}</span>
              </div>
            </div>

            <div 
              onClick={toggleLike}
              className={`my-3 flex flex-row items-center rounded-lg border p-2 ${isLike ? 'bg-green-300' : ''}`}
            >
              <FavoriteBorderIcon sx={{ fontSize: "30px" }} />
              <span className="mx-2 text-xl font-medium">Bəyən</span>
            </div>

            <div className="my-3 flex flex-row items-center rounded-lg border p-2">
              <ShareIcon sx={{ fontSize: "30px" }} />
              <span className="mx-2 text-xl font-medium">Paylaş</span>
            </div>

            <div className="my-3 flex flex-row items-center rounded-lg border p-2">
              <OutlinedFlagIcon sx={{ fontSize: "30px" }} />
              <span className="mx-2 text-xl font-medium">Şikayət et</span>
            </div>

            <div className="my-3 flex items-center gap-2 rounded bg-green-600 p-3 text-white">
              <LocalPhoneIcon sx={{ mx: 1 }} />
              <h4 className="m-0 p-0 text-xl font-semibold">
                {phone}
              </h4>
            </div>

            <Alert severity="warning">
              Motosikletə baxış keçirmədən öncə beh göndərməyin.
            </Alert>
          </div>

        </div>
      </div>
    )
  // }
  
}