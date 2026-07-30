import { Label } from '@heroui/react';
import LibDropzone from '../../components/customs/libs/LibDropzone';
import { Fragment, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Plus} from '@gravity-ui/icons';
import {Minus} from '@gravity-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "@heroui/react";
import { createMetadata, getMetadata, setData } from '../../redux/slices/admin/adminMetadataSlice';
import MetadataList from '../list/MetadataList';

export default function MakeModel({makes, models}) {

  const dispatch = useDispatch()
  
  const [image, setImage] = useState(null)
  const handleDrop = (files) => {
    const newImage = {
      id: crypto.randomUUID(),
      url: URL.createObjectURL(files[0]),
      file: files[0]
    }
    setImage(newImage)
  }

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

  const setMakeModelForm = () => {
    if(!make?.trim()) return toast.danger('Marka adını daxil edin')
    if(!image) return toast.danger('Şəkil seçin')

    const formData = new FormData()

    formData.append('logo', image.file)
    formData.append('make', make)
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
            type: 'makes&models',
            label: make,
            models: formData.get('models')
          }))
          return 'Kayit eklendi.'
        },
        error: (err) => err.message || 'Xeta bas verdi'
      }
    )
  }


  return(
    <Fragment>
      <div className='border-2 p-8 rounded-xl col-span-2'>
        <h2 className="text-xl font-bold">Marka, Model</h2>
        <div className='mt-3 flex flex-col'>
          <Label>Marka</Label>
          <input value={make} onChange={(e) => setMake(e.target.value)} type="text" className='p-2 border rounded-lg bg-white max-w-[300px]' placeholder='Marka' />
          <div className='mt-4 w-[200px] h-[200px] relative'>
            <div className="absolute w-full">
              {
                image &&
                (
                  <div>
                    <img src={image.url} alt="Moto marka" className='w-[200px] border-2 rounded-xl cover' />

                    <button
                      onClick={() => setImage(null)}
                      className="absolute cursor-pointer top-2 right-2 flex p-2 
                          items-center justify-center rounded-full border-0 bg-red-500 shadow-sm"
                    >
                      <CloseIcon sx={{ fontSize: 16, color: 'white' }} />
                    </button>
                  </div>
                )
              }
            </div>
            <LibDropzone onDrop={handleDrop} />
          </div>

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
              onClick={setMakeModelForm}
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
            models?.map(item => (
              <MetadataList key={item._id} data={item} type={'model'} />
            ))
          }

        </table>
      </div>
    </Fragment>
  )
}