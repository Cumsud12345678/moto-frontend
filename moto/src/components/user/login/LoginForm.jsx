import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {Button, InputOTP, Label, toast} from "@heroui/react";
import { useDispatch, useSelector } from 'react-redux';
import { login, loginVerify } from '../../../redux/slices/user/userSlice';
import {SealCheck} from '@gravity-ui/icons';

export default function LoginForm({formatPhone}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const {
    stepLogin,
    loginMessage,
    loginStatus
  } = useSelector(s => s.user)

  const [phoneValue, setPhoneValue] = useState('')
  const [otp, setOtp] = useState()
  
  // PHONE FORMAT
  const inputChange = (value) => {
    setPhoneValue(formatPhone(value));
  };

  const handleLogin = () => {
    if(!phoneValue){
      return toast.warning('Nömrəni girin');
    }

    const cleanPhone = phoneValue.replace(/\s/g, "")

    if(cleanPhone.length !== 9){
      return toast.danger('Nömrəni düzgün girin');
    }

    // dispatch(setPhone({type: 'loginPhone', phone: cleanPhone}))
    dispatch(login(cleanPhone))
  }


  const handleOtpChange = (value) => {
    setOtp(value)
  }

  const handleVerify = () => {
    if(!otp || otp.length !== 6){
      return toast.danger('Məlumatları doldurun');
    }

    dispatch(loginVerify({otp: otp, phone: phoneValue.replace(/\s/g, "")}))
  }

  useEffect(() => {
    if (loginMessage) {
      if (stepLogin === 'verify' && loginStatus == 'loading') toast.success(loginMessage)
      else if(stepLogin === 'verify' && loginStatus == 'error') toast.danger(loginMessage)
      else toast.danger(loginMessage)
      // setTimeout(() => {
      //   dispatch(resetMessage())
      // }, 2000)
    }
  }, [loginMessage])

  useEffect(() => {
    if(stepLogin == 'done'){
      // dispatch(setAuth({isAuth: true, id: id, name: name, phone: phone}))
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }, [stepLogin])


  useEffect(() => {
    if(loginStatus == 'loading'){
      setLoading(true)
    }else {
      setLoading(false)
    }
  }, [loginStatus])
 
  return(
    <div>
      {stepLogin == 'login' && (
        <div>
          <label htmlFor="number">Nömrəni yazın</label>
          <input
            onChange={(e) => inputChange(e.target.value)}
            id='number'
            type="text"
            inputMode="numeric"
            value={phoneValue}
            className='border-2 w-full rounded-2xl p-3 bg-[#f5f5f5]' placeholder='77 513 14 06'
          />

          <button
            onClick={handleLogin}
            className='w-full bg-blue-500 text-white p-3 rounded-xl cursor-pointer mt-4'
          >
            {loading ? "Göndərilir..." : "Kod göndər"}
          </button>
        </div>
      )}

      {(stepLogin === 'verify' || stepLogin === 'done') && (
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
          <button
            onClick={handleVerify}
            className='w-full bg-blue-500 text-white p-2.5 rounded-xl cursor-pointer mt-6'
          >
            Doğrula
          </button>
        </div>
      )}

      {/* STEP 3: DONE */}
      {stepLogin === 'done' && (
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