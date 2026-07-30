import { useState } from "react"
import { toast } from "@heroui/react";
import { deleteUser, lockUser, resetWarning, unlockUser, warnUser } from "../../redux/slices/admin/adminUserSlice";
import { useDispatch } from "react-redux";

export const useUser = () => {

  const dispatch = useDispatch()

  const [alertType, setAlertType] = useState('')
  const [title, setTitle] = useState('')
  const [label, setLabel] = useState('')
  const [open, setOpen] = useState(false)

  const [updatedWarn, setUpdatedWarn] = useState(0)

  const handleDeleteAlert = () => {
    setAlertType('delete')
    setTitle('Silmek isdediyinize eminsiz?')
    setLabel('Isdifadeci silindikden sonra geri qaytarmaq mumkun olmayacaq. Yaxsi dusunun.')
    setOpen(true)
  }

  const handleWarnAlert = () => {
    setAlertType('warning')
    setTitle('Uyarmaq isdediyinize eminsiz?')
    setLabel('Uyari sayisi 3 olduqda isdifadeci bloklanir. Yaxsi dusunun.')
    setOpen(true)
  }

  const handleLockAlert = () => {
    setAlertType('lock')
    setTitle('Hesabini bloklamaq isdediyinize eminsiniz?')
    setLabel('Hesabi bloklanmis isdifadeci hesabina daxila bilmir ve elanlari 3gun icinde silinir. Yaxsi dusunun.')
    setOpen(true)
  }

  const handleUnlockAlert = () => {
    setAlertType('unlock')
    setTitle('Hesabini blokdan cixarmaq isdediyinize eminsiniz?')
    setLabel('Hesabi blokdan cixarilmis isdifadecinin 3gun kecmiyibse elanlari berpa olur amma aktif olmur. Diger butun funksiyalar isleyir')
    setOpen(true)
  }

  const handleResetWarningAlert = () => {
    setAlertType('resetWarning')
    setTitle('Hesabin xeberdarliqlarini sifirlamaqa eminsiniz?')
    setLabel('Yaxsi dusunun.')
    setOpen(true)
  }


  const handleNext = (text = null, id, warning) => {
    if(alertType == 'delete') {
      handleDelete(text, id)
    }else if(alertType == 'warning') {
      handleWarning(id)
    } else if(alertType == 'lock') {
      handleLock(id)
    } else if(alertType == 'unlock') {
      handleUnlock(id)
    } else if(alertType == 'resetWarning') {
      handleResetWarning(id, warning)
    }
  }


  // USERI SIL
  const handleDelete = (text, id) => {
    if(text.length == 0) return toast.warning('Formu doldurun')
    toast.promise(
      dispatch(deleteUser({id: id, desc: text})).unwrap(),
      {
        loading: 'Isdifadeci silinir',
        success: 'Uqurla silindi',
        error: (err) => err.message || "Xəta baş verdi.",
      }
    )
    setOpen(false)
  }

  // USERI UYAR
  const handleWarning = (id) => {
    toast.promise(
      dispatch(warnUser(id)).unwrap(),
      {
        loading: 'Isdifadeci guncellenir..',
        success: () => {
          setUpdatedWarn(updatedWarn + 1)
          return 'Isdifadeci guncellendi'
        },
        error: (err) => err.message || "Xəta baş verdi.",
      }
    )
    setOpen(false)
  }

  // USERI KILITLE
  const handleLock = (id) => {
    toast.promise(
      dispatch(lockUser(id)).unwrap(),
      {
        loading: 'Isdifadeci guncellenir..',
        success: () => {
          removeLock(true)
          return 'Isdifadeci guncellendi'
        },
        error: (err) => err.message || "Xəta baş verdi.",
      }
    )
    setOpen(false)
  }

  // USERIN KILIDIN AC
  const handleUnlock = (id) => {
    toast.promise(
      dispatch(unlockUser(id)).unwrap(),
      {
        loading: 'Isdifadeci guncellenir..',
        success: () => {
          removeLock(false)
          return 'Isdifadeci guncellendi'
        },
        error: (err) => err.message || "Xəta baş verdi.",
      }
    )
    setOpen(false)
  }

  // USERIN WARNINGINI SIFIRLA
  const handleResetWarning = (id, warning) => {
    toast.promise(
      dispatch(resetWarning(id)).unwrap(),
      {
        loading: 'Isdifadeci guncellenir..',
        success: () => {
          setUpdatedWarn(-warning)
          return 'Isdifadeci guncellendi'
        },
        error: (err) => err.message || "Xəta baş verdi.",
      }
    )
    setOpen(false)
  }

  const [updatedLock, setUpdatedLock] = useState('')

  const removeLock = (isLock) => {
    if(isLock){
      return setUpdatedLock('Beli')
    }else {
      return setUpdatedLock('Xeyir')
    }
  }

  console.log('1')

  return {
    alertType,
    title,
    label,
    open,
    setOpen,
    updatedWarn,

    // Handle Alerts
    handleDeleteAlert,
    handleWarnAlert,
    handleLockAlert,
    handleUnlockAlert,
    handleResetWarningAlert,

    handleNext,

    handleDelete,
    handleWarning,
    handleLock,
    handleUnlock,
    handleResetWarning,

    updatedLock,
    removeLock
  }
}