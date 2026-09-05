import Stack from "@mui/material/Stack";
import DetailsImages from "./DetailsImages";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Alert from '@mui/material/Alert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton'
import { Fragment, useEffect, useState } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {Button} from "@heroui/react";
import {TrashBin, PencilToSquare} from "@gravity-ui/icons";
import { Avatar } from "@mui/material";

export default function DetailsLeft({ product, isLiked, toggleLike, share, clickDelete }){

  const location = useLocation()
  const path = location.pathname.split('/', 2)
 
  const {
    _id,
    phone,
    views,
    make,
    model,
    year,
    volume,
    mileage,
    price,
    images,
    user,
    category,
    fuel,
    speed,
    status,
    description,
    power, 
    city, 
    color,
    equipments
  } = product

  const BASE_URL = import.meta.env.VITE_API_URL;

  if(user){

    const { name, profile } = user
    const navigate = useNavigate()

    const formattedPhone = `+994${phone}`
    const text = 'Salam'

    return (
      <div className="flex flex-col w-[100%] lg:w-[65%] min-w-0 mt-12">
        
        <div className="lg:hidden fixed top-0 bg-gray-500 text-white mt-14 w-full z-[1000]">
          <div className="flex items-center justify-between p-1">
            <div className="flex items-center overflow-x-auto truncate scrollbar-none">
              <button className="p-2 cursor-pointer text-white">
                <ArrowBackIosIcon onClick={() => navigate(-1)} />
              </button>
              <span className="font-[500]">{make.label},</span>
              <span className="ml-1">{model.label},</span>
              <span className="ml-2 font-bold text-green-400">{price} ₼</span>
            </div>
            <div className="flex">
              <button onClick={share} className="p-2 cursor-pointer text-white">
                <ShareIcon sx={{ fontSize: '22px', mx: 2 }} />
              </button>
              <button onClick={toggleLike} className="p-2 cursor-pointer text-white">
                {isLiked
                  ? <FavoriteIcon style={{ color: '#ef4444', fontSize: '22px' }} />
                  : <FavoriteBorderIcon style={{ color: 'white', fontSize: '22px' }} />
                }
              </button>
            </div>
          </div>
        </div>


        <div className="mt-14 lg:mt-0">
          <DetailsImages images={images} make={make} />
        </div>
        
        <div className="p-3 lg:border-t lg:mt-3">
          <span>Baxış sayı: {views}</span>
        </div>

        <div className="border-t py-3 my-1 grid grid-cols-1 lg:grid-cols-2 lg:gap-2 text-md px-3">
          <div className="flex flex-col gap-2 w-full">
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Şəhər</span>
              <span>{city.label}</span>
            </div>

            <div className="grid grid-cols-2">
              <span className="text-gray-500">Marka</span>
              <span>{make.label}</span>
            </div>

            <div className="grid grid-cols-2">
              <span className="text-gray-500">Model</span>
              <span>{model.label}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Sürətlər qutusu</span>
              <span>{speed.label}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Rəng</span>
              <span>{color.label}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Qiymət</span>
              <span>{price}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Buraxılış ili</span>
              <span>{year}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Ban növü</span>
              <span>{category.label}</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Muhərrik</span>
              <span>{volume} sm³ / {power} a.g. / {fuel.label}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Yürüş</span>
              <span>{mileage} km</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Yeni?</span>
              <span>{status.label}</span>
            </div>
          </div>
        </div>

        {
          equipments.length !== 0 && 
            <div className="flex flex-wrap gap-2 border-y py-3 px-3 lg:px-0">
              {
                equipments.map(equipment => (
                  <button className="p-2 px-3 rounded-2x bg-[#ebedf3] rounded-full text-md" key={equipment._id}>{equipment.label}</button>
                ))
              }
            </div>
        }
        

        <div className="border-b p-3">
          <p className="text-lg whitespace-pre-line text-[15px]">{description}</p>
        </div>

        <div className={`lg:hidden border-y p-3 ${path[1] == 'elanlarim' && 'pb-18'}`}>
          <div className="flex bg-white p-2 rounded-lg items-center">
            <Avatar alt="Remy Sharp" src={profile ? `${BASE_URL}/uploads/${profile}` : '/profile.jpg'} sx={{ width: 56, height: 56 }} />
            {/* <img className="rounded-full w-[60px] h-[60px] object-contain border-2" src={profile ? `${BASE_URL}/uploads/${profile}` : '/profile.jpg'} alt="" /> */}
            <div className="mx-2 flex flex-col">
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{name}</span>
              <span>{city.label}</span>
            </div>
          </div>

          <a 
            href={`tel:${formattedPhone}`}
            target="_blank"
            rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-[#2DA562] text-white rounded-lg my-3 gap-2"
          >
            <div className="flex">
              <LocalPhoneIcon sx={{ mx: 1 }} />
              <h5 className="p-0 m-0">+994 {String(phone).slice(0, 2)} {String(phone).slice(2, 5)} {String(phone).slice(5, 7)} {String(phone).slice(7, 9)}</h5>
            </div>
            <h5 className="m-0">Zəng et</h5>
          </a>

          <Alert severity="warning">Motosikletə baxış keçirmədən öncə beh göndərməyin.</Alert>
        </div>

        <div className="fixed bottom-0 w-full p-4 z-[1000] block lg:hidden">
          <div className="flex gap-3">
            
            {
              path[1] == 'elanlar'
                ? 
                <Fragment>
                  <button className="w-full bg-[#2DA562] rounded-xl text-white shadow">
                    <a
                      href={`tel:${formattedPhone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center p-3"
                    >
                      <LocalPhoneIcon sx={{ mx: 1 }} />
                      <span className="text-white font-bold">Zəng et</span>
                    </a>
                  </button>

                  <button className="w-full bg-blue-500 rounded-xl text-white shadow">
                    <a
                      href={`https://wa.me/${phone}?text=${text}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center p-3"
                    >
                      <WhatsAppIcon sx={{ mx: 1 }} />
                      WhatsApp
                    </a>
                  </button>
                </Fragment>
                
                : 
                <Fragment>
                  <Button size='lg' className='w-full' onClick={() => navigate(`/edit/product/${_id}`)}>
                    <PencilToSquare />
                    Düzəlt
                  </Button>

                  <Button size='lg' className='w-full' onClick={() => clickDelete(_id)} variant="danger">
                    <TrashBin />
                    Sil
                  </Button>
                </Fragment>
            }

          </div>
        </div>

      </div>
    )
  }
}