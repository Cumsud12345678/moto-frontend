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
import { createAdsense, getAdsense } from '../../redux/slices/admin/adminAdsenseSlice';
import { Nav } from '../customs/Nav';
import AdsenseList from '../list/AdsenseList';

export default function Adsense({makes, models}) {

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

  const [type, setType] = useState('mobile')
  const [link, setLink] = useState('')
  const [owner, setOwner] = useState('')

  const handeTab = (value) => {
    setType(value)
  }
 
  const setMakeModelForm = () => {
    if(!link?.trim()) return toast.danger('Link daxil edin')
    if(!owner?.trim()) return toast.danger('Owner daxil edin')
    if(!image) return toast.danger('Şəkil seçin')

    const formData = new FormData()

    formData.append('position', type)
    formData.append('image', image.file)
    formData.append('link', link)
    formData.append('owner', owner)

    toast.promise(
      dispatch(createAdsense(formData)).unwrap(),
      {
        loading: 'Kayit etklenir',
        success: 'Kayit eklendi.',
        error: (err) => err.message || 'Xeta bas verdi'
      }
    )
  }

  useEffect(() => {
    dispatch(getAdsense())
  }, [])

  const {adsenseData} = useSelector(s => s.adminAdsense)

  return(
    <div className='flex flex-row'>
      <Nav />
      <div className="container mx-auto max-w-[1100px] h-[100vh] overflow-auto p-5">
        <div className="grid lg:grid-cols-3 gap-5 my-20">
        
          <div className='border-2 p-8 rounded-xl'>
            <h2 className="text-xl font-bold">Adsense</h2>
            <div className='mt-3 flex flex-col'>
              <Label>Reklam</Label>
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
                <Label style={{ marginBottom: '-10px' }}>Link</Label>

                <div className='my-4 w-[200px] flex items-center bg-[#f5f5f5] gap-2'>
                  <button
                    onClick={() => handeTab('mobile')}
                    className={`p-2 w-full rounded-lg ${type == 'mobile' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
                    Mobile
                  </button>
                  <button
                    onClick={() => handeTab('deskop_left')}
                    className={`p-2 w-full rounded-lg ${type == 'deskop-left' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
                    Deskop-Left
                  </button>
                  <button
                    onClick={() => handeTab('deskop_right')}
                    className={`p-2 w-full rounded-lg ${type == 'deskop-right' ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
                    Deskop-Right
                  </button>
                </div>

                <div className='flex items-center justify-between flex-col gap-2'>
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    type="text"
                    className='p-2 border rounded-lg bg-white w-full'
                    placeholder='Link'
                  />

                  <input
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    type="text"
                    className='p-2 border rounded-lg bg-white w-full mt-5'
                    placeholder='Owner'
                  />
                </div>

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
            <h2 className="text-2xl font-bold">Reklamlar</h2>
            <table className="table-fixed border border-collapse bg-white mt-2">
              <thead>
                <tr className="border-b">
                  <th className="w-[225px] border-r p-2 text-left font-medium">ID</th>
                  <th className="w-[120px] border-r p-2 text-left font-medium">Image</th>
                  <th className="w-[70px] border-r p-2 text-center font-medium">Link</th>
                  <th className="w-[70px] border-r p-2 text-center font-medium">Click</th>
                  <th className="w-[70px] border-r p-2 text-center font-medium">Owner</th>
                  <th className="w-[70px] border-r p-2 text-center font-medium">Position</th>
                  <th className="w-[70px] border-r p-2 text-center font-medium">createdAt</th>
                  <th className="w-[100px] p-2 text-center font-medium">Functions</th>
                </tr>
              </thead>

              {
                adsenseData?.map(product => (
                  <AdsenseList key={product._id} product={product} />
                ))
              }

            </table>
          </div>
        </div>
      </div>
    </div>
  )
}