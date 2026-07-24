import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useLocation, useNavigate } from 'react-router-dom'
import MobileFilterModal from "./FilterModal";
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigationType } from "react-router-dom";
import ButtonGroup from '../../../customs/ButtonGroup'
import LibDrawer from '../../../customs/libs/LibDrawer';
import { toast } from "@heroui/react";

export default function FilterMobile({useFilter}){

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigationType = useNavigationType();

  const {

    makes,
    make,
    setMake,

    filteredModel,
    model,
    setModel,

    categories,
    category,
    setCategory,

    applyFilter,

  } = useFilter

  const openMake = location.hash == '#make'
  const openModel = location.hash == '#model'

  const handleClose = () => {
    navigate(-1)
  }

  const handleModelOpen = () => {
    if(!make) return toast.warning('Evvelce marka secin')
    navigate(`${location.search}#model`)
  }

  useEffect(() => {
    if((make || model) && navigationType !== 'POP' && location.hash !== '#filter'){
      applyFilter()
    }
  }, [make, model])

  const openFilter = location.hash == '#filter'

  return(
    <div className='flex lg:hidden flex-col'>
      <div className='flex items-center justify-between w-full gap-3 mb-2'>
        <div className="w-full h-full flex align-center py-2 gap-3">
          <div onClick={() => navigate(`${location.search}#make`)} className='border rounded-lg p-2 w-full'>
            { make
                ?
                makes.find(x => x._id == make)?.label
                : 'Marka' 
            }
          </div>
          <div onClick={handleModelOpen} className='border rounded-lg p-2 w-full'>
            { model
                ?
                filteredModel.find(x => x._id == model)?.label
                : 'Model' 
            }
          </div>
        </div>
        
        <button onClick={() => navigate(`${location.search}#filter`)} className="bg-blue-500 rounded-lg text-white px-3 shrink-0 py-2">
          <FilterAltIcon />
          Filter
        </button>
        
      </div>
      <div className="flex flex-nowrap overflow-auto gap-2 mb-2">
        
        <ButtonGroup
          data={categories}
          id={category}
          onClick={setCategory}
          flex={'nowrap'}
        />
      </div>

      <LibDrawer open={openMake} onClose={handleClose} arr={makes} onClick={setMake} active={make} label={'Marka'} />
      <LibDrawer open={openModel} onClose={handleClose} arr={filteredModel} onClick={setModel} active={model} label={'Model'} />

      <MobileFilterModal open={openFilter} onClose={() => navigate(-1)} useFilter={useFilter} />

    </div>
  )
}