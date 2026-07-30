import { useSelector, useDispatch } from 'react-redux'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Drawer, Button } from "@heroui/react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/user/userSlice';

export default function MenuModal({open, setOpen, isMobile}){

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuth } = useSelector(s => s.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/register')
  }

  return(
    <Drawer isOpen={open} onOpenChange={setOpen}>
      <Drawer.Backdrop style={{zIndex: '100000'}}>
        <Drawer.Content placement={isMobile ? 'left' : 'left'}>
          <Drawer.Dialog className='p-0'>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading className='px-3 pt-3'>
                <div className='w-[120px]'>
                  <img src="/logo.png" className='w-full' alt="logo" />
                </div>
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <div className='container mx-auto max-w-[1000px] p-2'>
                <div className='flex flex-col'>
                  <span onClick={() => navigate('/')} className="p-3 active:bg-gray-300 hover:bg-gray-300 cursor-pointer">
                    Bütün elanlar
                  </span>
                  <div className='flex justify-between p-3 active:bg-gray-300 hover:bg-gray-300 cursor-pointer'>
                    <span>
                      Dillər
                    </span>
                    <span className='text-gray-400'>Azerbaycan</span>
                  </div>
                  {/* <span className="p-3 active:bg-gray-300 hover:bg-gray-300 cursor-pointer">
                    Razılşma
                  </span> */}
                  {
                    isAuth
                    ?
                    (
                      <div onClick={handleLogout} className="p-3 active:bg-gray-300 cursor-pointer hover:bg-gray-300">
                        <span className='text-red'>Çıxış</span>
                      </div>
                    ) : (
                      <div className='flex items-center justify-between p-3 gap-2'>
                        <button onClick={() => navigate('/register')} className='active:scale-105 transition-all flex items-center w-full border-3 p-2 rounded-xl justify-center gap-1 cursor-pointer'>
                          <PersonIcon />
                          <span style={{ fontSize: '16px' }} className='font-bold flex-shrink-0'>Daxil ol</span>
                        </button>
                        <button className='active:scale-105 transition-all flex items-center w-full border p-2 rounded-xl justify-center gap-1 bg-blue-500 text-white cursor-pointer'>
                          <PersonAddIcon />
                          <span style={{ fontSize: '16px' }} className='font-bold'>Üzv ol</span>
                        </button>
                      </div>
                    )
                  }
                  
                  
                </div>
              </div>
            </Drawer.Body>
            <Drawer.Footer className='block'>
              <div className="flex flex-col gap-2 p-3 bg-gray-200">
                <span>Bizimle elaqe</span>
                <div className='flex items-center gap-1'>
                  <LocalPhoneIcon />
                  <span className='font-bold text-lg'>
                    {import.meta.env.VITE_PHONE}
                  </span>
                </div>
                <span>{import.meta.env.VITE_EMAIL}</span>
              </div>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}