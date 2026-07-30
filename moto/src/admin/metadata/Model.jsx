import { Label } from '@heroui/react';
import { Fragment, useEffect, useState } from 'react';
import {Plus} from '@gravity-ui/icons';
import {Minus} from '@gravity-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "@heroui/react";
import { createMetadata, setData } from '../../redux/slices/admin/adminMetadataSlice';
import MetadataList from '../list/MetadataList';
import {ListBox, Select} from "@heroui/react";

export default function Model({makes, models}) {

  const dispatch = useDispatch()
  
  const [make, setMake] = useState('')
  const [stateModels, setStateModels] = useState([
    { name: '' }
  ])

  const addModel = () => {
    setStateModels([...stateModels, { name: '' }])
  }

  const removeModel = (index) => {
    setStateModels(stateModels.filter((_, i) => i !== index))
  }

  const setModelForm = () => {
    if(!make) return toast.danger('Marka secin')
    const formData = new FormData()
    formData.append('make', make.label)
    formData.append(
      'models',
      JSON.stringify(
        stateModels
          .map(item => item.name.trim())
          .filter(item => item !== '')
      )
    )

    toast.promise(
      dispatch(createMetadata(formData)).unwrap(),
      {
        loading: 'Kayit etklenir',
        success: () => {
          dispatch(setData({
            type: 'models',
            make: make.label,
            models: formData.get('models'),
            label: make.label
          }))
          return 'Kayit eklendi.'
        },
        error: (err) => err.message || 'Xeta bas verdi'
      }
    )
  }

  return(
    <Fragment>
      <div className='border-2 p-8 rounded-xl'>
        <h2 className="text-xl font-bold">Model</h2>
        <div>

          <div className="space-y-2">
            <Select 
              value={make?._id}
              onChange={(id) => {
                const selected = makes.find(item => item._id === id);
                setMake(selected);
              }}
              className="w-[256px]" 
              placeholder="Select one"
            >
              <Label>State</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {
                    makes.map(item => (
                      <ListBox.Item key={item._id} id={item._id}>
                        {item.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))
                  }
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

        </div>
        <h2 className="text-xl font-bold">Model</h2>
        <div className='mt-3 flex flex-col'>
          <div className='max-w-[300px] mt-2 flex flex-col gap-3'>
            <Label style={{ marginBottom: '-10px' }}>Model</Label>
            {
              stateModels.map((item, index) => (
                <div key={index} className='flex items-center justify-between gap-2'>
                  <input
                    value={item.name}
                    onChange={(e) => {
                      const newModels = [...stateModels]
                      newModels[index].name = e.target.value
                      setStateModels(newModels)
                    }}
                    type="text"
                    className='p-2 border rounded-lg bg-white w-full'
                    placeholder='Model'
                  />
                  <button
                    onClick={addModel}
                    className='cursor-pointer p-2 bg-blue-500 rounded-sm'
                  >
                    <Plus className='size-5 text-white' />
                  </button>
                  {
                    stateModels.length >= 2 &&
                    <button
                      onClick={() => removeModel(index)}
                      className='cursor-pointer p-2 bg-red-500 rounded-sm'
                    >
                      <Minus className='size-5 text-white' />
                    </button>
                  }
                </div>
              ))
            }

            <button
              onClick={setModelForm}
              className='w-full bg-blue-500 p-2 rounded-xl text-white mt-5 cursor-pointer'
            >
              Kaydet
            </button>

          </div>
        </div>
      </div>


      <div>
        <h2 className="text-2xl font-bold">Marka</h2>
        <table className="table-fixed border border-collapse bg-white mt-2">
          <thead>
            <tr className="border-b">
              <th className="w-[225px] border-r p-2 text-left font-medium">ID</th>
              <th className="w-[120px] border-r p-2 text-left font-medium">Logo</th>
              <th className="w-[70px] border-r p-2 text-center font-medium">Label</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            makes.map(item => (
              <MetadataList key={item._id} data={item} type={'make'} />
            ))
          }

        </table>

        <h2 className="text-2xl font-bold mt-6">Model</h2>
        <table className="table-fixed border border-collapse bg-white mt-2">
          <thead>
            <tr className="border-b">
              <th className="w-[225px] border-r p-2 text-left font-medium">ID</th>
              <th className="w-[120px] border-r p-2 text-left font-medium">Logo</th>
              <th className="w-[70px] border-r p-2 text-center font-medium">Mraka Name</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            models.map(item => (
              <MetadataList key={item._id} data={item} type={'model'} />
            ))
          }

        </table>
      </div>
    </Fragment>
  )
}