import {TrashBin} from '@gravity-ui/icons';
import { toast } from "@heroui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import LibAlert from '../../components/customs/libs/LibAlert';
import { deleteAdsense } from '../../redux/slices/admin/adminAdsenseSlice';

export default function AdsenseList({product}) {

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    toast.promise(
      dispatch(deleteAdsense(product._id)).unwrap(),
      {
        loading: 'Reklamn silinir',
        success: 'Reklam silindi',
        error: (err) => err.message || 'Bir xeta oldu!'
      }
    )
  }

  return(
    <Fragment>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="border-r p-2 truncate">
            {product._id}
          </td>

          <td className="border-r p-2 truncate">
            {product.image}
          </td>

          <td className="border-r p-2 text-center">
            {product.link}
          </td>

          <td className="border-r p-2 text-center">
            {product.click}
          </td>

          <td className="border-r p-2 truncate">
            {product.owner}
          </td>

          <td className="border-r p-2">
            {product.position}
          </td>

          <td className="border-r p-2">
            {product.is_home ? product.is_details ? 'Home, Details' : 'Home' : 'Details'}
          </td>

          <td className="border-r p-2">
            {product.createdAt}
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