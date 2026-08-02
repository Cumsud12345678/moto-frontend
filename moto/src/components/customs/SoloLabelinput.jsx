

export default function SoloLabelinput ({value, change, label, pl = 10}) {

  return(
    <div className="flex items-center relative">
      <input 
        value={value} 
        onChange={change} 
        type="text" 
        className="border rounded-xl p-3 focus:outline-sky-500 w-full bg-[#fafbff]"
        style={{ paddingLeft: `${pl}px` }}
      />
      <div className="absolute py-3 px-3.5 rounded-l-lg">
        <span className="text-gray-500">{label}</span>
      </div>
    </div>
  )
}