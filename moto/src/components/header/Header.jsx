import Slide from '@mui/material/Slide'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack'
import HeaderMobile from './title/HeaderMobile'
import HeaderDeskop from './title/HeaderDeskop'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import MenuModal from './MenuModal'
import FilterDeskop from './filter/deskop/FilterDeskop'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Header({dur, filter}){

  const isMobile = useMediaQuery('(max-width: 1024px)')
  const location = useLocation()

  const [openModal, setOpenModal] = useState(false)

  console.log(openModal)

  let isScroll = useScrollTrigger()
 
  return(
    <div className='border pb-5'>
      <Slide direction="down" in={dur ? dur : !isScroll}>
        <AppBar 
          elevation={0} 
          sx={{ bgcolor: 'white', color: 'black', zIndex: {xs: 1100, lg: 1300}, borderBottom: '1px solid gray'}}
        >
          <div className='container mx-auto max-w-[1000px]'>
            <Toolbar 
              style={{padding: 0}} 
              sx={{ minHeight: '56px !important' }}
            >
              <Stack
                direction='row'
                sx={{ width: '100%', position: 'relative' }}
              >

                {isMobile && <HeaderMobile openModal={setOpenModal} open={openModal} isMobile={isMobile} filter={filter}/>}
                {!isMobile && <HeaderDeskop openModal={setOpenModal} open={openModal} isMobile={isMobile} filter={filter}/>}


              </Stack>
            </Toolbar>
          </div>
        </AppBar>
      </Slide>

      {(!isMobile && (location.pathname == '/' || location.pathname.startsWith('/autos'))) && <FilterDeskop useFilter={filter} />}

      <MenuModal open={openModal} setOpen={setOpenModal} isMobile={isMobile}/>

    </div>
  )
}