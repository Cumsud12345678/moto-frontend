import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMetadata } from "../../../redux/slices/metadata/metadataSlice"
import { createProduct } from "../../../redux/slices/product/productSlice"
import { useNavigate } from 'react-router-dom';
import { toast } from "@heroui/react";
import imageCompression from 'browser-image-compression'

export const useProduct = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getMetadata())
  }, [])

  const {
    makes,
    models,
    fuels,
    speeds,
    cities,
    colors,
    categories,
    statuses,
    equipments
  } = useSelector(s => s.metadata)

  // STEP1 components

  // Orginal Datalar
  const [modelOriginal, setModelOriginal] = useState([])
  const [yearOriginal, setYearOriginal] = useState([])
  const [volumeOriginal, setVolumeOriginal] = useState([])

  // Filter olunan datalat
  const [filteredMake, setFilteredMake] = useState([])
  const [filteredModel, setFilteredModel] = useState([])
  const [filteredYear, setFilteredYear] = useState([])
  const [filteredVolume, setFilteredVolume] = useState([])

  // State Label ler
  const [stateMakeLabel, setStateMakeLabel] = useState('')
  const [stateModelLabel, setStateModelLabel] = useState('')
  const [stateYearLabel, setStateYearLabel] = useState('')
  const [stateVolumeLabel, setStateVolumeLabel] = useState('')

  // State Value ler
  const [stateMakeValue, setStateMakeValue] = useState('')
  const [stateModelValue, setStateModelValue] = useState('')
  const [stateYearValue, setStateYearValue] = useState('')
  const [stateVolumeValue, setStateVolumeValue] = useState('')

  // Select states
  const [stateCategoryValue, setStateCategoryValue] = useState('')
  const selectedCategory = categories.find(
    categori => categori._id == stateCategoryValue
  )
  const stateCategoryLabel = selectedCategory?.label || 'Birini sec'

  // Security
  const [loc, setLoc] = useState([])


  // Combo filter Make Model ----------------
  const filter = (label, data, setFunc) => {
    const newData = data.filter(item => {
      return item.label.toLowerCase().includes(label.toLowerCase())
    })
    setFunc(newData)
  }

  const inputChange = (setLabel, label, setValue, type, data, setFilter) => {
    setLabel(label)
    setValue('')
    setLoc(prev => prev.filter(item => item !== type))
    if(type == 'year' || type == 'volume'){
      filterNumber(label, data, setFilter)
    }else {
      filter(label, data, setFilter)
    }
  }

  const listChange = (setLabel, label, setValue, value, type) => {
    setLabel(label)
    setValue(value)
    setLoc(prev => [...prev, type])
    if(type == 'make'){
      modelSync(value)
    }else if(type == 'model'){
      generateYears()
    }else if(type == 'year'){
      generateVolumes()
    }

    window.scrollTo({
      top: document.body.scrollHeight / 4,
      behavior: "smooth"
    });
  }
  // -----------------------------


  // Model funksiyalari -----------
  const modelSync = (value) => {
    const modelData = models.filter(model => {
      return model.make == value
    })

    setModelOriginal(modelData)
    setFilteredModel(modelData)
  }
  // ---------------------------


  // Generate Number functionlari ------------
  const generateYears = () => {
    const list = (
      Array.from(
        { length: 2026 - 1950 + 1 },
        (_, index) => 2026 - index
      )
    )
    setYearOriginal(list)
    setFilteredYear(list)
  }

  const generateVolumes = () => {
    const list = (
      Array.from(
        { length: 3000/50 },
        (_, index) => (index + 1) * 50
      )
    )
    setVolumeOriginal(list)
    setFilteredVolume(list)
  }
  // -------------------------------


  // Combo filter Year Volume --------------
  const filterNumber = (label, data, setFunc) => {
    const newData = data.filter(item => {
      return item.toString().startsWith(label.toString())
    })
    setFunc(newData)
  }
  // ------------------------------------


  // Start Form --------------------
  useEffect(() => {
    filter('', makes, setFilteredMake)
  }, [makes])
  // ------------------------------

  // Reset Form --------------------
  useEffect(() => {
    if (!stateMakeValue) {
      setStateModelLabel('')
      setStateModelValue('')

      setStateYearLabel('')
      setStateYearValue('')

      setStateVolumeLabel('')
      setStateVolumeValue('')

      setLoc(prev => prev.filter(item => item !== 'make'))
    }
  }, [stateMakeValue])

  useEffect(() => {
    if (!stateModelValue) {
      setStateYearLabel('')
      setStateYearValue('')

      setStateVolumeLabel('')
      setStateVolumeValue('')

      setLoc(prev => prev.filter(item => item !== 'model'))
    }
  }, [stateModelValue])

  useEffect(() => {
    if (!stateYearValue) {
      setStateVolumeLabel('')
      setStateVolumeValue('')

      setLoc(prev => prev.filter(item => item !== 'year'))
    }
  }, [stateYearValue])
  // ----------------------


  // STEP2
  const [activeStatus, setActiveStatus] = useState('')
  const [activeColor, setActiveColor] = useState('')
  const [activeFuelType, setActiveFuelType] = useState('')
  const [activeSpeedBox, setActiveSpeedBox] = useState('')
  const [selectedEquipments, setSelectedEquipments] = useState([])

  const setEquipments = (value) => {
    setSelectedEquipments(prev => {
      if(prev.includes(value)){
        return prev.filter(p => p !== value)
      }

      return [...prev, value]
    })
  }
  

  // STEP3
  const [engine, setEngine] = useState('')
  const [distance, setDistance] = useState('')
  const [description, setDescription] = useState('')

  const generateId = () => 
    (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`

  // STEP4
  const [images, setImages] = useState([]);
  
  const handleDrop = async (files) => {

    if (images.length + files.length > 10) {
      toast.danger("Maksimum 10 şəkil əlavə edə bilərsiniz");
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1600,
      useWebWorker: true
    }

    const compressedImages = await Promise.all(
      files.map(async (file) => {
        const compressedBlob = await imageCompression(file, options)

        // ✅ orijinal adı və tipi qoruyaraq real File obyekti yarat
        const compressedFile = new File(
          [compressedBlob],
          file.name,              // orijinal ad (uzantı daxil) saxlanılır
          { type: compressedBlob.type || file.type }
        )

        return {
          id: crypto.randomUUID(),
          url: URL.createObjectURL(compressedFile),
          file: compressedFile
        }
      })
    )

    setImages((prev) => [...prev, ...compressedImages])
  }

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find(i => i.id === id)
      if (img) URL.revokeObjectURL(img.url)
      return prev.filter((img) => img.id !== id)
    })
  }

  const reorderImages = (fromIndex, toIndex) => {
    if (
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0
    ) return

    setImages((prev) => {
      if (fromIndex >= prev.length || toIndex >= prev.length) return prev
      const updated = [...prev]
      const [moved] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, moved)
      return updated
    })
  }

  const [selectedCity, setSelectedCity] = useState('')
  const selectedCityLabel = cities.find(c => c._id == selectedCity)
  const [price, setPrice] = useState('')

  const [phoneValue, setPhoneValue] = useState('')

  const phoneInputChange = (value) => {
    setPhoneValue(formatPhone(value));
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 9);

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
    if (numbers.length <= 7) return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5)}`;

    return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7)}`;
  };

  const addProduct = () => {

    const cleanPhone = phoneValue.replace(/\s/g, "")

    // Marka/Model/il/hecm
    if (!stateMakeValue) return toast.danger('Marka seçin')
    if (!stateModelValue) return toast.danger('Model seçin')
    if (!stateYearValue) return toast.danger('İl seçin')
    if (!stateVolumeValue) return toast.danger('Mühərrikin həcmini seçin')

    // Kateqoriya/veziyyet/reng/yanacaq/suretler qutusu
    if (!stateCategoryValue) return toast.danger('Kateqoriya seçin')
    if (!activeStatus) return toast.danger('Vəziyyəti seçin')
    if (!activeColor) return toast.danger('Rəng seçin')
    if (!activeFuelType) return toast.danger('Yanacaq növünü seçin')
    if (!activeSpeedBox) return toast.danger('Sürətlər qutusunu seçin')

    // Guc / yurush
    if (!engine || Number(engine) <= 0) return toast.danger('Mühərrikin gücünü düzgün daxil edin')
    if (!distance && distance !== 0) return toast.danger('Yürüşü daxil edin')

    // Aciqlama
    if (!description || description.trim().length === 0) return toast.danger('Açıqlama yazın')

    // Sekiller
    if (!images || images.length === 0) return toast.danger('Ən azı 1 şəkil əlavə edin')

    // Weher
    if (!selectedCity) return toast.danger('Şəhər seçin')

    // Qiymet
    if (!price || Number(price) <= 0) return toast.danger('Qiyməti düzgün daxil edin')

    // Nomre
    if (!phoneValue || cleanPhone.length !== 9) return toast.danger('Nömrəni düzgün daxil edin')

    setLoading(true)
    const form = {
      price: price,
      year: stateYearValue,
      mileage: distance,
      description: description,
      volume: stateVolumeValue,
      power: engine,
      images: images,
      make: stateMakeValue,
      model: stateModelValue,
      category: stateCategoryValue,
      fuel: activeFuelType,
      speed: activeSpeedBox,
      city: selectedCity,
      color: activeColor,
      status: activeStatus,
      equipments: selectedEquipments,
      phone: cleanPhone
    }

    toast.promise(dispatch(createProduct(form)).unwrap(),
      {
        loading: "Məhsul elave olunur...",
        success: () => {
          setTimeout(() => {
            setLoading(false)
            navigate('/profile')
          }, 1000)
          return "Məhsul əlavə olundu!"
        },
        error: (err) => {
          setLoading(false)
          return err.message || "Xəta baş verdi."
        },
      }
    )
  }

  return({
    // Make
    stateMakeLabel,
    setStateMakeLabel,
    setStateMakeValue,
    makes,
    setFilteredMake,
    stateMakeValue,
    filteredMake,

    // Model
    stateModelLabel,
    setStateModelLabel,
    setStateModelValue,
    allModels: modelOriginal,
    setFilteredModel,
    stateModelValue,
    filteredModel,
    
    // Years
    stateYearLabel,
    setStateYearLabel,
    setStateYearValue,
    yearOriginal,  
    setFilteredYear,
    stateYearValue,
    filteredYear,

    // Volumes
    stateVolumeLabel,
    setStateVolumeLabel,
    setStateVolumeValue,
    volumeOriginal,  
    setFilteredVolume,
    stateVolumeValue,
    filteredVolume,

    // categories
    setStateCategoryValue,
    stateCategoryValue,
    stateCategoryLabel,
    categories,

    loc,
    inputChange,
    listChange,

    statuses,
    activeStatus,
    setActiveStatus,

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

    engine,
    setEngine,

    distance,
    setDistance,

    description,
    setDescription,

    images,
    handleDrop,
    removeImage,
    reorderImages,

    cities,
    selectedCity,
    setSelectedCity,
    selectedCityLabel,

    price,
    setPrice,

    phoneValue,
    phoneInputChange,

    addProduct,
    loading

  })



}