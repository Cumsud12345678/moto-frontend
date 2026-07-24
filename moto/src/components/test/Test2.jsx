import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export default function Test2 () {

  const datas = [
    {
      label: 'BMW',
      id: 1
    },
    {
      label: 'Hunday',
      id: 2
    },
    {
      label: 'Mersedes',
      id: 3
    },
    {
      label: 'Dodge',
      id: 4
    }
  ]

  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')

  const [selectedId, setSelectedId] = useState('')

  const [filteredData, setFilteredData] = useState(datas)

  const filter = (value) => {
    setSelectedId(null)
    setValue(value)
    const newData = datas.filter(data => data.label.toLowerCase().startsWith(value.toLowerCase()))
    setFilteredData(newData)
  }

  console.log(value)

  return(
    <div className="m-20">
      <div className="relative">
        <input
          type="text"
          placeholder=" "
          className="peer w-full border rounded-lg px-3 pt-6 pb-2 outline-none"
        />

        <label
          className=" absolute left-3 top-4 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs"
        >
          Adınız
        </label>
      </div>

      <div className="mt-5 relative">
        <div className="flex items-center relative">
          <input 
            value={value}
            onChange={(e) => filter(e.target.value)}
            onBlur={() => setFocus(false)} 
            onFocus={() => setFocus(true)} 
            className="border-2 rounded-lg px-3 pt-5 pb-1 focus:outline-sky-500 w-full peer" type="text" placeholder=" " 
          />

          <label
            className="absolute left-3.5 top-3.5 text-gray-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs"
          >
            Marka
          </label>
          <div 
            onClick={() => {
              setValue('')
              setSelectedId(null)
            }} 
            className={`absolute right-0 mr-2 hover:bg-gray-200 p-1 rounded-full cursor-pointer ${value ? 'block' : 'hidden'}`}
          >
            <CloseIcon />
          </div>
        </div>
        
        <div className={`border-2 rounded-lg p-1 mt-2 max-h-[122px] overflow-auto absolute w-full ${focus ? 'block' : 'hidden'} `}>
          {
            filteredData.length == 0 
            ? 
            (
              <div className="px-2 rounded-lg">
                <span className="font-serif">Tapilmadi...</span>
              </div>
            )
            :
            filteredData.map((data, index) => {
              const active = data.id == selectedId
              return (
                <div
                  key={index}
                  className="cursor-pointer hover:bg-gray-200 p-1.5 px-2 rounded-lg flex justify-between"
                  onMouseDown={() => {
                    setValue(data.label);
                    setSelectedId(data.id)
                    setFocus(false);
                  }}
                >
                  <span>{data.label}</span>
                  {
                    active &&
                    <div>
                      <CheckIcon style={{fontSize: '20px', color: 'green'}} />
                    </div>
                  }
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="mt-10">
        <button className="bg-white border-2 p-2 px-4 rounded-l-lg cursor-pointer hover:bg-gray-200">Yeni</button>
        <button className="bg-white border-y-2 p-2 px-4 cursor-pointer hover:bg-gray-200">Islenmis</button>
        <button className="bg-green-300 border-2 border-green-600 p-2 px-4 rounded-r-lg cursor-pointer hover:bg-green-200">Zavod</button>
      </div>

      <div className="mt-10 relative flex items-center">
        <input type="text" className="border-2 rounded-lg p-3 pl-10 bg-white focus:outline-sky-500 w-1/4" />
        <div className="absolute py-3 px-2 rounded-l-lg">
          <span>Min.</span>
        </div>
      </div>
    </div>
  )
}