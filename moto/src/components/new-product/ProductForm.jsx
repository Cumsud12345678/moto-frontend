import {Input, Label, useMediaQuery} from "@heroui/react";
import { useProduct } from "./hooks/useProduct";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DefaultInput from "../customs/DefaultInput"
import ButtonGroup from "../customs/ButtonGroup"
import SearchAndSelect from "../customs/SearchAndSelect"
import ListNum from "../customs/ListNum"
import ListObject from "../customs/ListOject"
import Checkbox from "../customs/Checkbox"
import LibDropzone from "../customs/libs/LibDropzone"
import LibDrawer from "../customs/libs/LibDrawer"
import { toast } from "@heroui/react";
import {Spinner} from "@heroui/react";

export default function ProductForm({ productData }) {

  const {
    // Make
    stateMakeLabel,
    setStateMakeLabel,
    setStateMakeValue,
    makes,
    setFilteredMake,
    stateMakeValue,
    filteredMake,

    // Model
    stateModelLabel,
    setStateModelLabel,
    setStateModelValue,
    allModels,
    setFilteredModel,
    stateModelValue,
    filteredModel,
    
    // Years
    stateYearLabel,
    setStateYearLabel,
    setStateYearValue,
    yearOriginal,  
    setFilteredYear,
    stateYearValue,
    filteredYear,

    // Volumes
    stateVolumeLabel,
    setStateVolumeLabel,
    setStateVolumeValue,
    volumeOriginal,  
    setFilteredVolume,
    stateVolumeValue,
    filteredVolume,

    // categories
    setStateCategoryValue,
    stateCategoryValue,
    stateCategoryLabel,
    categories,

    // satatuses
    statuses,
    activeStatus,
    setActiveStatus,

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

    // GUC
    engine,
    setEngine,

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
    addProduct,

    loc,
    inputChange,
    listChange,

    loading
    
  } = productData


  const [open, setOpen] = useState(false)

  const testFunc = (id) => {
    setSelectedCity(id)
    setOpen(false)
  }

  console.log(filteredMake)

  const isDesktop = useMediaQuery('(min-width: 1024px)', { noSsr: true })

  return(
    <div className="p-5 lg:rounded-3xl lg:p-20 bg-white">
      <div className="flex items-center justify-center p-6">
        {/* <span>close</span> */}
        <span className="text-lg font-bold">Yeni məhsul</span>
        {/* <span>close</span> */}
      </div>

      <div className="lg:p-10 lg:border rounded-3xl">
        <div className="flex flex-col gap-1">
          <DefaultInput 
            value={stateMakeLabel} 
            onChange={((value) => inputChange(setStateMakeLabel, value, setStateMakeValue, 'make', makes, setFilteredMake))} 
            label={'Make'} 
          />
        </div>

        {
          makes.length == 0 &&
          <div className="flex items-center justify-center w-full mt-6">
            <Spinner />
          </div>
        }

        {
          loc.length > 0 && loc.includes('make') &&
          <div className="flex flex-col gap-1 mt-4">
            <DefaultInput 
              value={stateModelLabel} 
              onChange={((value) => inputChange(setStateModelLabel, value, setStateModelValue, 'model', allModels, setFilteredModel))} 
              label={'Model'} 
            />
          </div>
        }
        {
          loc.length > 1 && loc.includes('model') &&
          <div className="flex flex-col gap-1 mt-4">
            <DefaultInput 
              value={stateYearLabel} 
              onChange={((value) => inputChange(setStateYearLabel, value, setStateYearValue, 'year', yearOriginal, setFilteredYear))} 
              label={'il'} 
            />
          </div>
        }
        {
          loc.length > 2 && loc.includes('year') &&
          <div className="flex flex-col gap-1 mt-4">
            <DefaultInput 
              value={stateVolumeLabel} 
              onChange={((value) => inputChange(setStateVolumeLabel, value, setStateVolumeValue, 'volume', volumeOriginal, setFilteredVolume))} 
              label={'Həcm'} 
            />
          </div>
        }
        
        {
          // INPUT DATA LISTLER 
        }
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-2 lg:mt-6 max-h-[100vh] overflow-auto">
          {
            !stateMakeValue &&
            <ListObject filteredData={filteredMake} change={listChange} setStateLabel={setStateMakeLabel} setStateValue={setStateMakeValue} type='make' />
          }

          {
            loc.includes('make') && !stateModelValue &&
            <ListObject filteredData={filteredModel} change={listChange} setStateLabel={setStateModelLabel} setStateValue={setStateModelValue} type='model' />
          }

          {
            // Years array
            loc.includes('model') && !stateYearValue &&
            <ListNum filteredData={filteredYear} change={listChange} setStateLabel={setStateYearLabel} setStateValue={setStateYearValue} type='year' />
          }

          {
            // Volumes array
            loc.includes('year') && !stateVolumeValue &&
            <ListNum filteredData={filteredVolume} change={listChange} setStateLabel={setStateVolumeLabel} setStateValue={setStateVolumeValue} type='volume' />
          }

        </div>

        
        {
          loc.length > 3 && loc.includes('volume') &&
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <Label>Kateqoriya</Label>
              <ButtonGroup data={categories} id={stateCategoryValue} onClick={setStateCategoryValue} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Vəziyyət</Label>
              <ButtonGroup data={statuses} id={activeStatus} onClick={setActiveStatus} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Rəng</Label>
              <ButtonGroup data={colors} id={activeColor} onClick={setActiveColor} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Mühərrik</Label>
              <ButtonGroup data={fuels} id={activeFuelType} onClick={setActiveFuelType} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Sürətlər qutusu</Label>
              <ButtonGroup data={speeds} id={activeSpeedBox} onClick={setActiveSpeedBox} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Təchizat</Label>
              <Checkbox data={equipments} ids={selectedEquipments} onClick={setEquipments} />
            </div>

            <div>
              <DefaultInput value={engine} onChange={setEngine} label={'Guc a.g.'} />
            </div>

            <div>
              <DefaultInput value={distance} onChange={setDistance} label={'Yürüş km.'} />
            </div>

            <div>
              <textarea 
                className="border focus:outline-sky-500 w-full rounded-xl px-3 py-2" 
                placeholder="Açıqlama yazın"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div>
              <Label>Şəkil əlavə et</Label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">

                {images.map((img) => (
                  <div key={img.id}>
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200">

                      <img
                        src={img.url}
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
                      : 'Şəhər seç'
                    }
                  </div>
                </div>
              }
            </div>

            <div>
              <button 
                onClick={addProduct}
                disabled={loading}
                className="w-full p-4 rounded-xl bg-blue-500 text-white cursor-pointer"
              >
                {loading ? "Göndərilir..." : "Göndər"}
              </button>
            </div>

          </div>
        }

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