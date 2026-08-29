import Stack from "@mui/material/Stack";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Alert from '@mui/material/Alert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLocation, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import {Button} from "@heroui/react";
import {TrashBin, PencilToSquare} from "@gravity-ui/icons";
import { Avatar } from "@mui/material";

export default function DetailsRight({ user, product, isLiked, toggleLike, share, clickDelete }){

  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname.split('/', 2)

  const {
    _id,
    phone,
    price,
    city
  } = product

  const { name, profile } = user
  const BASE_URL = import.meta.env.VITE_API_URL;

  const formattedPhone = `+994${phone}`

  return (
    <div className="hidden lg:block lg:w-[35%] min-w-0">
      <div className="sticky top-[120px] z-[999] mt-3 rounded-lg border bg-[#f5f5f5] shadow-sm w-full h-auto">

        <div className="flex items-center justify-between border-b px-4 py-3">
          <h5 className="text-2xl font-bold">Qiymət</h5>
          <h3 className="text-2xl font-semibold text-red-500">{price} ₼</h3>
        </div>

        <div className="p-4">
          <div className="flex">
            <Avatar alt="profile" src={profile ? `${BASE_URL}/uploads/${profile}` : '/profile.jpg'} sx={{ width: 56, height: 56 }} />
            {/* <img
              src={profile ? `${BASE_URL}/uploads/${profile}` : '/profile.jpg'}
              alt="profile"
              className="h-[60px] w-[60px] rounded-full object-contain border-2"
            /> */}

            <div className="mx-2 flex flex-col">
              <span className="text-[18px] font-bold">{name}</span>
              <span>{city?.label}</span>
            </div>
          </div>

          <div
            onClick={toggleLike}
            className={`my-3 flex flex-row items-center rounded-lg border p-2 cursor-pointer bg-white`}
          >
            {isLiked
              ? <FavoriteIcon style={{ color: '#ef4444', fontSize: '30px' }} />
              : <FavoriteBorderIcon style={{ color: 'black', fontSize: '30px' }} />
            }
            <span className="mx-2 text-xl font-medium">Bəyən</span>
          </div>

          <div onClick={share} className="my-3 flex flex-row items-center rounded-lg border bg-white p-2 cursor-pointer">
            <ShareIcon sx={{ fontSize: "30px" }} />
            <span className="mx-2 text-xl font-medium">Paylaş</span>
          </div>

          {/* <div className="my-3 flex flex-row items-center rounded-lg border p-2">
            <OutlinedFlagIcon sx={{ fontSize: "30px" }} />
            <span className="mx-2 text-xl font-medium">Şikayət et</span>
          </div> */}

          {
            path[1] == 'elanlar'
              ?
              <a 
                href={`tel:${formattedPhone}`}
                target="_blank"
                className="my-3 flex items-center gap-2 rounded-lg bg-[#2da562] p-3 text-white cursor-pointer">
                <LocalPhoneIcon sx={{ mx: 1 }} />
                <h4 className="m-0 p-0 text-xl font-semibold">
                  +994 {String(phone).slice(0, 2)} {String(phone).slice(2, 5)} {String(phone).slice(5, 7)} {String(phone).slice(7, 9)}
                </h4>
              </a>
              :
              <div className="flex mb-4 gap-3">
                <Button size='lg' className='w-full' onClick={() => navigate(`/edit/product/${_id}`)}>
                  <PencilToSquare />
                  Düzəlt
                </Button>

                <Button size='lg' className='w-full' onClick={() => clickDelete(_id)} variant="danger">
                  <TrashBin />
                  Sil
                </Button>
              </div>
          }
          

          <Alert severity="warning">
            Motosikletə baxış keçirmədən öncə beh göndərməyin.
          </Alert>
        </div>

      </div>
    </div>
  )
}