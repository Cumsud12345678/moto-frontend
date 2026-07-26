import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMetadata } from "../../../redux/slices/metadata/metadataSlice"
import { createProduct } from "../../../redux/slices/product/productSlice"
import { useNavigate } from 'react-router-dom';
import { toast } from "@heroui/react";

export const useProduct = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
    equipments,

    success,
    loading,
  } = useSelector(s => s.metadata)

  const {
    message
  } = useSelector(s => s.product)

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
      top: document.body.scrollHeight,
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
  const handleDrop = (files) => {
    const newImages = files.map((file) => ({
      id: generateId(),
      url: URL.createObjectURL(file),
      file: file
    }))

    setImages((prev) => [...prev, ...newImages]);
  }

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find(i => i.id === id)
      if (img) URL.revokeObjectURL(img.url)
      return prev.filter((img) => img.id !== id)
    })
  }

  const [selectedCity, setSelectedCity] = useState('')
  const selectedCityLabel = cities.find(c => c._id == selectedCity)
  const [price, setPrice] = useState('')

  const dataa = () => {
    const pr = {
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
    }

    toast.promise(dispatch(createProduct(pr)).unwrap(), 
      {
        loading: "Məhsul elave olunur...",
        success: () => {
          setTimeout(() => {
            navigate('/profile')
          }, 3000)
          return "Məhsul əlavə olundu!"
        },
        error: (err) => err.message || "Xəta baş verdi.",
      }
    )
  }

  useEffect(() => {
    if(message) {
      toast.danger(message)
    }
  }, [message])

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

    cities,
    selectedCity,
    setSelectedCity,
    selectedCityLabel,

    price,
    setPrice,


    dataa

  })



}