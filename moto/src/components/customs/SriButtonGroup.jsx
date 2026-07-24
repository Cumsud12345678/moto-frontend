import { useEffect, useState } from "react"


export default function SriButtonGroup ({data, id, onClick}) {

  const [newData, setNewData] = useState([])

  useEffect(() => {
    setNewData([{id: null, label: 'Hamisi'}, ...data])
  }, [data])

  return(
    <div className="flex">
      {
        newData.map((item, index) => {
          const active = item._id == id
          return (
            <button 
              key={item._id}
              className={`
                p-2 px-4 py-2 cursor-pointer 
                ${active ? 'bg-green-300 border-green-600' : 'bg-white hover:bg-gray-200'}
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