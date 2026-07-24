import {Input, Label, useMediaQuery} from "@heroui/react";
import { useEffect, useState } from "react";
import DefaultInput from "../customs/DefaultInput";
import ButtonGroup from "../customs/ButtonGroup";
import LibDropzone from "../customs/libs/LibDropzone";
import CloseIcon from '@mui/icons-material/Close';
import SearchAndSelect from "../customs/SearchAndSelect";
import LibDrawer from "../customs/libs/LibDrawer";
import ListNum from "../customs/ListNum";
import ListObject from "../customs/ListOject";
import Checkbox from "../customs/Checkbox";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

export default function Form({ product }) {

  const dispatch = useDispatch()
  const { id } = useParams()
  const BASE_URL = import.meta.env.VITE_API_URL;

  const {
    
    // colors
    colors,
    activeColor,
    setActiveColor,

    // speedboxs
    speeds,
    activeSpeedBox,
    setActiveSpeedBox,

    // fuels
    fuels,
    activeFuelType,
    setActiveFuelType,

    // equipments
    equipments,
    selectedEquipments,
    setEquipments,

    // YURUSH
    distance,
    setDistance,

    // ACIQLAMA
    description,
    setDescription,

    // SEKIL
    images,
    handleDrop,
    removeImage,

    // WEHER
    cities,
    selectedCity,
    setSelectedCity,
    selectedCityLabel,

    // QIYMET
    price,
    setPrice,

    // SET FUNC
    dataa,

  } = product


  const [open, setOpen] = useState(false)

  const testFunc = (id) => {
    setSelectedCity(id)
    setOpen(false)
  }

  const isDesktop = useMediaQuery('(min-width: 1024px)', { noSsr: true })

  return(
    <div className="card my-6 lg:p-20 bg-white">
      <div className="flex items-center justify-between p-6">
        <span>close</span>
        <span className="text-lg font-bold">Mehsul guncelle</span>
        <span>close</span>
      </div>

      <div className="lg:p-10 lg:border rounded-3xl">
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-col gap-1">
              <Label>Reng</Label>
              <ButtonGroup data={colors} id={activeColor} onClick={setActiveColor} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Muherrik</Label>
              <ButtonGroup data={fuels} id={activeFuelType} onClick={setActiveFuelType} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Suretler qutusu</Label>
              <ButtonGroup data={speeds} id={activeSpeedBox} onClick={setActiveSpeedBox} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Techizat</Label>
              <Checkbox data={equipments} ids={selectedEquipments} onClick={setEquipments} />
            </div>

            <div>
              <DefaultInput value={distance} onChange={setDistance} label={'Yurush km.'} />
            </div>

            <div>
              <textarea 
                className="border focus:outline-sky-500 w-full rounded-xl px-3 py-2" 
                placeholder="Aciqlama yazin"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <Label>Sekil elave et</Label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">

                {images.map((img) => (
                  <div key={img.id}>
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200">

                      <img
                        src={img.isNew ? img.url : `${BASE_URL}/uploads/${img.url}`}
                        alt=""
                        className="w-full h-48 object-cover"
                      />

                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute cursor-pointer top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border-0 bg-white shadow-sm hover:bg-gray-100"
                      >
                        <CloseIcon sx={{ fontSize: 16 }} />
                      </button>

                    </div>
                  </div>
                ))}

                <div>
                  <LibDropzone onDrop={handleDrop} />
                </div>

              </div>

            </div>

            <div>
              <DefaultInput value={price} onChange={setPrice} label={'Qiymet'} />
            </div>

            <div>
              {
                isDesktop
                ? <SearchAndSelect 
                    data={cities} 
                    id={selectedCity} 
                    onClick={setSelectedCity} 
                    onChange={() => setSelectedCity('')} 
                    label={'Seher'}
                    variant={'floating'}
                  />
                :
                <div>
                  <Label>Seher</Label>
                  <div onClick={() => setOpen(true)} className="w-full p-3 border rounded-xl mt-2">
                    {
                      selectedCityLabel 
                      ? selectedCityLabel.label
                      : 'Seher sec'
                    }
                  </div>
                </div>
              }
            </div>

            <div>
              <button onClick={dataa} className="w-full p-4 rounded-xl bg-blue-500 text-white cursor-pointer">Gonder</button>
            </div>

          </div>
          
          
        {/* } */}

      </div>

      <LibDrawer 
        open={open} 
        arr={cities} 
        onClose={() => setOpen(false)} 
        onClick={(id) => testFunc(id)} 
      />
    </div>
  )
}