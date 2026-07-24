import { Label } from '@heroui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetadataList from '../list/MetadataList';

export default function Color({colors, setForm}) {

  const dispatch = useDispatch()
  const [color, setColor] = useState('')

  return(
    <Fragment>
      <div className='border-2 p-8 rounded-xl'>
        <h2 className="text-xl font-bold">Reng</h2>
        <div className='mt-3 flex flex-col'>
          <div className='max-w-[300px] mt-2 flex flex-col gap-3'>
            <Label style={{ marginBottom: '-10px' }}>Reng</Label>

            <div className='flex items-center justify-between gap-2'>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                type="text"
                className='p-2 border rounded-lg bg-white w-full'
                placeholder='Reng'
              />
            </div>
              
            <button
              onClick={() => setForm({color: color}, 'colors')}
              className='w-full bg-blue-500 p-2 rounded-xl text-white mt-5 cursor-pointer'
            >
              Kaydet
            </button>

          </div>
        </div>
      </div>


      <div>
        <h2 className="text-2xl font-bold mt-6">Rengler</h2>
        <table className="table-fixed border border-collapse bg-white mt-2">
          <thead>
            <tr className="border-b">
              <th className="w-[225px] border-r p-2 text-left font-medium">ID</th>
              <th className="w-[120px] border-r p-2 text-left font-medium">Label</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            colors.map(item => (
              <MetadataList key={item._id} data={item} type={'color'} />
            ))
          }

        </table>
      </div>
    </Fragment>
  )
}