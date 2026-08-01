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
    updateProductData,
    loading

  } = product


  const [open, setOpen] = useState(false)

  const testFunc = (id) => {
    setSelectedCity(id)
    setOpen(false)
  }

  const isDesktop = useMediaQuery('(min-width: 1024px)', { noSsr: true })

  if(colors.length == 0){
    return (
      <div className='fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'><span>Loading...</span></div>
    )
  }

  return(
    <div className="lg:rounded-3xl lg:p-15 lg:bg-white flex flex-col lg:gap-8 gap-2 bg-[#f5f5f5]">
      <div className="flex items-center justify-center lg:p-6 p-3">
        <h1 className="text-2xl font-bold">Elanı güncəllə</h1>
      </div>

      <div className="lg:p-10 border rounded-3xl bg-white p-5">
        <div className="flex flex-col gap-4">
            
          <div className="flex flex-col gap-1">
            <Label>Rəng *</Label>
            <ButtonGroup data={colors} id={activeColor} onClick={setActiveColor} />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Mühərrik *</Label>
            <ButtonGroup data={fuels} id={activeFuelType} onClick={setActiveFuelType} />
          </div>

          <div className="flex flex-col gap-1">
            <Label>Sürətlər qutusu *</Label>
            <ButtonGroup data={speeds} id={activeSpeedBox} onClick={setActiveSpeedBox} />
          </div>

          {/* <div className="flex flex-col gap-1">
            <Label>Təchizat *</Label>
            <Checkbox data={equipments} ids={selectedEquipments} onClick={setEquipments} />
          </div> */}

          {/* <div>
            <DefaultInput value={distance} onChange={setDistance} label={'Yürüş km. *'} />
          </div> */}

          {/* <div>
            <Label>Şəkil əlavə et</Label>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">

              {images.map((img) => (
                <div key={img.id}>
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200">

                    <img
                      src={img.isNew ? img.url : `${BASE_URL}/uploads/${img.url}`}
                      alt=""
                      className="w-full h-25 object-cover"
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

          </div> */}

          {/* <div>
            <DefaultInput value={price} onChange={setPrice} label={'Qiymət'} />
          </div>

          <div>
            {
              isDesktop
              ? <SearchAndSelect 
                  data={cities} 
                  id={selectedCity} 
                  onClick={setSelectedCity} 
                  onChange={() => setSelectedCity('')} 
                  label={'Şəhər'}
                  variant={'floating'}
                />
              :
              <div>
                <Label>Şəhər</Label>
                <div onClick={() => setOpen(true)} className="w-full p-3 border rounded-xl mt-2">
                  {
                    selectedCityLabel 
                    ? selectedCityLabel.label
                    : 'Şəhər sec'
                  }
                </div>
              </div>
                            }
          </div>

          <div>
            <button 
              onClick={updateProductData} 
              disabled={loading}
              className="w-full p-4 rounded-xl bg-blue-500 text-white cursor-pointer"
            >
              {loading ? "Göndərilir..." : "Göndər"}
            </button>
          </div> */}

        </div>

      </div>

      <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-8 bg-white p-5">
        <div>
          <h3 className="text-xl mb-3">Məlumat *</h3>
          <textarea
            className="border focus:outline-sky-500 w-full rounded-xl px-3 py-2 h-32 bg-[#f5f5f5] resize-none"
            placeholder="Motosiklet haqqında vacib məlumatları qeyd edin."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-3 bg-white p-5">
        <h3 className="text-xl">Yürüş</h3>
        <div>
          <DefaultInput value={distance} onChange={setDistance} label={'Yürüş km *'} />
        </div>
      </div>

      <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-8 bg-white p-5">
        <div>
          <h3 className="text-xl mb-3">Təchizat *</h3>
          <Checkbox data={equipments} ids={selectedEquipments} onClick={setEquipments} />
        </div>
      </div>


      <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-8 bg-white p-5">
        <div>
          <h3 className="text-xl mb-3">Şəkillər *</h3>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {images.map((img) => (
              <div key={img.id}>
                <div className="relative overflow-hidden rounded-2xl border border-gray-200">

                  <img
                    src={img.isNew ? img.url : `${BASE_URL}/uploads/${img.url}`}
                    alt=""
                    className="w-full h-25 object-cover"
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
          <p className="text-md mt-4">Minimum 1, maksimum 10 şəkil</p>
        </div>
      </div>

      <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-5 bg-white p-5">
        <h3 className="text-xl">Şəhər və Qiymət</h3>
        <div>
          {
            isDesktop
              ? <SearchAndSelect
                data={cities}
                id={selectedCity}
                onClick={setSelectedCity}
                onChange={() => setSelectedCity('')}
                label={'Şəhər *'}
                variant={'floating'}
              />
              :
              <div>
                <Label>Şəhər</Label>
                <div onClick={() => setOpen(true)} className="w-full p-3 border rounded-xl mt-1.5">
                  {
                    selectedCityLabel
                      ? selectedCityLabel.label
                      : <span className="text-muted">Şəhər seç</span>
                  }
                </div>
              </div>
          }
        </div>

        <div>
          <DefaultInput value={price} onChange={setPrice} label={'Qiymət *'} />
        </div>

        <div>
          <button
            onClick={updateProductData}
            disabled={loading}
            className="w-full p-4 rounded-xl bg-blue-500 text-white cursor-pointer"
          >
            {loading ? "Göndərilir..." : "Göndər"}
          </button>
        </div>
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