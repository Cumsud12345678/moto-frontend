import {Modal} from "@heroui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {TrashBin} from '@gravity-ui/icons';
import {TriangleExclamation} from '@gravity-ui/icons';
import {Ban} from '@gravity-ui/icons';
import {EyeSlash} from '@gravity-ui/icons';
import {ArrowsRotateLeft} from '@gravity-ui/icons';
import {Rocket} from '@gravity-ui/icons';
import LibAlert from "../../components/customs/libs/LibAlert";
import { useUser } from "../hooks/useUser";
import { toast } from "@heroui/react";
import { useProduct } from "../hooks/useProduct";

export function ProductModal({openModal, setOpenModal, images, product}) {

  const {
    alertType,
    title,
    label,
    open,
    setOpen,
    updatedWarn,
    handleDeleteAlert,
    handleWarnAlert,
    handleLockAlert,
    handleUnlockAlert,
    handleResetWarningAlert,

    handleNext,

    updatedLock,
    removeLock
  } = useUser()

  const {
    productAlertType,
    productTitle,
    productLabel,
    productOpen,
    setProductOpen,
    updatedActive,
    setUpdatedActive,

    // Handle Alerts
    handleProductDeleteAlert,
    handleActiveAlert,
    
    handleProductNext,

  } = useProduct()

  const BASE_URL = import.meta.env.VITE_API_URL;
  const swiperRef = useRef(null);
  const [activeImage, setActiveImage] = useState(0)
  const [activePagination, setActivePagination] = useState(false)

  const [page, setPage] = useState('details')
  
  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  useEffect(() => {
    removeLock(product.user.isLock)
  }, [product.user.isLock])

  useEffect(() => {
    if (product.user.warning + updatedWarn >= 3) {
      removeLock(true)
    }
  }, [updatedWarn])


  useEffect(() => {
    if(product.is_active){
      setUpdatedActive('Beli')
    }else {
      setUpdatedActive('Xeyir')
    }
  }, [product.is_active])

  return (
    <Modal isOpen={openModal} onOpenChange={setOpenModal}>
      <Modal.Backdrop>
        <Modal.Container size="cover">
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Detaylar</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-row w-full h-full">
                <div className="h-full w-[250px] flex flex-col py-4 pr-4 gap-3 overflow-auto">
                  <div 
                    onClick={() => setPage('details')} 
                    className={`w-full p-2 border rounded-xl cursor-pointer
                    ${page == 'details' ? 'bg-blue-500 text-white' : ''}`}
                  >
                    Details
                  </div>
                  <div 
                    onClick={() => setPage('user')} 
                    className={`w-full p-2 border rounded-xl cursor-pointer
                    ${page == 'user' ? 'bg-blue-500 text-white' : ''}`}
                  >
                    User
                  </div>
                </div>

                {
                  page == 'details' && (
                    <div className="w-full border-2 flex justify-between bg-[#f5f5f5] relative">
                      <div>
                        <div className="flex flex-col p-5 gap-1 text-lg text-black">
                          <span>
                            Elan ID si:
                            <span className="text-red-500 font-bold"> {product._id}</span>
                          </span>
                          <span>
                            Oluşturulma tarixi:
                            <span className="text-red-500 font-bold"> {product.createdAt}</span>
                          </span>
                          <span>
                            Aktifdi?:
                            <span className="text-red-500 font-bold"> {updatedActive}</span>
                          </span>
                          <span>
                            Nomre:
                            <span className="text-red-500 font-bold"> {product.phone}</span>
                          </span>
                          <span>
                            Marka, Model:
                            <span className="text-red-500 font-bold"> {product.make?.label}, {product.model?.label}</span>
                          </span>
                          <span>
                            Qiymət:
                            <span className="text-red-500 font-bold"> {product.price}</span>
                          </span>
                          <span>
                            Kateqoriyası:
                            <span className="text-red-500 font-bold"> {product.category.label}</span>
                          </span>
                          <span>
                            Sürətlər qutusu, Mühərrik, il:
                            <span className="text-red-500 font-bold"> {product.speed.labe}, {product.fuel.label}, {product.year}</span>
                          </span>
                          <span>
                            Şəhər, Rəng:
                            <span className="text-red-500 font-bold"> {product.city.label}, {product.color.label}</span>
                          </span>
                          <span>
                            Təchizat:
                            <span className="text-red-500 font-bold">
                              {
                                product.equipments.map(eq => (
                                  ' ' + eq.label + ', '
                                ))
                              }
                            </span>
                          </span>
                          <span>
                            Güc, Həcm, Yürüş:
                            <span className="text-red-500 font-bold"> {product.engine}, {product.volume}, {product.mileage}</span>
                          </span>
                          <p className="mt-4">
                            Açıqlama <br />
                            <span className="font-bold">{product.description}</span>
                          </p>

                          <div style={{ fontSize: '17px' }} className="absolute bottom-0 left-1/2 -translate-x-1/2 p-3 flex gap-3 w-full">
                            <button 
                              onClick={handleProductDeleteAlert}
                              className="flex items-center bg-red-500 p-1 rounded-full px-3 gap-1 cursor-pointer"
                            >
                              <TrashBin className="text-white size-5" />
                              <span className="text-white">Sil</span>
                            </button>
                            <button 
                              onClick={() => {
                                updatedActive == 'Bəli'
                                  ? toast.danger('Elan onsuzda aktivdi')
                                  : handleActiveAlert()
                              }}
                              className="flex items-center bg-green-500 p-1 rounded-full px-3 gap-1 cursor-pointer">
                              <EyeSlash className="text-white size-5" />
                              <span className="text-white">Aktiv et</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          className="flex relative w-[500px]"
                          onMouseEnter={() => setActivePagination(true)}
                          onMouseLeave={() => setActivePagination(false)}
                        >
                          <Swiper
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            onSlideChange={(swiper) => {
                              setActiveImage(swiper.activeIndex)
                            }}
                            slidesPerView={1}
                            spaceBetween={10}
                            initialSlide={activeImage}
                          >
                            {images.map((img, index) => (
                              <SwiperSlide key={index}>
                                <img
                                  src={`${BASE_URL}/uploads/${img}`}
                                  className="w-full h-[320px] lg:h-[400px] object-fit cursor-pointer rounded-md"
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm px-3 py-1 rounded-full z-[100]">
                            {activeImage + 1} / {images.length}
                          </div>
                          {
                            activePagination &&
                            <div>
                              <button
                                className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/60
                                text-white p-2 rounded-full transition z-[100] cursor-pointer'
                                onClick={goPrev}
                              >
                                <ArrowBackIcon />
                              </button>
                              <button
                                className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white
                                p-2 rounded-full transition transition z-[100] cursor-pointer'
                                onClick={goNext}
                              >
                                <ArrowForwardIcon />
                              </button>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  )
                }

                {
                  page == 'user' && (
                    <div className="w-full border-2 flex justify-between bg-[#f5f5f5] relative">
                      <div>
                        <div className="flex flex-col p-5 gap-1 text-lg text-black">
                          <span>
                            User ID si:
                            <span className="text-red-500 font-bold"> {product.user._id}</span>
                          </span>
                          <span>
                            Olusturulma tarixi:
                            <span className="text-red-500 font-bold"> {product.user.createdAt}</span>
                          </span>
                          <span>
                            Isdifadeci adi:
                            <span className="text-red-500 font-bold"> {product.user.name}</span>
                          </span>
                          <span>
                            Emaili
                            <span className="text-red-500 font-bold"> {product.user.email}</span>
                          </span>
                          <span>
                            Rolu:
                            <span className="text-red-500 font-bold"> {product.user.role}</span>
                          </span>
                          <span>
                            Uyari sayi:
                            <span className="text-red-500 font-bold"> {product.user.warning + updatedWarn}</span>
                          </span>
                          <span>
                            Hesab kilitlidi?
                            <span className="text-red-500 font-bold"> {updatedLock}</span>
                          </span>

                          <div style={{ fontSize: '17px' }} className="absolute bottom-0 left-1/2 -translate-x-1/2 p-3 flex gap-3 w-full">
                            
                            <button 
                              onClick={handleDeleteAlert}
                              className="flex items-center bg-red-500 p-1 rounded-full px-3 gap-1 cursor-pointer"
                            >
                              <TrashBin className="text-white size-5" />
                              <span className="text-white">Sil</span>
                            </button>

                            <button 
                              onClick={() => {
                                product.user.warning + updatedWarn >= 3
                                  ? toast.warning('isdifadeci engellendi limite catdiniz.')
                                  : handleWarnAlert()
                              }}
                              className="flex items-center bg-yellow-500 p-1 rounded-full px-3 gap-1 cursor-pointer"
                            >
                              <TriangleExclamation className="text-white size-5" />
                              <span className="text-white">Uyar</span>
                            </button>

                            <button 
                              onClick={() => {
                                updatedLock == 'Beli'
                                  ? toast.warning('isdifadeci engellenib')
                                  : handleLockAlert()
                              }}
                              className="flex items-center bg-red-500 p-1 rounded-full px-3 gap-1 cursor-pointer"
                            >
                              <Ban className="text-white size-5" />
                              <span className="text-white">Blokla</span>
                            </button>

                            <button 
                              onClick={() => {
                                updatedLock == 'Beli'
                                  ? handleUnlockAlert()
                                  : toast.warning('isdifadeci bloklanmayib')
                              }}
                              className="flex items-center bg-green-500 p-1 rounded-full px-3 gap-1 cursor-pointer"
                            >
                              <ArrowsRotateLeft className="text-white size-5" />
                              <span className="text-white break-keep">Blokdan cixar</span>
                            </button>

                            <button 
                              onClick={() => {
                                product.user.warning + updatedWarn == 0
                                  ? toast.warning('isdifadecinin warningi yoxdur!')
                                  : handleResetWarningAlert()
                              }}
                              className="flex items-center bg-green-500 p-1 rounded-full px-3 gap-1 cursor-pointer"
                            >
                              <Rocket className="text-white size-5" />
                              <span className="text-white break-keep">Uyarini sifirla</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          className="flex w-[500px]"
                        >
                          <img
                            src={product.user.profile ? `${BASE_URL}/uploads/${product.user.profile}` : '../../../../public/profile.jpg'}
                            className="w-full h-[320px] lg:h-[400px] object-fit cursor-pointer rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  )
                }

              </div>
              
              <LibAlert 
                openAlert={open} 
                setOpenAlert={setOpen} 
                title={title} 
                label={label} 
                onClick={(text) => handleNext(text, product.user._id, product.user.warning)} 
                type={alertType} 
              />

              <LibAlert 
                openAlert={productOpen} 
                setOpenAlert={setProductOpen} 
                title={productTitle} 
                label={productLabel} 
                onClick={(text) => handleProductNext(text, product._id)} 
                type={productAlertType} 
              />

            </Modal.Body>
            <Modal.Footer>
              {/* <Button className="w-full" slot="close">
                Continue
              </Button> */}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}