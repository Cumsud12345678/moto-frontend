import {
  Label, 
  ListBox, 
  Select,
  Autocomplete,
  EmptyState,
  SearchField,
  useFilter,
  Button,
  Drawer,
  Skeleton
} from "@heroui/react";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

 export default function LibDrawer({open, arr, onClose, onClick, active, label}){

  const [inputValue, setInputValue] = useState('')
  const [filteredData, setFilteredData] = useState(arr || [])

  useEffect(() => {
    if(!arr) return;
    const filtered = arr.filter(data => {
      const value = data.label ?? data
      if(value == data){
        return String(value).toLowerCase().startsWith(inputValue.toLowerCase())
      } else {
        return String(value).toLowerCase().includes(inputValue.toLowerCase())
      }
      
    })
    setFilteredData(filtered)
  }, [inputValue, arr])

  return(
   
    <Drawer isOpen={open} onOpenChange={onClose}>
      <Drawer.Backdrop className='z-[10000000]'>
        <Drawer.Content>
          <Drawer.Dialog className="h-[70%] p-0">
            <Drawer.Handle className="mt-5" />
            <Drawer.CloseTrigger />
            <Drawer.Header className="px-4">
              <Drawer.Heading className="text-xl">{label}</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="px-4 flex flex-col gap-2">
              <div>
                <input 
                  type="text" 
                  className="w-full my-2 border p-3.5 rounded-xl text-black bg-[#ebedf3]" 
                  placeholder="Axtar..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              {
                arr.length == 0  &&
                  [...Array(10)].map((_, index) => (
                    <Skeleton className="h-[100px] rounded-xl" />
                  ))
                  
              }
              {
                filteredData.map((item, index) => {
                  const selected = active == (item._id ?? item)
                  return (
                    <div key={index} onClick={() => onClick(item._id ? item._id : item)} className={`cursor-pointer hover:bg-gray-200 p-3 rounded-xl flex items-center justify-between ${selected && 'border text-black'}`}>
                      <div className="flex gap-2">
                        {
                          item.logo && 
                          <img src={`${import.meta.env.VITE_API_URL}/uploads/${item.logo}`} className="w-[30px]" alt={`${item.label}`} />
                        }
                        <button style={{ fontSize: '16px' }} className='list-group-item list-group-item-action text-black'>
                          {item.label ? item.label : item}
                        </button>
                      </div>
                      
                      {selected && 
                        <CheckIcon sx={{ fontSize: 20, color: "green" }} />
                      }
                    </div>
                  )
                })
              }
            </Drawer.Body>
            <Drawer.Footer className="px-4 py-2" style={{marginTop: '0px'}}>
              <Button onPress={() => {
                onClick('')
              }} variant="secondary">
                Sıfırla
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
 }