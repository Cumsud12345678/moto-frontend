import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputOTP, Label, toast } from '@heroui/react'
import { useNavigate } from 'react-router-dom'
import { register, registerVerify } from '../../../redux/slices/user/userSlice'
import {SealCheck} from '@gravity-ui/icons';

export default function RegisterForm({ formatPhone }) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const {
    stepRegister,

    registerMessage,
    registerStatus
  } = useSelector(s => s.user)

  const [nameValue, setNameValue] = useState("")
  const [phoneValue, setPhoneValue] = useState("")
  const [otp, setOtp] = useState("")

  // PHONE FORMAT
  const handlePhone = (value) => {
    setPhoneValue(formatPhone(value))
  }

  // REGISTER START
  const handleRegisterStart = () => {
    if (!nameValue || !phoneValue) {
      return toast.warning("Ad və Nömrə boş ola bilməz")
    }

    const cleanPhone = phoneValue.replace(/\s/g, "")

    if(cleanPhone.length !== 9) {
      return toast.warning('Nömrəni düzgün girin')
    }

    dispatch(register({
      name: nameValue,
      phone: cleanPhone
    }))
  }

  // OTP CHANGE
  const handleOtpChange = (value) => {
    setOtp(value)
  }

  // VERIFY OTP
  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.danger("6 rəqəmli kod daxil et")
      return
    }

    dispatch(registerVerify({
      phone: phoneValue.replace(/\s/g, ""),
      otp
    }))
  }

  // SUCCESS / ERROR MESSAGE
  useEffect(() => {
    if (registerMessage) {
      if (stepRegister === 'verify' && registerStatus == 'loading') toast.success(registerMessage)
      else if(stepRegister === 'verify' && registerStatus == 'error') toast.danger(registerMessage)
      else toast.danger(registerMessage)
    }
  }, [registerMessage])

  useEffect(() => {
    if(stepRegister == 'done'){
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [stepRegister])


  useEffect(() => {
    if(registerStatus == 'loading'){
      setLoading(true)
    }else {
      setLoading(false)
    }
  }, [registerStatus])

  return (
    <div className="max-w-md mx-auto">

      {/* STEP 1: REGISTER */}
      {stepRegister === 'register' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Qeydiyyat</h2>

          <div>
            <Label>Ad</Label>
            <input
              className='border-2 w-full rounded-2xl p-3 bg-[#f5f5f5]' placeholder='77 513 14 06'
              placeholder="Name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
          </div>
          
          <div className='my-3'>
            <Label>Nömrə</Label>
            <input
              className='border-2 w-full rounded-2xl p-3 bg-[#f5f5f5]' 
              placeholder='77 513 14 06'
              inputMode="numeric"
              value={phoneValue}
              onChange={(e) => handlePhone(e.target.value)}
            />
          </div>
          

          <button
            className="w-full bg-blue-500 text-white p-3 rounded cursor-pointer"
            onClick={handleRegisterStart}
          >
            {loading ? "Göndərilir..." : "Kod göndər"}
          </button>
        </div>
      )}



      {/* STEP 2: VERIFY */}
      {(stepRegister === 'verify' || stepRegister === 'done') && (
        <div>
          <h2 className="text-xl font-bold mb-2">OTP Verification</h2>
          <span className='text-muted'>Telefon nömrənizə göndərilən doğrulama kodun daxil edin.</span>

          <InputOTP
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            variant="secondary" 
            className='flex w-full mt-2'
          >
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP>

          <div onClick={handleRegisterStart} className="mt-3">
            <span className='cursor-pointer'>Tekrar göndər</span>
          </div>

          <button
            className={
              `w-full p-3 rounded-lg mt-4 border 
              ${otp.length == 6 ? 'bg-[#8b5cf6] cursor-pointer text-white font-bold' : 'bg-gray-200'}`
            }
            onClick={handleVerify}
            disabled={!otp.length == 6}
          >
            Təsdiqlə
          </button>
        </div>
      )}

      {/* STEP 3: DONE */}
      {stepRegister === 'done' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
          <div className="p-3 flex items-center bg-white/20 backdrop-blur-lg gap-2 rounded-xl">
            <SealCheck className='size-8 text-green-500' />
            <span className='text-lg font-bold'>Qeydiyyar uğurlu</span>
          </div>  
        </div>
      )}

    </div>
  )
}