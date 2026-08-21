import { useState } from "react"
import { toast } from "@heroui/react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/slices/admin/adminProductSlice";

export const useProduct = () => {

  const dispatch = useDispatch()

  const [alertType, setAlertType] = useState('')
  const [title, setTitle] = useState('')
  const [label, setLabel] = useState('')
  const [productOpen, setProductOpen] = useState(false)

  const [updatedActive, setUpdatedActive] = useState('Beli')

  const handleProductDeleteAlert = () => {
    setAlertType('delete')
    setTitle('Silmek isdediyinize eminsiz?')
    setLabel('Elan silindikden sonra geri qaytarmaq mumkun olmayacaq. Yaxsi dusunun.')
    setProductOpen(true)
  }

  const handleActiveAlert = () => {
    setAlertType('active')
    setTitle('Elani aktiv etmek isdediyinize eminsiniz?')
    setLabel('Elan aktiv olduqda diger isdifadecilere gorunecek. Yaxsi dusunun.')
    setProductOpen(true)
  }
  

  const handleProductNext = (text = null, id) => {
    if(alertType == 'delete') {
      handleProductDelete(text, id)
    } else if(alertType == 'active') {
      handleActive(id)
    }
  }


  // PRODUCTU SIL
  const handleProductDelete = (text, id) => {
    if(!text || text.length == 0) return toast.warning('Formu doldurun')
    toast.promise(
      dispatch(deleteProduct({id: id, desc: text})).unwrap(),
      {
        loading: 'Elan silinir',
        success: 'Uqurla silindi',
        error: (err) => err.message || "Xəta baş verdi.",
      }
    )
    setProductOpen(false)
  }

  return {
    productAlertType: alertType,
    productTitle: title,
    productLabel: label,
    productOpen,
    setProductOpen,
    updatedActive,
    setUpdatedActive,

    // Handle Alerts
    handleProductDeleteAlert,
    handleActiveAlert,
    
    handleProductNext,

    handleProductDelete,
  }
}