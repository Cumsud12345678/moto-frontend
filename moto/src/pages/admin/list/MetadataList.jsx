import {Pencil} from '@gravity-ui/icons';
import {TrashBin} from '@gravity-ui/icons';
import { toast } from "@heroui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import LibAlert from '../../../components/customs/libs/LibAlert';
import { deleteData, deleteMetadata } from '../../../redux/slices/admin/adminMetadataSlice';

export default function MetadataList({data, type}) {

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const deleteActions = {
    make: {type: 'makes', id: data._id},
    model: {type: 'models', id: data._id},
    category: {type: 'categories', id: data._id},
    city: {type: 'cities', id: data._id},
    color: {type: 'colors', id: data._id},
    fuel: {type: 'fuels', id: data._id},
    speed: {type: 'speeds', id: data._id},
    status: {type: 'statuses', id: data._id},
    equipment: {type: 'equipments', id: data._id},
  };

  const handleNext = () => {
    const action = deleteActions[type];
    if (!action) return;

    toast.promise(
      dispatch(deleteMetadata(action)).unwrap(),
      {
        loading: 'Silinir',
        success: () => {
          dispatch(deleteData(action))
          return 'Silindi'
        },
        error: (err) => err.message || 'Xeta bas verdi'
      }
    );
  };
  
  return(
    <Fragment>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="border-r p-2 truncate">
            {data?._id}
          </td>

          {
            data.logo && 
            <td className="border-r p-2 truncate">
              {data.logo}
            </td>
          }
          
          <td className="border-r p-2 text-center">
            {data.label}
          </td>

          {
            data.make && 
            <td className="border-r p-2 text-center">
              {data.make.label}
            </td>
          }
          
          <td className="p-2">
            <div className="flex justify-center gap-3">

              <button 
                onClick={() => setOpen(true)}
                className="bg-red-500 p-1.5 rounded-full cursor-pointer">
                <TrashBin className="text-white size-5" />
              </button>

            </div>
          </td>
        </tr>
      </tbody>

      <LibAlert openAlert={open} setOpenAlert={setOpen} title={'Silmek isdediynize eminsiz?'} onClick={handleNext} />
    </Fragment>
    
  )
}