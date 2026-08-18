import { Skeleton } from "@heroui/react"
import { useEffect, useState } from "react"


export default function SriButtonGroup ({data, id, onClick}) {

  const [newData, setNewData] = useState([])

  useEffect(() => {
    setNewData([{_id: '', label: 'Hamısı'}, ...data])
  }, [data])

  if(newData.length === 1) {
    return (
      <div className="flex gap-2">
        {
          [...Array(3)].map((_, index) => (
            <Skeleton key={index} className={`h-12 w-20 cursor-pointer rounded-lg`}/>
          ))
        }
      </div>
    )
  }

  return(
    <div className="flex">
      {
        newData.map((item, index) => {
          const active = item._id == id
          return (
            <button 
              key={index}
              className={`
                p-2 px-4 py-3 cursor-pointer 
                ${active ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}
                ${index == 0 ? 'border-2 rounded-l-lg' : ''}
                ${index == 1 ? 'border-y-2' : ''}
                ${index == 2 ? 'border-2 rounded-r-lg' : ''}
              `}
              onClick={() => onClick(item._id)}
            >
              {item.label}
            </button>
          )
        })
      }
    </div>
  )
}