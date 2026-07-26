import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { updateProduct } from "../../../redux/slices/product/productSlice"
import { toast } from "@heroui/react"

export const useProduct = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  const {
    fuels,
    speeds,
    cities,
    colors,
    equipments
  } = useSelector(s => s.metadata)

  const {selectedProduct} = useSelector(s => s.product)

  if(selectedProduct){

    const [activeColor, setActiveColor] = useState('')
    const [activeFuelType, setActiveFuelType] = useState('')
    const [activeSpeedBox, setActiveSpeedBox] = useState('')
    const [selectedEquipments, setSelectedEquipments] = useState('')

    const setEquipments = (value) => {
      setSelectedEquipments(prev => {
        if(prev.includes(value)){
          return prev.filter(p => p !== value)
        }

        return [...prev, value]
      })
    }  

    // ------------------------

    // STEP3

    const [distance, setDistance] = useState('')
    const [description, setDescription] = useState('')

    // STEP4


    const [images, setImages] = useState([]);
    const generateId = () =>
      (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`

    const handleDrop = (files) => {
      const newImages = files.map((file) => ({
        id: generateId(),
        url: URL.createObjectURL(file),
        file: file,
        isNew: true
      }))

      setImages((prev) => [...prev, ...newImages]);
    }

    const removeImage = (id) => {
      setImages((prev) => {
        const target = prev.find(img => img.id === id)
        // əgər yenidirsə, memory leak olmasın deyə obyekt URL-i təmizlə
        if (target?.isNew && target.url) {
          URL.revokeObjectURL(target.url)
        }
        return prev.filter((img) => img.id !== id)
      })
    }


    const [selectedCity, setSelectedCity] = useState('')

    const selectedCityLabel = cities.find(c => c._id == selectedCity)

    const [price, setPrice] = useState('')

    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
      if (selectedProduct) {
        setActiveColor(selectedProduct.color?._id)
        setActiveFuelType(selectedProduct.fuel?._id)
        setActiveSpeedBox(selectedProduct.speed?._id)
        setSelectedEquipments(selectedProduct.equipments?.map(eq => eq._id) || [])
        setDistance(selectedProduct.mileage || '')
        setDescription(selectedProduct.description || '')
        setSelectedCity(selectedProduct.city?._id)
        setPrice(selectedProduct.price || '')

        if (selectedProduct?.images) {
          const existingImages = selectedProduct.images.map((img) => ({
            id: img,
            url: img,
            file: null,
            isNew: false
          }))
          setImages(existingImages)
        }
      }
    }, [selectedProduct])

    const updateProductData = () => {
      const remainingOldUrls = images.filter(img => !img.isNew).map(img => img.url);
      const newImageFiles = images.filter(img => img.isNew).map(img => img.file);

      // Qiymet
      if (!price || Number(price) <= 0) return toast.danger('Qiyməti düzgün daxil edin');

      // Yurush
      if (!distance && distance !== 0) return toast.danger('Yürüşü daxil edin')

      // Aciqlama
      if (!description || description.trim().length === 0) return toast.danger('Açıqlama yazın')

      // Sekiller — cəmi 0-dırsa xəta
      if (remainingOldUrls.length === 0 && newImageFiles.length === 0) {
        return toast.danger('Ən azı 1 şəkil əlavə edin')
      }

      // Reng/yanacaq/suretler qutusu
      if (!activeColor) return toast.danger('Rəng seçin')
      if (!activeFuelType) return toast.danger('Yanacaq növünü seçin')
      if (!activeSpeedBox) return toast.danger('Sürətlər qutusunu seçin')

      // Weher
      if (!selectedCity) return toast.danger('Şəhər seçin')

      setLoading(true)

      const form = {
        price: price,
        mileage: distance,
        description: description,
        remainingOldImages: remainingOldUrls,
        newImages: newImageFiles,
        fuel: activeFuelType,
        speed: activeSpeedBox,
        city: selectedCity,
        color: activeColor,
        equipments: selectedEquipments,
        id: id
      }

      toast.promise(dispatch(updateProduct(form)).unwrap(),
        {
          loading: "Məhsul yenilənir...",
          success: () => {
            setTimeout(() => {
              navigate('/profile')
            }, 1000)
            return "Məhsul yeniləndi!"
          },
          error: (err) => err.message || "Xəta baş verdi.",
        }
      ).finally(() => setLoading(false))
    }



    return ({

      colors,
      activeColor,
      setActiveColor,

      speeds,
      activeSpeedBox,
      setActiveSpeedBox,

      fuels,
      activeFuelType,
      setActiveFuelType,

      equipments,
      selectedEquipments,
      setSelectedEquipments,
      setEquipments,

      distance,
      setDistance,

      description,
      setDescription,

      images,
      handleDrop,
      removeImage,

      cities,
      selectedCity,
      setSelectedCity,
      selectedCityLabel,

      price,
      setPrice,

      updateProductData,
      loading

    })

  }

}