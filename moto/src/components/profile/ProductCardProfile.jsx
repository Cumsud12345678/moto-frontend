import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HoverStyles from '../../css/Hover.module.css'
import { useNavigate } from 'react-router-dom'
import {Button} from "@heroui/react";
import {TrashBin, PencilToSquare} from "@gravity-ui/icons";

export default function ProductCardProfile({ product, deleteClick }){

  const BASE_URL = import.meta.env.VITE_API_URL;
  const { _id, make, model, year, volume, engine, mileage, images, city, price } = product
  const navigate = useNavigate()

  const API = import.meta.env.VITE_API_URL;

  return(
    <div className='rounded-xl overflow-hidden cursor-pointer relative border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-200'>

      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={`${BASE_URL}/uploads/${images[0]}`}
          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          alt=""
        />
      </div>

      <div className="p-2">
        <span className="block font-semibold text-lg leading-tight">{price} ₼</span>
        <p className="text-md font-medium text-gray-800 truncate mt-0.5">
          {make.label} {model.label}
        </p>
        <p className="text-sm text-gray-600 truncate mt-0.5">
          {year} · {volume} sm · {mileage} km
        </p>
        <p className="text-sm text-gray-400 mt-0.5">{city.label}, bugün 16:10</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 p-2 pt-0">
        <Button size='sm' className='w-full' onClick={() => navigate(`/edit/product/${_id}`)}>
          <PencilToSquare />
          Düzəlt
        </Button>

        <Button size='sm' onClick={() => deleteClick(_id)} className='w-full' variant="danger">
          <TrashBin />
          Sil
        </Button>
      </div>

    </div>
  )
}