
export default function ListNum({filteredData, change, setStateLabel, setStateValue, type}) {

  return(
    <>
      {
        filteredData.map((data, index) => (
          <div key={index} onClick={() => change(setStateLabel, data, setStateValue, data, type)} className="cursor-pointer flex gap-2 items-center hover:bg-gray-200 p-2 border-b">
            <span>{data}</span>
          </div>
        ))
      }
    </>
  )
}