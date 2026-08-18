export default function SoloLabelinput ({value, change, label, pl = 10}) {

  const formatNumber = (text) => {
    if (!text) return "";

    // if(type === 'string') {
    //   return text
    // }

    return new Intl.NumberFormat("fr-FR")
      .format(Number(text))
      .replace(/\u202F|\u00A0/g, " ");
  };

  const changeInput = (value) => {
    const rawValue = value.replace(/\s/g, "");
    // if (type !== 'string') {
      const newValue = rawValue.replace(/\D/g, "");
      return change(newValue);
    // }
    // onChange(rawValue);
  }

  return(
    <div className="flex items-center relative">
      <input 
        inputMode='numeric'
        value={formatNumber(value)} 
        onChange={(e) => changeInput(e.target.value)} 
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