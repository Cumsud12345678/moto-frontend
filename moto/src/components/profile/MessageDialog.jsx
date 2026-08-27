import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Alert} from "@heroui/react";
import React from "react";
import EmptyData from "../EmptyData";

export default function MessageDialog ({open, onClose, messages}) {

  const BASE_URL = import.meta.env.VITE_API_URL

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return(
    <div className={`${open ? 'fixed' : 'hidden'} top-0 left-0 inset-0 bg-black/50 w-full h-full flex items-center justify-center z-2000`}>
      <div className={`md:max-w-125 w-full h-full md:h-auto bg-[#f5f5f5] md:rounded-xl md:p-6 p-3`}>
        <div>
          <div className="flex items-center justify-between">
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <h4 className="text-xl font-semibold">Mesajlar</h4>
            <span className="p-4"></span>
          </div>
          
        </div>
        <div className="w-full flex flex-col mt-3 gap-3">
          {
            messages.length == 0 &&
            <div className="">
              <EmptyData />
            </div>
          }
          {
            messages.map(message => (
              <Alert status={message.status}>
                <Alert.Indicator />
                <Alert.Content>
                  {/* <Alert.Title>Update available</Alert.Title> */}
                  <Alert.Description>
                    {message.message}
                  </Alert.Description>
                </Alert.Content>
              </Alert>
            ))
          }
        </div>
      </div>
    </div>
  )
}