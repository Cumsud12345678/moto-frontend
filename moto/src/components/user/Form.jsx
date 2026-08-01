import { useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"
import {Tabs} from "@heroui/react";
import LoginForm from './login/LoginForm';
import RegisterForm from './register/RegisterForm';
import { useDispatch } from 'react-redux';
import { resetForm } from '../../redux/slices/user/userSlice';

export default function Form () {

  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleTabChange = () => {
    dispatch(resetForm())
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
            <LoginForm />
          </Tabs.Panel>
          <Tabs.Panel className="pt-4" id="analytics">
            <RegisterForm />
          </Tabs.Panel>
        </Tabs>
        
      </div>
    </div>
  )
}