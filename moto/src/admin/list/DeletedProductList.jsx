import {Pencil} from '@gravity-ui/icons';
import {TrashBin} from '@gravity-ui/icons';
import { toast } from "@heroui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import LibAlert from '../../components/customs/libs/LibAlert';
import { Switch } from '@mui/material';
import { Gear } from '@gravity-ui/icons';
import { ProductModal } from '../customs/ProductModal';
import { deleteDeletedProduct } from '../../redux/slices/admin/adminProductSlice';

export default function DeletedProductList({product}) {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  console.log(product)

  const handleDelete = () => {
    toast.promise(
      dispatch(deleteDeletedProduct(product._id)).unwrap(),
      {
        loading: 'User silinir',
        success: 'User silindi',
        error: (err) => err.message || 'Bir xeta oldu!'
      }
    )
  }

  return(
    <Fragment>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="border-r p-2 truncate">
            {product.product_id}
          </td>

          <td className="border-r p-2 truncate">
            {product.createdAt}
          </td>

          <td className="border-r p-2 text-center">
            {product.user?._id}
          </td>

          <td className="border-r p-2 truncate">
            {product.user?.email}
          </td>

          <td className="border-r p-2">
            {product.description}
          </td>

          <td className="p-2">
            <div className="flex justify-center gap-3">

              <button onClick={() => setOpen(true)} className="bg-red-500 p-1.5 rounded-full cursor-pointer">
                <TrashBin className="text-white size-5" />
              </button>

            </div>
          </td>
        </tr>
      </tbody>

      <LibAlert openAlert={open} setOpenAlert={setOpen} title={'Silmek isdediyinize eminsiniz?'} label={''} onClick={handleDelete} type={'clear'} />

    </Fragment>
    
  )
}