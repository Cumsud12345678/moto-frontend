import { Skeleton } from "@heroui/react";

export default function Checkbox ({data, ids, onClick}) {

  const safeIds = ids || [];   // ← əlavə edin

  if(data.length === 0) {
    return (
      <div className="flex flex-wrap gap-2">
        {
          [...Array(9)].map((_, index) => (
            <Skeleton key={index} className={`h-10 w-18 cursor-pointer rounded-3xl`} />
          ))
        }
      </div>
    )
  }

  return(
    <div className="flex flex-wrap gap-2">
      {
        data.map((item, index) => {
          const active = safeIds.includes(item._id);   // ← ids yerinə safeIds
          return (
            <button 
              key={item._id}
              className={`
                p-2.5 px-4 cursor-pointer rounded-3xl
                ${active ? 'bg-blue-500 text-white' : 'bg-[#ebedf3] border hover:bg-gray-200'}
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