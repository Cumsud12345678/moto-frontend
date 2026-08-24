import { AlertDialog as HeroAlertDialog, toast } from "@heroui/react";
import { useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HoverStyles from '../../css/Hover.module.css'
import { useNavigate } from 'react-router-dom'
import {Button} from "@heroui/react";
import {TrashBin, PencilToSquare, CircleInfo} from "@gravity-ui/icons";
import { useDispatch } from "react-redux";
import { setActiveProduct } from "../../redux/slices/product/productSlice";

export default function ProductCardProfile({ product, deleteClick, type }){

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const BASE_URL = import.meta.env.VITE_API_URL;
  const { _id, make, model, year, volume, engine, mileage, images, city, price, createdAt } = product
  const API = import.meta.env.VITE_API_URL;

  const handleNext = () => {
    if(type) {
      navigate(`/elanlarim/${_id}`)
    }
  }

  const setActive = () => {
    toast.promise(dispatch(setActiveProduct(_id)).unwrap(), 
    {
      loading: 'Elan güncəllənir',
      success: 'Elan güncəlləndi',
      error: (err) => err.message || 'Bir xəta baş verdi'
    })
  }

  const [openAlert, setOpenAlert] = useState(false)

  return(
    <div 
      onClick={handleNext}
      className='rounded-xl overflow-hidden cursor-pointer relative border 
      border-gray-100 bg-white hover:shadow-lg transition-shadow duration-200'
    >
      {
        !type &&
        <div className="truncate p-1 text-sm bg-red-500 text-white font-semibold absolute top-0 z-[99999] w-full">
          Bu elan 3gün içində silinəcək!
        </div>
      }
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-200">
        <img
          src={`${BASE_URL}/uploads/${images?.[0]}`}
          className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          alt="profile"
        />
      </div>

      <div className="p-2">
        <span className="block font-semibold text-lg leading-tight">{price} ₼</span>
        <p className="text-md font-medium text-gray-800 truncate mt-0.5">
          {make?.label} {model?.label}
        </p>
        <p className="text-sm text-gray-600 truncate mt-0.5">
          {year}, {volume} sm³, {mileage} km
        </p>
        <p className="text-sm text-gray-400 truncate mt-0.5">{city?.label}, {createdAt}</p>
      </div>

      {
        type
        ?
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
        :
          <div className="flex flex-col sm:flex-row gap-2 p-2 pt-0">
            <Button size='sm' className='w-full' onClick={() => setOpenAlert(true)} variant="danger">
              <CircleInfo />
              Bərpa et
            </Button>
          </div>
      }



      <HeroAlertDialog isOpen={openAlert} onOpenChange={setOpenAlert}>
        <HeroAlertDialog.Backdrop className='z-[10000]'>
          <HeroAlertDialog.Container>
            <HeroAlertDialog.Dialog className="sm:max-w-[400px]">
              <HeroAlertDialog.CloseTrigger />
              <HeroAlertDialog.Header>
                <HeroAlertDialog.Icon status="danger" />
                <HeroAlertDialog.Heading>Bu elan niyə deaktiv edildi?</HeroAlertDialog.Heading>
              </HeroAlertDialog.Header>
              <HeroAlertDialog.Body>
                <p>
                  Elanın aktivlik statusu 30gün keçdiyi üçün dayandırıldı. Yenidən bərpa etmək üçün "Bərpa et" düyməsini sıxın
                </p>
              </HeroAlertDialog.Body>
              <HeroAlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Geri
                </Button>
                <Button onClick={setActive} slot="close" variant="tertiary">
                  Bərpa et
                </Button>
              </HeroAlertDialog.Footer>
            </HeroAlertDialog.Dialog>
          </HeroAlertDialog.Container>
        </HeroAlertDialog.Backdrop>
      </HeroAlertDialog>

    </div>
  )
}