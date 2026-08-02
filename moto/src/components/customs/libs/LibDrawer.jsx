import {
  Label, 
  ListBox, 
  Select,
  Autocomplete,
  EmptyState,
  SearchField,
  useFilter,
  Button,
  Drawer
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
          <Drawer.Dialog className="h-[70%]">
            <Drawer.Handle />
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>{label}</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body className="p-0 flex flex-col gap-2">
              <div>
                <input 
                  type="text" 
                  className="w-full my-2 border border-black p-3 rounded-xl focus:outline-sky-500 text-black" 
                  placeholder="Axtar..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              {
                filteredData.map((item, index) => {
                  const selected = active == (item._id ?? item)
                  return (
                    <div key={index} onClick={() => onClick(item._id ? item._id : item)} className={`cursor-pointer hover:bg-gray-200 p-3 rounded-xl flex justify-between ${selected && 'border text-black'}`}>
                      <button style={{fontSize: '16px'}} className='list-group-item list-group-item-action text-black'>
                        {item.label ? item.label : item}
                      </button>
                      {selected && 
                        <CheckIcon sx={{ fontSize: 20, color: "green" }} />
                      }
                    </div>
                  )
                })
              }
            </Drawer.Body>
            <Drawer.Footer style={{marginTop: '0px'}}>
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