import { Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";

export default function ButtonGroup ({data, id, onClick, flex=null, isNew=false}) {

  if(data.length === 0) {
    return (
      <div className={`flex gap-2 pb-2 ${flex ? 'flex-nowrap' : 'flex-wrap'}`}>
        {
          [...Array(5)].map((_, index) => (
            <Skeleton key={index} className={`h-10 w-18 cursor-pointer rounded-3xl`}/>
          ))
        }
      </div>
    )
  }

  return(
    <div className={`flex gap-2 pb-2 ${flex ? 'flex-nowrap' : 'flex-wrap'}`}>

      {
        location.pathname !== '/new' && location.pathname.split('/', 2)[1] !== 'edit'
          && (
            <button 
              key={'2'}
              className={`
                p-2 px-3 cursor-pointer rounded-3xl
                ${!id ? 'bg-blue-500 text-white' : 'bg-[#ebedf3] border hover:bg-gray-200'}
              `}
              onClick={() => onClick(null)}
            >
              Hamısı
            </button>
          )
      }

      {
        data.map((item, index) => {
          if(isNew && item.label == 'Hamisi') return; 
          const active = item._id == id
          return (
            <button 
              key={item._id}
              className={`
                p-2.5 px-4 cursor-pointer rounded-3xl
                ${active ? 'bg-blue-500 text-white' : 'bg-[#ebedf3] hover:bg-gray-200'}
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