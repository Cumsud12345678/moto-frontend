import { Label, toast } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import { updatedUser } from "../../redux/slices/user/userSlice";

export default function ProfileDialog ({open, value, img, onClose}) {

  const BASE_URL = import.meta.env.VITE_API_URL

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState(value);
  const [image, setImage] = useState(img);
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(false)

  const fileRef = useRef(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFile(file)
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSetForm = async () => {
    
    const formData = new FormData()

    if((!file && !name) || (name == value && !file)){
      return toast.warning('Deyisiklik olunmayib')
    }

    if(file){
      formData.append('profile', file)
    }

    if(name){
      formData.append('name', name)
    }

    setLoading(true)

    toast.promise(
      dispatch(updatedUser(formData)).unwrap(),
      {
        loading: 'Güncəllənir...',
        success: () => {
          setTimeout(() => {
            onClose()          // dialog-u bağla
            setLoading(false)
            navigate('/profile')
          }, 1500)
          return 'Güncəlləndi'
        },
        error: (err) => err.message || 'Bir xəta oldu'
      }
    )
  }

  return(
    <div className={`${open ? 'fixed' : 'hidden'} top-0 left-0 inset-0 bg-black/50 z-40 w-full h-full flex items-center justify-center z-[2000]`}>
      <div className={`md:max-w-[400px] w-full h-full md:h-auto bg-white md:rounded-xl p-6`}>
        <div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex items-center justify-center relative">
            <Avatar
              src={
                image
                  ? (image.startsWith('blob:')
                    ? image                              // ✅ preview üçün birbaşa istifadə et
                    : `${BASE_URL}/uploads/${image}`)    // ✅ server faylı üçün prefix əlavə et
                  : '/profile.jpg'
              }
              sx={{height: 120, width: 120, border: '2px solid gray'}}
              style={{
                cursor: 'pointer',
              }}
              onClick={() => fileRef.current.click()}
            ></Avatar>
            <div 
              onClick={() => fileRef.current.click()}
              className="absolute z-[1000] border-3 w-[120px] h-[120px] 
              rounded-full bg-black/30 flex items-center justify-center cursor-pointer"
            >
              <AddAPhotoIcon sx={{fontSize: '30px', color: 'white'}}/>
            </div>
          </div>
          
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />

          <div className="my-3">
            <Label>Adınızı dəyişin</Label>
            <input 
              type="text" 
              className="w-full p-3 border-2 rounded-xl focus:outline-sky-500"
              placeholder="Adınız"
              maxLength='50'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <div className="p-2">
              <span className="text-[14px] text-red-400">*** Adınızı 3 dəfə dəyişmə şansınız var. Ona görə adınızın düzgün yazıldığına fikir verin</span>
            </div> 
          </div>
          <div className="mt-2 fixed bottom-0 w-full p-4 left-0 md:relative md:p-0">
            <button
              onClick={handleSetForm} 
              disabled={loading}
              type="submit" 
              className="p-3 w-full bg-blue-500 text-white cursor-pointer rounded-xl"
            >
              {
                loading ? 'Güncəllənir...' : 'Yadda saxla'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
    
  )
}