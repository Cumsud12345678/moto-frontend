import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import {Pencil} from '@gravity-ui/icons';
import {TrashBin} from '@gravity-ui/icons';
import { useEffect, useState } from 'react';
import UserList from './list/UserList';
import { toast } from "@heroui/react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/slices/admin/adminUserSlice';
import { Nav } from './customs/Nav';
import { useLocation, useNavigate } from 'react-router-dom';
import PaginationComponent from './customs/Pagination';

export default function Users() {

  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [userId, setUserId] = useState('')
  const [phone, setPhone] = useState('')
  
  useEffect(() => {
    dispatch(getUsers(page))
  }, [page])

  const manageUrlAndPage = (newPage) => {
    const params = new URLSearchParams()
    params.set('page', newPage)
    navigate(`/admin/users?${params.toString()}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlPage = Number(params.get('page')) || 1
    setPage(urlPage)
  }, [location.search])

  const {
    users,
    total
  } = useSelector(s => s.adminUsers)

  const handleSearch = () => {
    const params = new URLSearchParams()

    if(userId) {
      params.set('userId', userId)
    }else if(phone) {
      params.set('phone', phone)
    }

    navigate(`/admin/users/search?${params.toString()}`)
  }

  return(
    <div className='flex flex-row'>
      <Nav />
      <div className="container mx-auto max-w-[1000px]">
        
        <div className='mt-20'>
          <h1 className='text-2xl font-bold'>Axdaris</h1>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4'>
            <input 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              type="text" className='p-3 rounded-xl border bg-white focus:outline-sky-500' 
              placeholder='ID yazin' 
            />

            <input 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text" 
              className='p-3 rounded-xl border bg-white focus:outline-sky-500' 
              placeholder='Nomre yazin' 
            />

            <button 
              onClick={handleSearch}
              className='bg-blue-500 text-white rounded-xl w-1/3 cursor-pointer'
            >
              Axdar
            </button>
          </div>
        </div>
        
        <table className="w-full table-fixed border border-collapse bg-white mt-10">
          <thead>
            <tr className="border-b">
              <th className="w-[225px] border-r p-2 text-left font-medium">ID</th>
              <th className="w-[120px] border-r p-2 text-left font-medium">Created</th>
              <th className="w-[180px] border-r p-2 text-left font-medium">User details</th>
              <th className="w-[70px] border-r p-2 text-center font-medium">Total pr.</th>
              <th className="w-[60px] border-r p-2 text-center font-medium">Lock</th>
              <th className="w-[60px] border-r p-2 text-center font-medium">Warn</th>
              <th className="w-[80px] border-r p-2 text-center font-medium">Role</th>
              <th className="w-[200px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            users.map(user => (
              <UserList key={user._id} user={user} />
            ))
          }
          
        </table>

        <PaginationComponent page={page} setPage={manageUrlAndPage} totalPages={total} />
        

      </div>

    </div>
  )
}