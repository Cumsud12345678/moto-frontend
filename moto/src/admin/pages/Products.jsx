import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from '../list/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/slices/admin/adminProductSlice';
import { Nav } from '../customs/Nav';
import PaginationComponent from '../../components/customs/libs/LibPagination';
import { toast } from '@heroui/react';

export default function Products() {

  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [id, setId] = useState('')
  const [phone, setPhone] = useState()
  
  useEffect(() => {
    toast.promise(
      dispatch(getProducts(page)).unwrap(),
      {
        loading: 'Yüklənir...',
        success: 'Yükləndi',
        error: (err) => err.message || 'Bir xəta oldu!'
      }
    )
  }, [page])

  const manageUrlAndPage = (newPage) => {
    const params = new URLSearchParams()
    params.set('page', newPage)
    navigate(`/admin/products?${params.toString()}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlPage = Number(params.get('page')) || 1
    setPage(urlPage)
  }, [location.search])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if(id) params.set('id', id);
    if(phone) params.set('phone', phone)

    navigate(`/admin/products/search?${params.toString()}`)
  }

  const { products, total } = useSelector(s => s.adminProducts)

  return(
    <div className='flex flex-row'>
      <Nav />
      <div className="container mx-auto max-w-[1000px]">
        
        <div className='mt-20'>
          <h1 className='text-2xl font-bold'>Axtarış</h1>
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

            <button
              onClick={handleSearch}
              className='bg-blue-500 text-white rounded-xl w-1/3 cursor-pointer'
            >
              Axtar
            </button>
          </div>
        </div>
        
        <table className="w-full table-fixed border border-collapse bg-white mt-10">
          <thead>
            <tr className="border-b">
              <th className="w-[225px] border-r p-2 text-left font-medium">ID</th>
              <th className="w-[120px] border-r p-2 text-left font-medium">Created</th>
              <th className="w-[70px] border-r p-2 text-center font-medium">Price</th>
              <th className="w-[60px] border-r p-2 text-center font-medium">Volume</th>
              <th className="w-[60px] border-r p-2 text-center font-medium">Active</th>
              <th className="w-[130px] border-r p-2 text-center font-medium">Email</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            products.map(product => (
              <ProductList key={product._id} product={product} />
            ))
          }
          
        </table>

        <PaginationComponent page={page} setPage={manageUrlAndPage} totalPages={total} />
        

      </div>

    </div>
  )
}