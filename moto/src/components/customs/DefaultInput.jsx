import { useEffect, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DefaultInput({ value, onChange, label, len=20, type='string' }) {
  
  const inputRef = useRef(null);

  const formatNumber = (text) => {
    if (!text) return "";

    if(type === 'string') {
      return text
    }

    return new Intl.NumberFormat("fr-FR")
      .format(Number(text))
      .replace(/\u202F|\u00A0/g, " ");
  };

  const changeInput = (value) => {
    const rawValue = value.replace(/\s/g, "");
    if (type !== 'string') {
      const newValue = value.replace(/\D/g, "");
      return onChange(newValue);
    }
    onChange(rawValue);
  }

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          value={formatNumber(value)}
          maxLength={len}
          inputMode={type == 'string' ? '' : 'numeric'}
          onChange={(e) => changeInput(e.target.value)}
          className="peer w-full rounded-xl border bg-[#fafbff] px-3 pt-6 pb-2 text-[16px] focus:outline-sky-500"
          placeholder=" "
        />

        <label className="pointer-events-none absolute left-3.5 top-4 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-not-placeholder-shown:top-2 peer-not-placeholder-shown:text-xs">
          {label}
        </label>

        {value && (
          <button
            type="button"
            className="absolute right-2 rounded-full p-1 hover:bg-gray-200"
            onClick={() => onChange('')}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
}