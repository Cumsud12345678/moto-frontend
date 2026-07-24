import {Pencil} from '@gravity-ui/icons';
import {TrashBin} from '@gravity-ui/icons';
import { toast } from "@heroui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import LibAlert from '../../../components/customs/libs/LibAlert';
import { Switch } from '@mui/material';
import { Gear } from '@gravity-ui/icons';
import { ProductModal } from '../customs/ProductModal';
import { useProduct } from '../hooks/useProduct';

export default function ProductList({product}) {

  const [open, setOpen] = useState(false)

  const {
    productAlertType, productTitle, productLabel,
    productOpen, setProductOpen,
    updatedActive,
    handleProductDeleteAlert,
    handleDeactiveAlert,
    handleActiveAlert,
    handleProductNext
  } = useProduct()

  return(
    <Fragment>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="border-r p-2 truncate">
            {product._id}
          </td>

          <td className="border-r p-2 truncate">
            {product.createdAt}
          </td>

          <td className="border-r p-2 text-center">
            {product.price}
          </td>

          <td className="border-r p-2 text-center">
            {product.volume}
          </td>

          <td className="border-r p-2 text-center">
            {String(product.isActive)}
          </td>

          <td className="border-r p-2 text-center">
            {product.user.phone}
          </td>

          <td className="p-2">
            <div className="flex justify-center gap-3">

              <button className="bg-red-500 p-1.5 rounded-full cursor-pointer">
                <TrashBin className="text-white size-5" />
              </button>

              <button onClick={() => setOpen(true)} className="bg-blue-500 p-1.5 rounded-full cursor-pointer">
                <Gear className="text-white size-5" />
              </button>

            </div>
          </td>
        </tr>
      </tbody>

      <ProductModal openModal={open} setOpenModal={setOpen} images={product.images} product={product} />
      <LibAlert 
        openAlert={productOpen} 
        setOpenAlert={setProductOpen} 
        title={productTitle} 
        label={productLabel} 
        onClick={(text) => handleProductNext(text, product._id)} 
        type={productAlertType} 
      />
    </Fragment>
    
  )
}