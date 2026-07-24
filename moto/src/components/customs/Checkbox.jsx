export default function Checkbox ({data, ids, onClick}) {

  const safeIds = ids || [];   // ← əlavə edin

  return(
    <div className="flex flex-wrap gap-2">
      {
        data.map((item, index) => {
          const active = safeIds.includes(item._id);   // ← ids yerinə safeIds
          return (
            <button 
              key={item._id}
              className={`
                p-2 px-3 cursor-pointer border-2 rounded-3xl 
                ${active ? 'bg-green-300 border-green-600' : 'bg-white hover:bg-gray-200'}
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