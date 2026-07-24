import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import SearchAndSelect from '../../../customs/SearchAndSelect';
import ButtonGroup from '../../../customs/ButtonGroup';
import SoloLabelinput from '../../../customs/SoloLabelinput';
import Checkbox from '../../../customs/Checkbox';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FilterDialog({ open, onClose, useFilter }) {
  
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

  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        open={open}
        fullWidth
        maxWidth='md'
        slots={{
          transition: Transition,
        }}
        keepMounted
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Genish Axdarish
        </DialogTitle>
        <IconButton
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{maxHeight: '400px', bgcolor: '#f5f5f5'}}>
          <div className='flex flex-col gap-5'>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Marka, Model</span>
              <div className='flex w-full gap-5'>

                <SearchAndSelect
                  data={makes}
                  id={make || ''}
                  onClick={setMake}
                  onChange={setMake}
                  label={'Marka'}
                  variant={'floating'}
                />

                <SearchAndSelect 
                  data={filteredModel}
                  id={model || ''}
                  onClick={setModel}
                  onChange={() => setModel('')}
                  label={'Marka'}
                  variant={'floating'}
                />

              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Qiymet</span>
              <div className='flex w-full gap-3'>
                <div className='flex w-[400px] gap-5 relative'>
                  
                  <SoloLabelinput 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(e.target.value)} 
                    label={'Min.'} pl={'40'} 
                  />

                  <SoloLabelinput 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(e.target.value)} 
                    label={'Max.'} 
                    pl={'44'} 
                  />

                </div>
              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Veziyyeti</span>
              <div className='flex w-full gap-3'>
                <div className="flex gap-2 h-full w-full">
                  
                  <ButtonGroup 
                    data={statuses} 
                    id={status} 
                    onClick={setStatus}
                  />

                </div>
              </div>
            </div>
            

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>il</span>
              <div className='flex w-full gap-3'>
                <div className='flex w-full gap-5'>

                  <SearchAndSelect 
                    data={years}
                    id={minYear || ''}
                    onClick={setMinYear}
                    label={'Min.'}
                    variant={'leftLabel'}
                    pl={'40'}
                  />

                  <SearchAndSelect 
                    data={years}
                    id={maxYear || ''}
                    onClick={setMaxYear}
                    label={'Max.'}
                    variant={'leftLabel'}
                    pl={'44'}
                  />

                </div>
              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Yanacaq novu</span>
              <div className='flex w-full gap-3'>
                <div className="flex gap-2 h-full w-full">

                  <ButtonGroup 
                    data={fuels} 
                    id={fuel} 
                    onClick={setFuel}
                  />
                
                </div>
              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Surush</span>
              <div className='flex w-full gap-3'>
                <div className='flex w-[400px] gap-5 relative'>

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
                    pl={'44'}
                  />

                </div>
              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Reng</span>
              <div className='flex w-full gap-3'>

                <ButtonGroup 
                  data={colors}
                  id={color}
                  onClick={setColor}
                />

              </div>
            </div>
            

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Muherrikin hecmi</span>
              <div className='flex w-full gap-3'>
                
                <div className='flex w-full gap-5'>

                  <SearchAndSelect 
                    data={volumes}
                    id={minVolume || ''}
                    onClick={setMinVolume}
                    label={'Min.'}
                    variant={'leftLabel'}
                    pl={'40'}
                  />

                  <SearchAndSelect 
                    data={volumes}
                    id={maxVolume || ''}
                    onClick={setMaxVolume}
                    label={'Max.'}
                    variant={'leftLabel'}
                    pl={'44'}
                  />

                </div>
              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Suretler qutusu</span>
              <div className='flex w-full gap-3'>

                <ButtonGroup 
                  data={speeds}
                  id={speed}
                  onClick={setSpeed}
                />

              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>City</span>
              <div className='flex w-full gap-3'>

                <SearchAndSelect 
                  data={cities}
                  id={city || ''}
                  onClick={setCity}
                  label={'Seher'}
                  variant={'default'}
                />

              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Suretler qutusu</span>
              <div className='flex w-full gap-3'>
                
                <Checkbox 
                  data={equipments}
                  ids={stateEquipment}
                  onClick={setEquipments}
                />

              </div>
            </div>

            <div className='flex gap-3 items-center justify-between'>
              <span className='w-[180px] shrink-0'>Muherrikin gucu</span>
              <div className='flex w-full gap-3'>

                <div className='flex w-[400px] gap-5'>

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
                    pl={'44'}
                  />

                </div>

              </div>
            </div>
            

          </div>
        </DialogContent>
        <DialogActions style={{padding: '15px'}}>
          <button type="button" className="cursor-pointer p-2 px-4 bg-red-500 rounded-xl text-white">Sifirla</button>
          <button onClick={applyFilter} type="button" className="cursor-pointer p-2 px-4 bg-blue-500 rounded-xl text-white">800 Elani gosder</button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
