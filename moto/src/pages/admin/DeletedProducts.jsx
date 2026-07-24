import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductList from './list/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedProducts, getProducts } from '../../redux/slices/admin/adminProductSlice';
import { Nav } from './customs/Nav';
import DeletedUserList from './list/DeletedUserList';
import DeletedProductList from './list/DeletedProductList';

export default function DeletedProducts() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDeletedProducts())
  }, [])

  const { deletedProducts } = useSelector(s => s.adminProducts)

  console.log(deletedProducts)

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
              <th className="w-[100px] border-r p-2 text-center font-medium">User Phone</th>
              <th className="w-[100px] border-r p-2 text-center font-medium">Description</th>
              <th className="w-[100px] p-2 text-center font-medium">Functions</th>
            </tr>
          </thead>

          {
            deletedProducts?.map(product => (
              <DeletedProductList key={product._id} product={product} />
            ))
          }
          
        </table>
        

      </div>

    </div>
  )
}