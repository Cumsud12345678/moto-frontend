import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from '../list/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProducts } from '../../redux/slices/admin/adminProductSlice';
import { Nav } from '../customs/Nav';

export default function UserProducts() {

  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProducts(id))
  }, [])

  const { userProducts } = useSelector(s => s.adminProducts)

  return(
    <div className='flex flex-row'>
      <Nav />
      <div className="container mx-auto max-w-[1000px]">
        
        <div className='mt-20'>
          <h1 className='text-2xl font-bold'>Axtarış</h1>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 gap-4'>
            <input type="text" className='p-3 rounded-xl border bg-white focus:outline-sky-500' placeholder='ID yazin' />
            <input type="text" className='p-3 rounded-xl border bg-white focus:outline-sky-500' placeholder='Nomre yazin' />
            <input type="text" className='p-3 rounded-xl border bg-white focus:outline-sky-500' placeholder='PRID yazin' />
            <button className='bg-blue-500 text-white rounded-xl w-1/3 cursor-pointer'>
              Axtar
            </button>
          </div>
        </div>
        
        <table className="w-full table-fixed border border-collapse bg-white mt-10">
          <thead>
            <tr className="border-b">
              <th className="w-[225px] border-r p-2 text-left font-medium">ID</th>
              <th className="w-[120px] border-r p-2 text-left font-medium">Created</th>
              {/* <th className="w-[180px] border-r p-2 text-left font-medium">Photos</th> */}
              <th className="w-[70px] border-r p-2 text-center font-medium">Price</th>
              <th className="w-[60px] border-r p-2 text-center font-medium">Volume</th>
              <th className="w-[60px] border-r p-2 text-center font-medium">Active</th>
              <th className="w-[130px] border-r p-2 text-center font-medium">Email</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            userProducts.map(product => (
              <ProductList key={product._id} product={product} />
            ))
          }
          
        </table>
        

      </div>

    </div>
  )
}