import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { getMetadata } from "../../../../redux/slices/metadata/metadataSlice"

export const useFilter = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()

  const {
    makes,
    models,
    cities,
    colors,
    categories,
    statuses,
    fuels,
    speeds,
    equipments,
    message
  } = useSelector(s => s.metadata)
  const [filteredModel, setFilteredModel] = useState([])

  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [fuel, setFuel] = useState('')
  const [city, setCity] = useState('')
  const [color, setColor] = useState('')
  const [speed, setSpeed] = useState('')
  const [stateEquipment, setStateEquipment] = useState([])
  
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [minEngine, setMinEngine] = useState('')
  const [maxEngine, setMaxEngine] = useState('')
  const [minVolume, setMinVolume] = useState('')
  const [maxVolume, setMaxVolume] = useState('')
  const [minDistance, setMinDistance] = useState('')
  const [maxDistance, setMaxDistance] = useState('')

  useEffect(() => {
    if(makes.length == 0){
      dispatch(getMetadata())
    }
  }, [makes])

  useEffect(() => {
    const arr = models.filter(model => model.make == make)
    setFilteredModel(arr)
  }, [make])

  const setEquipments = (id) => {
    setStateEquipment(prev => {
      if(prev.includes(id)){
        return prev.filter(p => p !== id)
      }

      return [...prev, id]
    })
  }
  
  const applyFilter = () => {
    const params = new URLSearchParams()

    if(make) params.set('make', make)
    if(model) params.set('model', model || '')
    if(category) params.set('category', category || '')
    if(status) params.set('status', status || '')
    if(fuel) params.set('fuel', fuel || '')
    if(city) params.set('city', city || '')
    if(color) params.set('color', color || '')
    if(speed) params.set('speed', speed || '')
    if(stateEquipment.length > 0) params.set('equipments', stateEquipment || [])
    if(minPrice) params.set('minPrice', minPrice || '')
    if(maxPrice) params.set('maxPrice', maxPrice || '')
    if(minYear) params.set('minYear', minYear || '')
    if(maxYear) params.set('maxYear', maxYear || '')
    if(minEngine) params.set('minEngine', minEngine || '')
    if(maxEngine) params.set('maxEngine', maxEngine || '')
    if(minVolume) params.set('minVolume', minVolume || '')
    if(maxVolume) params.set('maxVolume', maxVolume || '')
    if(minDistance) params.set('minDistance', minDistance || '')
    if(maxDistance) params.set('maxDistance', maxDistance || '')

    console.log("make:", make);
    console.log("params:", params.toString());

    navigate(`/autos?${params.toString()}`)
  }

  // buna heleki baxmiram
  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const filterKeys = [
      'make', 'model', 'category', 'status', 'fuel',
      'city', 'color', 'speed', 'equipments',
      'minPrice', 'maxPrice', 'minYear', 'maxYear',
      'minEngine', 'maxEngine', 'minVolume', 'maxVolume',
      'minDistance', 'maxDistance'
    ]
    const hasAnyFilter = filterKeys.some(key => params.has(key))

    if (!hasAnyFilter) return; // 👈 HOME boşdursa heç nə etmə

    setMake(params.get('make'))
    setModel(params.get('model'))
    setCategory(params.get('category'))
    setStatus(params.get('status'))
    setFuel(params.get('fuel'))
    setCity(params.get('city'))
    setColor(params.get('color'))
    setSpeed(params.get('speed'))
    setStateEquipment(params.get('equipments') ? params.get('equipments').split(',') : [])
    setMinPrice(params.get('minPrice'))
    setMaxPrice(params.get('maxPrice'))
    setMinYear(params.get('minYear'))
    setMaxYear(params.get('maxYear'))
    setMinEngine(params.get('minEngine'))
    setMaxEngine(params.get('maxEngine'))
    setMinVolume(params.get('minVolume'))
    setMaxVolume(params.get('maxVolume'))
    setMinDistance(params.get('minDistance'))
    setMaxDistance(params.get('maxDistance'))

  }, [location.search])


  const resetForm = () => {
    setMake('')
    setModel('')
    setCategory('')
    setStatus('')
    setFuel('')
    setCity('')
    setColor('')
    setSpeed('')
    setStateEquipment([])
    setMinPrice('')
    setMaxPrice('')
    setMinYear('')
    setMaxYear('')
    setMinEngine('')
    setMaxEngine('')
    setMinVolume('')
    setMaxVolume('')
    setMinDistance('')
    setMaxDistance('')
  }


  const years = Array.from({ length: 2026-1950 },(_, index) => 2026 - index)
  const volumes = Array.from({ length: 3000/50 + 1 }, (_, index) => index * 50)

  return{

    makes,
    make,
    setMake,

    filteredModel,
    model,
    setModel,

    statuses,
    status,
    setStatus,

    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,

    years,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,

    fuels,
    fuel,
    setFuel,

    minDistance,
    setMinDistance,
    maxDistance,
    setMaxDistance,

    volumes,
    minVolume,
    setMinVolume,
    maxVolume,
    setMaxVolume,

    cities,
    city,
    setCity,

    minEngine,
    setMinEngine,
    maxEngine,
    setMaxEngine,

    colors,
    color,
    setColor,

    speeds,
    speed,
    setSpeed,

    categories,
    category,
    setCategory,

    applyFilter,
    resetForm,

    equipments,
    stateEquipment,
    setEquipments,

    error: message

  }

}