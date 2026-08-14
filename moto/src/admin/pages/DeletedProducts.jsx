import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from '../list/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedProduct, getDeletedProducts, getProducts } from '../../redux/slices/admin/adminProductSlice';
import { Nav } from '../customs/Nav';
import DeletedUserList from '../list/DeletedUserList';
import DeletedProductList from '../list/DeletedProductList';
import PaginationComponent from '../../components/customs/libs/LibPagination';
import { toast } from '@heroui/react';

export default function DeletedProducts() {

  const [page, setPage] = useState(1)
  const [isSearch, setIsSearch] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [productID, setProductID] = useState('')
  const [phone, setPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    toast.promise(
      dispatch(getDeletedProducts(page)).unwrap(),
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
    navigate(`/admin/deleted/products?${params.toString()}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if(params.get('page')){
      setIsSearch(false)
      setPage(Number(params.get('page')) || 1)
    }else if(params.get('productID') || params.get('userID') || params.get('userEmail')) {
      setIsSearch(true)
      toast.promise(
        dispatch(getDeletedProduct(location.search)).unwrap(),
        {
          loading: 'Yüklənir...',
          success: 'Yükləndi',
          error: (err) => err.message || 'Bir xəta oldu!'
        }
      )
    }
  }, [location.search])

  const setFilter = () => {
    const params = new URLSearchParams()
    if(productID) params.set('productID', productID);
    if(phone) params.set('phone', phone);
    if(userEmail) params.set('userEmail', userEmail);
    navigate(`/admin/deleted/products?${params.toString()}`)
  }

  const { deletedProducts, totalDeletedProducts, deletedProduct } = useSelector(s => s.adminProducts)

  return(
    <div className='flex flex-row'>
      <Nav />
      <div className="container mx-auto max-w-[1000px]">
        
        <div className='mt-20'>
          <h1 className='text-2xl font-bold'>Axtarış</h1>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4'>
            <input 
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
              type="text" 
              className='p-3 rounded-xl border bg-white focus:outline-sky-500' 
              placeholder='productID yazin' 
            />
            <input 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text" 
              className='p-3 rounded-xl border bg-white focus:outline-sky-500' 
              placeholder='Nomre yazin' 
            />
            <input 
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              type="text" 
              className='p-3 rounded-xl border bg-white focus:outline-sky-500' 
              placeholder='Email yazin' 
            />
            <button 
              onClick={setFilter}
              className='bg-blue-500 text-white rounded-xl w-1/3 cursor-pointer'
            >
              Axtar
            </button>
          </div>
        </div>
        
        <table className="w-full table-fixed border border-collapse bg-white mt-10">
          <thead>
            <tr className="border-b">
              <th className="w-[180px] border-r p-2 text-left font-medium">product ID</th>
              <th className="w-[120px] border-r p-2 text-left font-medium">Created</th>
              <th className="w-[180px] border-r p-2 text-left font-medium">User ID</th>
              <th className="w-[100px] border-r p-2 text-center font-medium">User Email</th>
              <th className="w-[100px] border-r p-2 text-center font-medium">Description</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {

            isSearch
              ?
              deletedProduct?.map(product => (
                <DeletedProductList key={product._id} product={product} />
              ))
              :
              deletedProducts?.map(product => (
                <DeletedProductList key={product._id} product={product} />
              ))
          }
          
        </table>

        {
          !isSearch
            && <PaginationComponent page={page} setPage={manageUrlAndPage} totalPages={totalDeletedProducts} />
        }
        

      </div>

    </div>
  )
}