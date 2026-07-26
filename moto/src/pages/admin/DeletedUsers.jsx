import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from './list/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/admin/adminProductSlice';
import { Nav } from './customs/Nav';
import { getDeletedUser, getDeletedUsers } from '../../redux/slices/admin/adminUserSlice';
import DeletedUserList from './list/DeletedUserList';
import PaginationComponent from './customs/Pagination';
import { toast } from '@heroui/react';

export default function DeletedUsers() {

  const [page, setPage] = useState(1)

  const [id, setId] = useState('')
  const [phone, setPhone] = useState('')
  const [userId, setUserId] = useState('')
  const [isSearch, setIsSearch] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    toast.promise(
      dispatch(getDeletedUsers(page)).unwrap(),
      {
        loading: 'Yuklenir...',
        success: 'Yuklendi',
        error: (err) => err.message || 'Bir xeta oldu!'
      }
    )
  }, [page])

  const manageUrlAndPage = (newPage) => {
    const params = new URLSearchParams()
    params.set('page', newPage)
    navigate(`/admin/deleted/users?${params.toString()}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if(params.get('page')){
      setIsSearch(false)
      const urlPage = Number(params.get('page')) || 1
      setPage(urlPage)
    }else if(params.get('id') || params.get('phone') || params.get('userId')) {
      setIsSearch(true)
      toast.promise(
        dispatch(getDeletedUser(location.search)).unwrap(),
        {
          loading: 'Yuklenir...',
          success: 'Yuklendi',
          error: (err) => err.message || 'Bir xeta oldu!'
        }
      )
    }
  }, [location.search])

  const setFilter = () => {
    const params = new URLSearchParams()
    if(id) params.set('id', id);
    if(userId) params.set('userId', userId);
    if(phone) params.set('phone', phone);
    navigate(`/admin/deleted/users?${params.toString()}`)
  }

  const { deletedUsers, totalDeletedUsers, deletedUser } = useSelector(s => s.adminUsers)

  return(
    <div className='flex flex-row'>
      <Nav />
      <div className="container mx-auto max-w-[1000px]">
        
        <div className='mt-20'>
          <h1 className='text-2xl font-bold'>Axdaris</h1>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4'>
            <input 
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="text" 
              className='p-3 rounded-xl border bg-white focus:outline-sky-500'
              placeholder='ID yazin' 
            />

            <input 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text" 
              className='p-3 rounded-xl border bg-white focus:outline-sky-500' 
              placeholder='Nomre yazin' 
            />

            <input 
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              type="text" 
              className='p-3 rounded-xl border bg-white focus:outline-sky-500' 
              placeholder='userID yazin' 
            />
            <button 
              onClick={setFilter}
              className='bg-blue-500 text-white rounded-xl w-1/3 cursor-pointer'
            >
              Axdar
            </button>
          </div>
        </div>
        
        <table className="w-full table-fixed border border-collapse bg-white mt-10">
          <thead>
            <tr className="border-b">
              <th className="w-[180px] border-r p-2 text-left font-medium">ID</th>
              <th className="w-[120px] border-r p-2 text-left font-medium">Created</th>
              <th className="w-[180px] border-r p-2 text-left font-medium">User ID</th>
              <th className="w-[100px] border-r p-2 text-center font-medium">Phone</th>
              <th className="w-[100px] border-r p-2 text-center font-medium">Description</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            isSearch
              ? 
              deletedUser?.map(product => (
                <DeletedUserList key={product._id} user={product} />
              ))
              :
              deletedUsers?.map(product => (
                <DeletedUserList key={product._id} user={product} />
              ))
          }
          
        </table>

        {
          !isSearch
            && <PaginationComponent page={page} setPage={manageUrlAndPage} totalPages={totalDeletedUsers} />
        }

        
      </div>

    </div>
  )
}