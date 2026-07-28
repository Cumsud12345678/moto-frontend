import * as React from 'react'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import LibDrawer from '../../../customs/libs/LibDrawer'
import ButtonGroup from '../../../customs/ButtonGroup'
import SoloLabelinput from '../../../customs/SoloLabelinput'
import Checkbox from '../../../customs/Checkbox'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

export default function FilterModal({open, onClose, useFilter}){

  const dispatch = useDispatch()

  const { 
    
    makes,
    make,
    setMake,

    filteredModel,
    model,
    setModel,

    statuses,
    status,
    setStatus,

    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,

    years,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,

    fuels,
    fuel,
    setFuel,

    minDistance,
    setMinDistance,
    maxDistance,
    setMaxDistance,

    volumes,
    minVolume,
    setMinVolume,
    maxVolume,
    setMaxVolume,

    cities,
    city,
    setCity,

    minEngine,
    setMinEngine,
    maxEngine,
    setMaxEngine,

    colors,
    color,
    setColor,

    speeds,
    speed,
    setSpeed,

    equipments,
    stateEquipment,
    setEquipments,

    applyFilter

  } = useFilter

  const [openMake, setOpenMake] = useState(false)
  const [openModel, setOpenModel] = useState(false)

  const checkedMake = (id) => {
    setMake(id)
    setOpenMake(false)
  }

  const checkedModel = (id) => {
    setModel(id)
    setOpenModel(false)
  }

  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerType, setDrawerType] = useState('')
  const [drawerArr, setDrawerArr] = useState([])
  const [drawerActive, setDrawerActive] = useState()
  const [drawerLabel, setDrawerLabel] = useState()
  
  const changeDrawer = (type, active, label) => {
    if(type == 'minYear' || type == 'maxYear'){
      setDrawerArr(years)
    }else if(type == 'minVolume' || type == 'maxVolume'){
      setDrawerArr(volumes)
    }else if(type == 'selectedCity'){
      setDrawerArr(cities)
    }

    setDrawerLabel(label)
    setDrawerActive(active)
    setOpenDrawer(true)
    setDrawerType(type)
  }

  const selectedDrawer = (value) => {
    if(drawerType == 'minYear') {
      setMinYear(value)
    }else if(drawerType == 'maxYear') {
      setMaxYear(value)
    }else if(drawerType == 'minVolume') {
      setMinVolume(value)
    }else if(drawerType == 'maxVolume') {
      setMaxVolume(value)
    }else if (drawerType == 'selectedCity') {
      setCity(value)
    }
    setOpenDrawer(false)
  }


  return(
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      scroll='true'
      slots={{
        transition: Transition,
      }}
    >
      <AppBar style={{ padding: 0 }} sx={{ position: 'fixed' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Filter
          </Typography>
        </Toolbar>
      </AppBar>

      <div className='flex flex-col pb-5 mt-[80px] px-[15px] pb-20'>
    
        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Əsas</span>
          <div className="flex flex-row mt-2 gap-3">
            <div onClick={() => setOpenMake(true)} className='border rounded-lg p-2 w-full cursor-pointer hover:bg-gray-200'>
              {make
                ?
                makes.find(x => x._id == make)?.label
                : 'Marka'
              }
            </div>
            <div onClick={() => setOpenModel(true)} className='border rounded-lg p-2 w-full cursor-pointer hover:bg-gray-200'>
              {model
                ?
                filteredModel.find(x => x._id == model)?.label
                : 'Model'
              }
            </div>
          </div>
        </div>
        

        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Vəziyyəti</span>
          <div className='flex gap-2 mt-2'>

            <ButtonGroup 
              data={statuses}
              id={status}
              onClick={setStatus}
            />

          </div>
        </div>
        
        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Yürüyüş</span>
          <div className='flex gap-3 mt-2'>

            <SoloLabelinput
              value={minDistance}
              change={(e) => setMinDistance(e.target.value)}
              label={'Min.'}
              pl={'40'}
            />

            <SoloLabelinput
              value={maxDistance}
              change={(e) => setMaxDistance(e.target.value)}
              label={'Max.'}
              pl={'45'}
            />
          
          </div>
        </div>

        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>il</span>
          <div className='flex gap-3 mt-2'>
            <div onClick={() => changeDrawer('minYear', minYear, 'Qiyet min.')} className="border-2 rounded-xl w-full p-2 py-2.5">
              {
                minYear ? 'Min. ' + minYear : 'Min'
              }
            </div>
            <div onClick={() => changeDrawer('maxYear', maxYear, 'Qiymet max.')} className="border-2 rounded-xl w-full p-2 py-2.5">
              {
                maxYear ? 'Max. ' + maxYear : 'Max'
              }
            </div>
          </div>
        </div>

        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Mühərrikin həcmi (sm)</span>
          <div className='flex gap-3 mt-2'>
            <div onClick={() => changeDrawer('minVolume', minVolume, 'Hecm min.')} className="border-2 rounded-xl w-full p-2 py-2.5">
              {
                minVolume || minVolume == 0 ? 'Min. ' + minVolume : 'Min'
              }
            </div>
            <div onClick={() => changeDrawer('maxVolume', maxVolume, 'Hecm max.')} className="border-2 rounded-xl w-full p-2 py-2.5">
              {
                maxVolume ? 'Max. ' + maxVolume : 'Max'
              }
            </div>
          </div>
        </div>

        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Şəhər</span>
          <div className='flex gap-3 mt-2'>
            <div onClick={() => changeDrawer('selectedCity', city, 'Weher')} className="border-2 rounded-xl w-full p-2 py-2.5">
              {
                city ? cities.find(x => x._id == city)?.label : 'Şəhər seç'
              }
            </div>
          </div>
        </div>

        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Mühərrikin gücü a.g.</span>
          <div className='flex gap-3 mt-2'>

            <SoloLabelinput
              value={minEngine}
              change={(e) => setMinEngine(e.target.value)}
              label={'Min.'}
              pl={'40'}
            />

            <SoloLabelinput
              value={maxEngine}
              change={(e) => setMaxEngine(e.target.value)}
              label={'Max.'}
              pl={'45'}
            />
           
          </div>
        </div>

        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Rəng</span>
          <div className='flex gap-2 mt-2'>
            <ButtonGroup 
              data={colors}
              id={color}
              onClick={setColor}
            />
          </div>
        </div>

        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Qiymət</span>
          <div className='flex gap-3 mt-2'>

            <SoloLabelinput
              value={minPrice}
              change={(e) => setMinPrice(e.target.value)}
              label={'Min.'}
              pl={'40'}
            />

            <SoloLabelinput
              value={maxPrice}
              change={(e) => setMaxPrice(e.target.value)}
              label={'Max.'}
              pl={'45'}
            />
            
          </div>
        </div>

        <div className="border rounded-lg my-3 mb-1 p-3 pt-2">
          <span>Yanacaq növü</span>
          <div className='flex gap-2 mt-2'>

            <ButtonGroup 
              data={fuels}
              id={fuel}
              onClick={setFuel}
            />

          </div>
        </div>

        <div className="border rounded-lg my-3 p-3 pt-2">
          <span>Sürətlər qutusu</span>
          <div className='flex flex-wrap gap-2 mt-2'>

            <ButtonGroup 
              data={speeds}
              id={speed}
              onClick={setSpeed}
            />

          </div>
        </div>

        <div className="border rounded-lg my-3 p-3 pt-2">
          <span>Təchizat</span>
          <div className='flex flex-wrap gap-2 mt-2'>
            
            <Checkbox data={equipments} ids={stateEquipment} onClick={setEquipments} />

          </div>
        </div>

      </div>


      <div className="fixed bottom-0 w-full p-3">
        <button 
          onClick={applyFilter}
          className="cursor-pointer bg-green-500 text-white py-3 rounded-lg w-full"
        >
          Axdar
        </button>
      </div>

      <LibDrawer 
        open={openMake} 
        arr={makes} 
        onClose={() => setOpenMake(false)} 
        onClick={checkedMake}
        active={make}
        label={'Marka'}
      />

      <LibDrawer 
        open={openModel} 
        arr={filteredModel} 
        onClose={() => setOpenModel(false)} 
        onClick={checkedModel}
        active={model}
        label={'Model'}
      />

      <LibDrawer open={openDrawer} arr={drawerArr} onClose={() => setOpenDrawer(false)} onClick={selectedDrawer} active={drawerActive} label={drawerLabel}  />


    </Dialog>
  )
}