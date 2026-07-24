import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState, useRef } from "react";
import { useSelector } from 'react-redux';
const BASE_URL = import.meta.env.VITE_API_URL;

const TailwindDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ProductImageDialog({open, onClose, images, initialIndex = 0}){

  const { selectedProduct } = useSelector(s => s.product)

  const swiperRef = useRef(null);
  const [activeImage, setActiveImage] = useState(initialIndex)
  const [activePagination, setActivePagination] = useState(true)

  React.useEffect(() => {
    if(open) {
      setActiveImage(initialIndex)
      swiperRef.current?.slideTo(initialIndex, 0)
    }
  }, [open, initialIndex])

  const theme = useTheme();
  // const fullScreen = useMediaQuery('(max-width: 1024px)')

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return(
    <React.Fragment>
      <TailwindDialog
        onClose={onClose}
        open={open}
        fullScreen={true}
        fullWidth={true}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "black",
              color: "white",
            },
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {selectedProduct.make.label}, {selectedProduct.model.label}, {selectedProduct.mileage}km
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
        <DialogContent style={{padding: '0px'}} dividers>

          <div className='flex flex-col justify-center h-full items-center'>
            <div 
              className="flex bg-black w-full max-w-[600px] h-[100%] aspect-2/1"
              // onMouseEnter={() => setActivePagination(true)}
              // onMouseLeave={() => setActivePagination(false)}
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
                      onClick={() => setImageDialogOpen(true)}
                      src={`${BASE_URL}/uploads/${img}`}
                      className="w-full h-full object-contain cursor-pointer rounded-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute top-3/4 left-1/2 -transform-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-full z-[10000]">
                {activeImage + 1} / {images.length}
              </div>

              {
                activePagination &&
                <div>
                  <button
                    className='absolute left-2 top-1/2 -translate-y-1/2 bg-white/60
                    text-black p-2 rounded-full transition z-[1000] cursor-pointer'
                    onClick={goPrev}
                  >
                    <ArrowBackIcon />
                  </button>
                  <button
                    className='absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 text-black
                    p-2 rounded-full transition transition z-[1000] cursor-pointer'
                    onClick={goNext}
                  >
                    <ArrowForwardIcon />
                  </button>
                </div>
              }

            </div>
            <div className='p-3'>
              <div className='flex lg:flex-wrap overflow-x-auto'>
                {
                  images.map((image, index) => (
                    <img
                      onMouseEnter={() => swiperRef.current?.slideTo(index)}
                      style={{
                        width: '70px',
                        height: '50px',
                        margin: '3px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      src={`${BASE_URL}/uploads/${image}`}
                      key={index}
                    />
                  ))
                }
              </div>
            </div>
          </div>

        </DialogContent>
      </TailwindDialog>
    </React.Fragment>
  )
}