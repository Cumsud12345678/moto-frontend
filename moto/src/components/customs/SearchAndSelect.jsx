import { useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SearchAndSelect({ data = [], id, onClick, onChange, label, variant, pl=null}) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const inputRef = useRef(null);

  // Universal helper-lər
  const getId = (item) =>
    typeof item === "object" ? item._id : item;

  const getLabel = (item) =>
    typeof item === "object" ? item.label : String(item);

  useEffect(() => {
    const selected = data.find((item) => getId(item) === id);

    if (selected) {
      setValue(getLabel(selected));
      setSelectedId(getId(selected));
    } else {
      setValue("");
      setSelectedId(null);
    }
  }, [id, data]);


  const changeInput = (value) => {
    setValue(value);
    setSelectedId(null);
    if (onChange) onChange(value);
    if (onClick) onClick(null);
  }

  const deleteValue = () => {
    setValue('');
    setSelectedId(null);
    onClick?.(null);
  }

  const checkedData = (item) => {
    setValue(getLabel(item));
    setSelectedId(getId(item));
    setFocus(false);
    onClick?.(getId(item));
  }

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      getLabel(item).toLowerCase().startsWith(value.toLowerCase())
    );
  }, [data, value]);


  const variants = {
    floating: {
      width: 'w-full',
      inputClass: 'peer w-full bg-white px-3 pt-5 pb-1 text-[16px]',
      placeholder: ' ',
      labelType: 'label'
    },

    leftLabel: {
      width: 'w-full',
      inputClass: 'p-2.5 bg-white',
      placeholder: '',
      labelType: 'div'
    },

    default: {
      width: 'w-3/4',
      inputClass: 'w-full bg-white px-2 py-2.5 text-sm',
      placeholder: label,
      labelType: false
    }
  }

  const current = variants[variant]

  return (
    <div className={`relative ${current.width}`}>
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => changeInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`
            border focus:outline-sky-500 rounded-lg
            ${current.inputClass}
          `}
          style={{ paddingLeft: `${pl}px` }}
          placeholder={
            current.placeholder
          }
        />

        {
          current.labelType == 'label'
          ? (
            <label className="pointer-events-none absolute left-3.5 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-xs">
              {label}
            </label>
          ) : current.labelType == 'div' && (
            <div className="absolute py-3 px-2 rounded-l-lg">
              <span className="text-gray-500">{label}</span>
            </div>
          )
        }
        
        {value ? (
          <button
            type="button"
            className="absolute right-2 rounded-full p-1 hover:bg-gray-200"
            onClick={deleteValue}
          >
            <CloseIcon />
          </button>
        ) : (
          <button
            type="button"
            className={`absolute right-2 transform transition-transform duration-300 ${focus ? 'rotate-180' : 'rotate-0'}`}
            onClick={() => inputRef.current?.focus()}
          >
            <ExpandMoreIcon/>
          </button>
        )}
      </div>

      {focus && (
        <div className="absolute z-[1000] mt-2 max-h-[225px] w-full overflow-auto rounded-lg border-2 bg-white p-1 shadow-lg">
          {filteredData.length === 0 ? (
            <div className="px-2">
              Tapılmadı...
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={getId(item)}
                className="flex cursor-pointer justify-between rounded-lg p-2 hover:bg-gray-200"
                onMouseDown={() => checkedData(item)}
              >
                <span style={{fontSize: '14px'}}>{getLabel(item)}</span>

                {selectedId === getId(item) && (
                  <CheckIcon sx={{ fontSize: 20, color: "green" }} />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}