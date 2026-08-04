import {Input, Label, useMediaQuery} from "@heroui/react";
import { useProduct } from "./hooks/useProduct";
import { Fragment, useState } from "react";
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

    // NOMRE
    phoneValue,
    phoneInputChange,

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

  const isDesktop = useMediaQuery('(min-width: 1024px)', { noSsr: true })

  return(
    <div className="lg:rounded-3xl lg:p-15 lg:bg-white flex flex-col lg:gap-8 gap-2 bg-[#f5f5f5]">
      <div className="flex items-center justify-center p-4 bg-white mt-3 lg:mt-0">
        <h1 className="lg:text-3xl text-2xl font-bold">Yeni elan</h1>
      </div>

      <div className="lg:p-10 border rounded-3xl bg-white p-5">
        <div className="flex flex-col gap-1">
          <DefaultInput 
            value={stateMakeLabel} 
            onChange={((value) => inputChange(setStateMakeLabel, value, setStateMakeValue, 'make', makes, setFilteredMake))} 
            label={'Marka *'} 
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
              label={'Model *'} 
            />
          </div>
        }
        {
          loc.length > 1 && loc.includes('model') &&
          <div className="flex flex-col gap-1 mt-4">
            <DefaultInput 
              value={stateYearLabel} 
              onChange={((value) => inputChange(setStateYearLabel, value, setStateYearValue, 'year', yearOriginal, setFilteredYear))} 
              label={'il *'} 
            />
          </div>
        }
        {
          loc.length > 2 && loc.includes('year') &&
          <div className="flex flex-col gap-1 mt-4">
            <DefaultInput 
              value={stateVolumeLabel} 
              onChange={((value) => inputChange(setStateVolumeLabel, value, setStateVolumeValue, 'volume', volumeOriginal, setFilteredVolume))} 
              label={'Həcm sm³ *'} 
              type="number"
            />
          </div>
        }
        
        {
          // INPUT DATA LISTLER 
        }
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-2 lg:mt-6 max-h-[100vh] overflow-auto">
          {
            !stateMakeValue &&
            <ListObject 
              filteredData={filteredMake} 
              change={listChange} 
              setStateLabel={setStateMakeLabel} 
              setStateValue={setStateMakeValue} 
              type='make'
            />
          }

          {
            loc.includes('make') && !stateModelValue &&
            <ListObject 
              filteredData={filteredModel} 
              change={listChange} 
              setStateLabel={setStateModelLabel} 
              setStateValue={setStateModelValue} 
              type='model' 
            />
          }

          {
            // Years array
            loc.includes('model') && !stateYearValue &&
            <ListNum 
              filteredData={filteredYear} 
              change={listChange} 
              setStateLabel={setStateYearLabel} 
              setStateValue={setStateYearValue} 
              type='year' 
            />
          }

          {
            // Volumes array
            loc.includes('year') && !stateVolumeValue &&
            <ListNum 
              filteredData={filteredVolume} 
              change={listChange} 
              setStateLabel={setStateVolumeLabel} 
              setStateValue={setStateVolumeValue} 
              type='volume' 
            />
          }

        </div>

        
        {
          loc.length > 3 && loc.includes('volume') &&
          <div className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <Label>Kateqoriya *</Label>
              <ButtonGroup data={categories} id={stateCategoryValue} onClick={setStateCategoryValue} />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Vəziyyət *</Label>
              <ButtonGroup data={statuses} id={activeStatus} onClick={setActiveStatus} />
            </div>

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

          </div>
        }

      </div>


      {
        loc.length > 3 && loc.includes('volume') &&
        <Fragment>
          <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-4 bg-white p-5">
            <h3 className="text-xl">Güc və Yürüş</h3>
            <div>
              <DefaultInput value={engine} onChange={setEngine} label={'Güc a.g. *'} len={'6'} type="number" />
            </div>

            <div>
              <DefaultInput value={distance} onChange={setDistance} label={'Yürüş km *'} len={'10'} type="number" />
            </div>
          </div>

          <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-8 bg-white p-5">
            <div>
              <h3 className="text-xl mb-3">Məlumat *</h3>
              <textarea
                className="border focus:outline-sky-500 w-full rounded-xl px-3 py-2 h-32 bg-[#f5f5f5] resize-none"
                placeholder="Motosiklet haqqında vacib məlumatları qeyd edin."
                value={description}
                maxLength='1000'
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <span className="text-muted">
                {description.length} / 1 000
              </span>
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
                        src={img.url}
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


          <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-8 bg-white p-5">
            <div>
              <h3 className="text-xl mb-3">Təchizat *</h3>
              <Checkbox data={equipments} ids={selectedEquipments} onClick={setEquipments} />
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
                    <div onClick={() => setOpen(true)} className="w-full p-3.5 border rounded-xl mt-1.5 bg-[#fafbff]">
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
              <DefaultInput value={price} onChange={setPrice} label={'Qiymət *'} type="number" />
            </div>
          </div>

          <div className="lg:p-10 lg:border rounded-3xl flex flex-col gap-5 bg-white p-5">
            <h3 className="text-xl">Əlaqə nömrəsi *</h3>
            <div>
              <input
                onChange={(e) => phoneInputChange(e.target.value)}
                id='number'
                type="text"
                inputMode="numeric"
                value={phoneValue}
                className='border-2 w-full rounded-2xl p-3 bg-[#f5f5f5]' placeholder='77 513 14 06'
              />
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
        </Fragment>
      }

      

      <LibDrawer 
        open={open} 
        arr={cities} 
        onClose={() => setOpen(false)} 
        onClick={(id) => testFunc(id)} 
      />
    </div>
  )
}