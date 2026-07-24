import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import {Button, InputOTP, Label, toast} from "@heroui/react";
import { useDispatch, useSelector } from 'react-redux';
import { login, loginVerify } from '../../../redux/slices/user/userSlice';

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
      return toast.danger('Nomreni girin');
    }

    const cleanPhone = phoneValue.replace(/\s/g, "")

    if(cleanPhone.length !== 9){
      return toast.danger('Nomreni duzgun girin');
    }

    // dispatch(setPhone({type: 'loginPhone', phone: cleanPhone}))
    dispatch(login(cleanPhone))
  }


  const handleOtpChange = (value) => {
    setOtp(value)
  }

  const handleVerify = () => {
    if(!otp || otp.length !== 6){
      return toast.danger('Melumatlari doldurun');
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
      }, 2000)
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
          <label htmlFor="number">Nomreni yazin</label>
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

      {stepLogin == 'verify' && (
        <div>
          <Label>Secondary variant</Label>
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
            Dogrula
          </button>
        </div>
      )}

      {stepLogin == 'done' && (
        <div className="text-center">
          <h2 className="text-green-600 text-xl font-bold">
            Qeydiyyat uğurludur 🎉
          </h2>
        </div>
      )}
      
    </div>
  )
}