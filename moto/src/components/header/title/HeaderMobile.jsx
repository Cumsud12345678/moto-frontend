import * as React from 'react';
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../redux/slices/silinecek/menuModalSlice';
import { useLocation } from 'react-router-dom';
import FilterMobile from '../filter/mobile/FilterMobile';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

const TransitionRight = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
})

export default function HeaderMobile({openModal, open, isMobile, filter}){

  const dispatch = useDispatch()

  const location = useLocation()

  return(
    <div className='flex lg:hidden flex-col w-full px-3'>
      <div className='flex align-center justify-between w-full mt-2 gap-4'>
        {
          open && !isMobile
            ?
            <IconButton onClick={() => openModal(false)} color='inherit'>
              <CloseIcon></CloseIcon>
            </IconButton>
            :
            <IconButton onClick={() => openModal(true)} color='inherit'>
              <MenuIcon></MenuIcon>
            </IconButton>
        }
        <div className='w-[120px]'>
          <img src="/logo.png" className='w-full' alt="logo" />
        </div>
        <span></span>
      </div>

      {(isMobile && (location.pathname == '/' || location.pathname.startsWith('/autos'))) && <FilterMobile useFilter={filter} />}
        
    </div>
  )
}