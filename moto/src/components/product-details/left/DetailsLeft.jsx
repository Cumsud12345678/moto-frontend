import Stack from "@mui/material/Stack";
import DetailsImages from "./DetailsImages";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Alert from '@mui/material/Alert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton'
import { useEffect } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function DetailsLeft({ product, isLiked, toggleLike, share }){
 
  const {
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

  if(user){

    const { name, profile, phone } = user
    const navigate = useNavigate()

    const formattedPhone = `+994${phone}`
    const text = 'Salam'

    return (
      <div className="flex flex-col w-[100%] lg:w-[65%] min-w-0 mt-13">
        
        <div className="lg:hidden fixed top-0 bg-gray-500 text-white mt-14 w-full z-[1000]">
          <div className="flex items-center justify-between p-1">
            <div className="flex items-center">
              <button className="p-2 cursor-pointer text-white">
                <ArrowBackIosIcon onClick={() => navigate(-1)} />
              </button>
              <span className="font-[500]">{make.label},</span>
              <span className="ml-1">{model.label},</span>
              <span className="ml-2 font-bold text-green-400">{price} ₼</span>
            </div>
            <div>
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


        <div className="mt-7 lg:mt-0">
          <DetailsImages images={images} make={make} />
        </div>
        

        <div className="border-y py-3 my-1 flex flex-col lg:gap-2 text-lg px-3">
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
              <span>{volume} sm / {power} a.g. / {fuel.label}</span>
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
            <div className="grid grid-cols-2">
              <span className="text-gray-500">Təchizat</span>
              <div className="flex flex-wrap gap-2">
                {
                  equipments.map(equipment => (
                    <span key={equipment._id}>{equipment.label},</span>
                  ))
                }
              </div>
              
            </div>
          </div>
        </div>

        <div className="border-b p-3">
          <p className="text-lg">{description}</p>
        </div>

        <div className="lg:hidden border-y p-3">
          <div className="flex">
            {/* <img className="rounded-full w-[60px] h-[60px]" src={profile} alt="" /> */}
            <div className="mx-2 flex flex-col">
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{name}</span>
              <span>{city.label}</span>
            </div>
          </div>

          <div onClick={`tel:${formattedPhone}`} className="flex items-center justify-between p-3 bg-[#2DA562] text-white rounded-lg my-3 gap-2">
            <div className="flex">
              <LocalPhoneIcon sx={{ mx: 1 }} />
              <h5 className="p-0 m-0">+994 {String(phone).slice(0, 2)} {String(phone).slice(2, 5)} {String(phone).slice(5, 7)} {String(phone).slice(7, 9)}</h5>
            </div>
            <h5 className="m-0">Zəng et</h5>
          </div>

          <Alert severity="warning">Motosikletə baxış keçirmədən öncə beh göndərməyin.</Alert>
        </div>


        <div className="fixed bottom-0 w-full p-2 z-[1000] block lg:hidden">
          <div className="flex gap-4">
            
            <button className="w-full bg-[#2DA562] rounded-xl text-white shadow">
              <a
                href={`tel:${phone}`}
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

          </div>
        </div>

      </div>
    )
  }
}