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
import { useLocation } from 'react-router-dom'
import { toast } from '@heroui/react'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

export default function FilterModal({open, onClose, useFilter}){

  const dispatch = useDispatch()
  const location = useLocation()

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


  const handleModelOpen = () => {
    if (!make) return toast.warning('Əvvəlcə marka seçin')
    setOpenModel(true)
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
      style={{zIndex: '10000000'}}
    >
      <AppBar style={{ padding: 0 }} sx={{ position: 'fixed', background: 'rgba(0, 0, 0, 0.35)', backdropFilter: 'blur(2px)', color: 'white' }}>
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

      <div className='flex flex-col gap-2 mt-[60px] px-[0px] pb-20 bg-[#f5f5f5]'>
    
        <div className="border rounded-2xl p-3 pt-2 bg-white mt-3">
          <span>Əsas</span>
          <div className="w-full flex flex-row mt-2 gap-3 min-w-0">
            <div 
              onClick={() => setOpenMake(true)} 
              className='flex flex-nowrap border rounded-xl p-3 cursor-pointer hover:bg-gray-200 bg-[#fafbff]  overflow-x-auto scrollbar-none flex-1 min-w-0'
            >
              {make
                ? <span className='text-nowrap'>{makes.find(x => x._id == make)?.label}</span> 
                : <span>Marka</span>
              }
            </div>
            <div 
              onClick={handleModelOpen} 
              className='flex flex-nowrap border rounded-xl p-3 cursor-pointer hover:bg-gray-200 bg-[#fafbff]  overflow-x-auto scrollbar-none flex-1 min-w-0'
            >
              {model
                ? <span className='text-nowrap'>{filteredModel.find(x => x._id == model)?.label}</span>
                : <span>Model</span>
              }
            </div>
          </div>
        </div>
        

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Vəziyyəti</span>
          <div className='flex gap-2 mt-2'>

            <ButtonGroup 
              data={statuses}
              id={status}
              onClick={setStatus}
              isNew={location.pathname === '/new'}
            />

          </div>
        </div>
        
        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Yürüyüş</span>
          <div className='flex gap-3 mt-2'>

            <SoloLabelinput
              value={minDistance}
              change={setMinDistance}
              label={'Min.'}
              pl={'48'}
            />

            <SoloLabelinput
              value={maxDistance}
              change={setMaxDistance}
              label={'Max.'}
              pl={'52'}
            />
          
          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>il</span>
          <div className='flex gap-3 mt-2'>
            <div onClick={() => changeDrawer('minYear', minYear, 'Qiyət min.')} className="border rounded-xl w-full p-3 bg-[#fafbff]">
              {
                minYear ? 'Min. ' + minYear : 'Min'
              }
            </div>
            <div onClick={() => changeDrawer('maxYear', maxYear, 'Qiymət max.')} className="border rounded-xl w-full p-3 bg-[#fafbff]">
              {
                maxYear ? 'Max. ' + maxYear : 'Max'
              }
            </div>
          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Mühərrikin həcmi (sm)</span>
          <div className='flex gap-3 mt-2'>
            <div onClick={() => changeDrawer('minVolume', minVolume, 'Həcm min.')} className="border rounded-xl w-full p-3 bg-[#fafbff]">
              {
                minVolume || minVolume == 0 ? 'Min. ' + minVolume : 'Min'
              }
            </div>
            <div onClick={() => changeDrawer('maxVolume', maxVolume, 'Həcm max.')} className="border rounded-xl w-full p-3 bg-[#fafbff]">
              {
                maxVolume ? 'Max. ' + maxVolume : 'Max'
              }
            </div>
          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Şəhər</span>
          <div className='flex gap-3 mt-2'>
            <div onClick={() => changeDrawer('selectedCity', city, 'Şəhər')} className="border rounded-xl w-full p-3 bg-[#fafbff]">
              {
                city ? cities.find(x => x._id == city)?.label : 'Şəhər seç'
              }
            </div>
          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Mühərrikin gücü a.g.</span>
          <div className='flex gap-3 mt-2'>

            <SoloLabelinput
              value={minEngine}
              change={setMinEngine}
              label={'Min.'}
              pl={'48'}
            />

            <SoloLabelinput
              value={maxEngine}
              change={setMaxEngine}
              label={'Max.'}
              pl={'52'}
            />
           
          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Rəng</span>
          <div className='flex gap-2 mt-2'>
            <ButtonGroup 
              data={colors}
              id={color}
              onClick={setColor}
              isNew={location.pathname === '/new'}
            />
          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Qiymət</span>
          <div className='flex gap-3 mt-2'>

            <SoloLabelinput
              value={minPrice}
              change={setMinPrice}
              label={'Min.'}
              pl={'48'}
            />

            <SoloLabelinput
              value={maxPrice}
              change={setMaxPrice}
              label={'Max.'}
              pl={'52'}
            />
            
          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Yanacaq növü</span>
          <div className='flex gap-2 mt-2'>

            <ButtonGroup 
              data={fuels}
              id={fuel}
              onClick={setFuel}
              isNew={location.pathname === '/new'}
            />

          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Sürətlər qutusu</span>
          <div className='flex flex-wrap gap-2 mt-2'>

            <ButtonGroup 
              data={speeds}
              id={speed}
              onClick={setSpeed}
              isNew={location.pathname === '/new'}
            />

          </div>
        </div>

        <div className="border rounded-2xl p-3 pt-2 bg-white">
          <span>Təchizat</span>
          <div className='flex flex-wrap gap-2 mt-2'>
            
            <Checkbox data={equipments} ids={stateEquipment} onClick={setEquipments} />

          </div>
        </div>

      </div>


      <div className="fixed bottom-0 w-full p-3">
        <button 
          onClick={applyFilter}
          className="cursor-pointer bg-green-500 text-white py-3 rounded-xl w-full"
        >
          Axtar
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