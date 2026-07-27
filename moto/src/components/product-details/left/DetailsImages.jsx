import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductImageDialog from "./ProductImageDialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function DetailsImages({ images }) {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  const [activeImage, setActiveImage] = useState(0)

  const [activePagination, setActivePagination] = useState(false)
  
  const [imageDialogOpen, setImageDialogOpen] = useState(false)

  const goPrev = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <div className='w-[100%]'>
      <div 
        className="flex relative"
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
              <div className="relative w-full h-[340px] lg:h-[500px] overflow-hidden rounded-md">
                {/* Arxa fon - bulanıq */}
                <img
                  src={`${BASE_URL}/uploads/${img}`}
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-70"
                  aria-hidden="true"
                />

                {/* Ön plan - əsl şəkil, tam görünən */}
                <img
                  onClick={() => setImageDialogOpen(true)}
                  src={`${BASE_URL}/uploads/${img}`}
                  alt={`Elan şəkli ${index + 1}`}
                  className="relative w-full h-full object-contain cursor-pointer"
                />
              </div>
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

      <div className="flex gap-2 mt-2 overflow-x-auto px-1">
        {
          images.map((img, index) => (
            <img key={index} src={`${BASE_URL}/uploads/${img}`} alt="" 
              className={`w-[70px] h-[60px] object-cover cursor-pointer rounded
              ${activeImage === index ? "opacity-100 ring-2 ring-black" : "opacity-60"}`}
              onMouseEnter={() => swiperRef.current?.slideTo(index)}
          />
          ))
        }
      </div>


      <ProductImageDialog
        images={images}
        initialIndex={activeImage}
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
      />
    </div>

  );
}