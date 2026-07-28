
export default function ListObject({filteredData, change, setStateLabel, setStateValue, type}) {

  return(
    <>
      {
        filteredData.map((data, index) => (
          <div key={index} onClick={() => change(setStateLabel, data.label, setStateValue, data._id, type)} className="cursor-pointer flex gap-2 items-center hover:bg-gray-200 p-2 border-b">
            {data.logo &&
              <img src={`${import.meta.env.VITE_API_URL}/uploads/${data.logo}`} className="w-[30px]" alt={`${data.label}`} />
            }
            <span style={{fontSize: '16px'}}>{data.label}</span>
          </div>
        ))
      }
    </>
  )
}