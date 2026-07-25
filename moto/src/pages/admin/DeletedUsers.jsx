import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from './list/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/admin/adminProductSlice';
import { Nav } from './customs/Nav';
import { getDeletedUsers } from '../../redux/slices/admin/adminUserSlice';
import DeletedUserList from './list/DeletedUserList';
import PaginationComponent from './customs/Pagination';

export default function DeletedUsers() {

  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(getDeletedUsers(page))
  }, [page])

  const manageUrlAndPage = (newPage) => {
    const params = new URLSearchParams()
    params.set('page', newPage)
    navigate(`/admin/deleted/users?${params.toString()}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlPage = Number(params.get('page')) || 1
    setPage(urlPage)
  }, [location.search])

  const { deletedUsers, totalDeletedUsers } = useSelector(s => s.adminUsers)

  return(
    <div className='flex flex-row'>
      <Nav />
      <div className="container mx-auto max-w-[1000px]">
        
        <div className='mt-20'>
          <h1 className='text-2xl font-bold'>Axdaris</h1>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4'>
            <input type="text" className='p-3 rounded-xl border bg-white focus:outline-sky-500' placeholder='ID yazin' />
            <input type="text" className='p-3 rounded-xl border bg-white focus:outline-sky-500' placeholder='Nomre yazin' />
            <input type="text" className='p-3 rounded-xl border bg-white focus:outline-sky-500' placeholder='PRID yazin' />
            <button className='bg-blue-500 text-white rounded-xl w-1/3 cursor-pointer'>
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
              <th className="w-[70px] border-r p-2 text-center font-medium">Phone</th>
              <th className="w-[100px] border-r p-2 text-center font-medium">Description</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            deletedUsers?.map(product => (
              <DeletedUserList key={product._id} user={product} />
            ))
          }
          
        </table>

        <PaginationComponent page={page} setPage={manageUrlAndPage} totalPages={totalDeletedUsers} />
        

      </div>

    </div>
  )
}