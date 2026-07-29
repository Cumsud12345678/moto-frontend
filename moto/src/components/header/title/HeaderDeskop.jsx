import BtnStyles from '../../../css/Button.module.css'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../redux/slices/silinecek/menuModalSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export default function({ openModal, open, isMobile }){

  const dispatch = useDispatch()
  const isStackHoveredRef = useRef(false)

  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    {
      label: 'Ana səhifə',
      path: '/',
      icon: HomeIcon,
      classes: ''
    },
    {
      label: 'Seçilmişlər',
      path: '/bookmarks',
      icon: FavoriteBorderIcon,
      classes: ''
    },
    {
      label: 'Əlavə et',
      path: '/new',
      icon: AddCircleIcon,
      classes: 'bg-green-500 text-white'
    },
    {
      label: 'Profil',
      path: '/profile',
      icon: AccountCircleIcon,
      classes: 'border'
    },
  ]


  return(
    <div className='hidden lg:flex justify-between w-full items-center'>
      {
        open && !isMobile
          ?
          <IconButton onClick={() => openModal(false)} sx={{color: 'red'}}>
            <CloseIcon></CloseIcon>
          </IconButton>
          :
          <IconButton onClick={() => openModal(true)} sx={{color: '#FF5530'}}>
            <MenuIcon></MenuIcon>
          </IconButton>
      }
  
      <div onClick={() => navigate('/')} className='w-[120px] cursor-pointer'>
        <a href="/">
          <img src="/logo.png" className='w-full' alt="logo" />
        </a>
      </div>

      {
        navItems.map((item, index) => {
          const active = location.pathname == item.path
          const Icon = item.icon
          return(
            <a 
              key={index}
              href={item.path}
              className={`${item.classes} ${BtnStyles.btn}`} 
              style={{
                margin: '0px 15px',
                ...(active && { background: 'orange' })
              }}
            >
              <Icon 
                sx={
                  active 
                  &&
                  {color: 'white'}
                } 
              />
              <span 
                className={ 
                  item.path == '/new' || item.path == '/profile' 
                  ? 
                  active 
                  && 
                  BtnStyles.activeBtn 
                  : 
                  active 
                  ? 
                  BtnStyles.activeBtn 
                  : 
                  BtnStyles.btnText }
                > 
                  {item.label} 
                </span>
            </a>
          )
        })
      }

    </div>
  )
}