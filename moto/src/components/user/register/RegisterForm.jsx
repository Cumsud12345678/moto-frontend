import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputOTP, Label, toast } from '@heroui/react'
// import { register, registerVerify, setPhone } from '../../../redux/slices/userSlice'
// import { setAuth } from '../../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { register, registerVerify } from '../../../redux/slices/user/userSlice'

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
      return toast.danger("Name və phone boş ola bilməz")
    }

    const cleanPhone = phoneValue.replace(/\s/g, "")

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
      }, 2000)
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
            <Label>Nomre</Label>
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
      {stepRegister === 'verify' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Kodu daxil et</h2>

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

          <button
            className="w-full bg-green-500 text-white p-3 rounded mt-4"
            onClick={handleVerify}
          >
            Təsdiqlə
          </button>
        </div>
      )}

      {/* STEP 3: DONE */}
      {stepRegister === 'done' && (
        <div className="text-center">
          <h2 className="text-green-600 text-xl font-bold">
            Qeydiyyat uğurludur 🎉
          </h2>
        </div>
      )}

    </div>
  )
}