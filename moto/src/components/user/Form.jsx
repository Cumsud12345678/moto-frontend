import { useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"
import {Tabs} from "@heroui/react";
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';

export default function Form () {

  const location = useLocation()
  const navigate = useNavigate()

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, "").slice(0, 9);

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
    if (numbers.length <= 7) return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5)}`;

    return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7)}`;
  };

  const handleTabChange = () => {
    if(location.hash){
      navigate(-1)
    }
  }
  
  return(
    <div className='h-[100vh] w-full flex items-center justify-center bg-[#f5f5f5]'>
      <div className='w-full max-w-[400px] bg-white rounded-lg p-5'>

        <Tabs className="w-full" onSelectionChange={handleTabChange}>
          <Tabs.ListContainer>
            <Tabs.List aria-label="Options">
              <Tabs.Tab id="overview">
                Daxil ol
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="analytics">
                Üzv ol
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
          <Tabs.Panel className="pt-4" id="overview">
            <LoginForm formatPhone={formatPhone} />
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="analytics">
            <RegisterForm formatPhone={formatPhone} />
          </Tabs.Panel>
        </Tabs>
        
      </div>
    </div>
  )
}