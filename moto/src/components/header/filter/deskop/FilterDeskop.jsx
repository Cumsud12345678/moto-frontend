import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterModal from "./FilterModal"
import { useLocation, useNavigate } from "react-router-dom";
import SearchAndSelect from "../../../customs/SearchAndSelect";
import SriButtonGroup from "../../../customs/SriButtonGroup";

export default function FilterDeskop({useFilter}){

  const {

    makes,
    make,
    setMake,

    filteredModel,
    model,
    setModel,

    statuses,
    status,
    setStatus,

    applyFilter

  } = useFilter

  const navigate = useNavigate()
  const location = useLocation()

  const openFilter = location.hash == '#filter'

  const handleOpen = () => {
    navigate(`${location.search}#filter`)
  }

  const handleMakeSelect = (value) => {
    setModel('')
    setMake(value)
  }

  return(
    <div className="hidden lg:block container mt-20 mx-auto max-w-[1000px]">
      <div className="flex items-center justify-between gap-2">

        <div className='w-full'>
          <SearchAndSelect 
            data={makes} 
            id={make || ''} 
            onClick={handleMakeSelect} 
            onChange={handleMakeSelect}
            label={'Marka'}
            variant={'floating'}
          />
        </div>

        <div className="w-full">
          <SearchAndSelect 
            data={filteredModel} 
            id={model || ''} 
            onClick={setModel} 
            onChange={() => setModel('')}
            label={'Model'}
            variant={'floating'}
          />
        </div>

        <div className="">
          <SriButtonGroup data={statuses} id={status} onClick={setStatus} />
        </div>
        
        <div className="flex items-center justify-center w-full h-full gap-3">
          <button onClick={applyFilter} type="button" className="bg-blue-500 text-white h-[40px] px-8 rounded-lg cursor-pointer">
            Axtar
          </button>
          <button onClick={handleOpen} className="bg-blue-500 text-white h-[40px] px-2 rounded-lg cursor-pointer shrink-0">
            <FilterAltIcon sx={{ mb: '3px' }}></FilterAltIcon>
            Filter
          </button>
        </div>
        
      </div>

      <FilterModal open={openFilter} onClose={() => navigate(-1)} useFilter={useFilter} />
    
    </div>
    
  )
}