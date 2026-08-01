import {Pencil} from '@gravity-ui/icons';
import {TrashBin} from '@gravity-ui/icons';
import { toast } from "@heroui/react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import LibAlert from '../../components/customs/libs/LibAlert';
import { IconButton, Menu, MenuItem, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useUser } from '../hooks/useUser';

export default function UserList({user}) {

  const dispatch = useDispatch()

  const {
    alertType,
    title,
    label,
    open,
    setOpen,
    updatedWarn,
    handleDeleteAlert,
    handleWarnAlert,
    handleLockAlert,
    handleUnlockAlert,
    handleResetWarningAlert,

    handleNext,

    handleDelete,
    handleWarning,
    handleLock,
    handleUnlock,
    handleResetWarning,

    updatedLock,
    removeLock
  } = useUser()

  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const handleEdit = () => {
    handleMenuClose()
    // TODO: naviqasiya ve ya edit modal
  }

  useEffect(() => {
    removeLock(user.isLock)
  }, [user.isLock])

  useEffect(() => {
    if(user.warning + updatedWarn >= 3) {
      removeLock(true)
    }
  }, [updatedWarn])

  useEffect(() => {
    if(open) {
      handleMenuClose()
    }
  }, [open])

  return(
    <Fragment>
      <tbody>
        <tr className="border-b hover:bg-gray-50">
          <td className="border-r p-2 truncate">
            {user._id}
          </td>

          <td className="border-r p-2 truncate">
            {user.createdAt}
          </td>

          <td className="border-r p-2">
            <div className="flex items-center">
              <div className="w-[45px] h-[45px] rounded-full border-2 flex-shrink-0"></div>

              <div className="ml-2 min-w-0">
                <p className="truncate text-sm">
                  {user.name}
                </p>

                <span className="text-sm">
                  {user.email}
                </span>
              </div>
            </div>
          </td>

          <td className="border-r p-2 text-center">
            <a href={`products/${user._id}`} className='text-blue-500 underline'>{user.productCount}</a>
          </td>

          <td className="border-r p-2 text-center">
            {updatedLock}
          </td>

          <td className="border-r p-2 text-center">
            {user.warning + updatedWarn}
          </td>

          <td className="border-r p-2 text-center">
            {user.role}
          </td>

          <td className="p-2">
            
            <div className="flex items-center justify-between px-5">
              <div className='flex gap-3'>
                <button onClick={handleEdit} className="bg-blue-500 p-2 rounded-full cursor-pointer">
                  <Pencil className="text-white size-5" />
                </button>
                <button onClick={handleDeleteAlert} className="bg-red-500 p-2 rounded-full cursor-pointer">
                  <TrashBin className="text-white size-5" />
                </button>
              </div>
              
              <IconButton onClick={handleMenuOpen} size="small">
                <MoreVertIcon />
              </IconButton>
 
              <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
                <MenuItem onClick={() => {
                  user.warning + updatedWarn >= 3
                  ? toast.warning('isdifadeci engellendi limite catdiniz.')
                  : handleWarnAlert()
                }}>
                  <ListItemText>Warning</ListItemText>
                </MenuItem>
 
                <MenuItem 
                  onClick={() => {
                    updatedLock == 'Beli'
                    ? toast.warning('isdifadeci engellenib')
                    : handleLockAlert()
                  }}>
                  <ListItemText>Locked</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                  updatedLock == 'Beli'
                  ? handleUnlockAlert()
                  : toast.warning('isdifadeci bloklanmayib')
                }}>
                  <ListItemText>Unlocked</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => {
                  user.warning + updatedWarn == 0
                  ? toast.warning('isdifadecinin warningi yoxdur!')
                  : handleResetWarningAlert()
                }}>
                  <ListItemText>Warning reset</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </td>
        </tr>
      </tbody>

      <LibAlert openAlert={open} setOpenAlert={setOpen} title={title} label={label} onClick={(text) => handleNext(text, user._id, user.warning)} type={alertType} />
    </Fragment>
    
  )
}