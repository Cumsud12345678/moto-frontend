import { useSelector, useDispatch } from 'react-redux'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Drawer, Button } from "@heroui/react";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/user/userSlice';
import {Flag} from '@gravity-ui/icons';
import {ChevronRight} from '@gravity-ui/icons';
import {CircleQuestion} from '@gravity-ui/icons';
import {Handset} from '@gravity-ui/icons';
import {Envelope} from '@gravity-ui/icons';
import {ArrowRightFromSquare} from '@gravity-ui/icons';

export default function MenuModal({open, setOpen, isMobile}){

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuth } = useSelector(s => s.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth')
  }

  return(
    <Drawer isOpen={open} onOpenChange={setOpen}>
      <Drawer.Backdrop style={{zIndex: '100000'}}>
        <Drawer.Content placement={isMobile ? 'left' : 'top'} className='max-w-[1000px] mx-auto'>
          <Drawer.Dialog className='p-1 lg:p-5'>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading className='px-3 pt-3'>
                <div className='container mx-auto max-w-[1000px]'>
                  <div className='w-[150px]'>
                    <img src="/logo.png" className='w-full' alt="logo" />
                  </div>
                </div>
              </Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <div className='container mx-auto max-w-[1000px] p-2'>
                <div className='grid grid-col lg:grid-cols-3 gap-3 text-black'>

                  <div onClick={() => navigate('/privacy')} className='bg-[#f5f5f5] p-2 rounded-2xl  cursor-pointer border border-[#f5f5f5] hover:border-blue-500'>
                    <div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          <div className='bg-white rounded-full p-2'>
                            <Flag className='text-muted' />
                          </div>
                          <span className='ml-2'>Məxfilik siyasəti</span>
                        </div>
                        <ChevronRight className='float-right text-gray-400' />
                      </div>
                    </div>
                  </div>

                  <div onClick={() => navigate('/about')} className='bg-[#f5f5f5] p-2 rounded-2xl cursor-pointer border border-[#f5f5f5] hover:border-blue-500'>
                    <div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          <div className='bg-white rounded-full p-2'>
                            <CircleQuestion className='text-muted' />
                          </div>
                          <span className='ml-2'>Haqqımızda</span>
                        </div>
                        <ChevronRight className='float-right text-gray-400' />
                      </div>
                    </div>
                  </div>

                  <div className='bg-[#f5f5f5] p-2 rounded-2xl cursor-pointer border border-[#f5f5f5] hover:border-blue-500'>
                    <div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          <div className='bg-white rounded-full p-2'>
                            <Handset className='text-muted' />
                          </div>
                          <div className='flex flex-col ml-2'>
                            <span className='text-xs'>Telefon</span>
                            <span className='font-semibold'>{import.meta.env.VITE_PHONE}</span>
                          </div>
                        </div>
                        <ChevronRight className='float-right text-gray-400' />
                      </div>
                    </div>
                  </div>

                  <div className='bg-[#f5f5f5] p-2 rounded-2xl cursor-pointer border border-[#f5f5f5] hover:border-blue-500'>
                    <div>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                          <div className='bg-white rounded-full p-2'>
                            <Envelope className='text-muted' />
                          </div>
                          <div className='flex flex-col ml-2'>
                            <span className='text-xs'>E-poçt ünvanı</span>
                            <span className='font-semibold'>{import.meta.env.VITE_EMAIL}</span>
                          </div>
                        </div>
                        <ChevronRight className='float-right text-gray-400' />
                      </div>
                    </div>
                  </div>

                  {
                    isAuth 
                      ?
                      <div onClick={handleLogout} className='bg-[#f5f5f5] p-2 rounded-2xl cursor-pointer border border-[#f5f5f5] hover:border-blue-500'>
                        <div>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                              <div className='bg-white rounded-full p-2'>
                                <ArrowRightFromSquare className='text-muted' />
                              </div>
                              <span className='ml-2'>Çıxış</span>
                            </div>
                            <ChevronRight className='float-right text-gray-400' />
                          </div>
                        </div>
                      </div>
                      :
                      <div className='flex items-center justify-between p-1 gap-2'>
                        <button onClick={() => navigate('/auth')} className='active:scale-105 transition-all flex items-center w-full border-3 p-2 rounded-xl justify-center gap-1 cursor-pointer'>
                          <PersonIcon />
                          <span style={{ fontSize: '16px' }} className='font-bold flex-shrink-0'>Daxil ol</span>
                        </button>
                        <button className='active:scale-105 transition-all flex items-center w-full border p-2 rounded-xl justify-center gap-1 bg-blue-500 text-white cursor-pointer'>
                          <PersonAddIcon />
                          <span style={{ fontSize: '16px' }} className='font-bold'>Üzv ol</span>
                        </button>
                      </div>
                  }
                  
                </div>
              </div>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}