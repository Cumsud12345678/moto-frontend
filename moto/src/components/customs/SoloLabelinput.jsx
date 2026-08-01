

export default function SoloLabelinput ({value, change, label, pl = 10}) {

  return(
    <div className="flex items-center relative">
      <input 
        value={value} 
        onChange={change} 
        type="text" 
        className="border rounded-xl p-2.5 bg-white focus:outline-sky-500 w-full"
        style={{ paddingLeft: `${pl}px` }}
      />
      <div className="absolute py-3 px-2 rounded-l-lg">
        <span className="text-gray-500">{label}</span>
      </div>
    </div>
  )
}