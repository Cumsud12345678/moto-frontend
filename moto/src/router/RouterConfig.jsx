import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Bookmarks from '../pages/Bookmarks'
import New from '../pages/New'
import Profile from '../pages/Profile'
import EditProduct from '../pages/EditProduct'
import Autos from '../pages/Autos'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Test from '../components/test/Test'
import Test2 from '../components/test/Test2'
import Cookies from "js-cookie";
import { setFavorites } from '../redux/slices/favorite/favoritesSlice'
import { checkMe } from '../redux/slices/user/userSlice'
import Register from '../pages/Register'


import AdminHome from '../pages/admin/Home'
import Users from '../pages/admin/Users'
import UserProducts from '../pages/admin/UserProducts'
import Products from '../pages/admin/Products'
import Metadata from '../pages/admin/Metadata'
import DeletedUsers from '../pages/admin/DeletedUsers'
import DeletedProducts from '../pages/admin/DeletedProducts'
import UserSearch from '../pages/admin/UserSearch'
import ProductSearch from '../pages/admin/ProductSearch'

export default function RouterConfig(){

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { isAuth, authStatus, role } = useSelector(s => s.user)

  useEffect(() => {
    const raw = Cookies.get('favorites')
    let favorites = []
    try {
      favorites = raw ? JSON.parse(raw) : []
    } catch (e) {
      favorites = []
    }

    if (authStatus === 'success' && isAuth) {
      if (favorites.length > 0) {
        dispatch(setFavorites(favorites))
        Cookies.remove('favorites')
      }
    }
  }, [authStatus])

  useEffect(() => {
    dispatch(checkMe())
  }, [isAuth])

  useEffect(() => {
    if(authStatus !== 'idle'){
      setLoading(false)
    }
  }, [authStatus])

  if(loading){
    return <div className='fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'><span>Loading...</span></div>
  }else{

    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/elanlar/:id' element={<ProductDetails />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/new' element={isAuth ? <New /> : <Navigate to="/register" replace />} />
        <Route path='/profile' element={isAuth ? <Profile /> : <Navigate to="/register" replace />} />
        <Route path='/edit/product/:id' element={isAuth ? <EditProduct /> : <Navigate to="/register" replace />} />
        <Route path='/autos' element={<Autos />} />
        <Route path='/register' element={<Register />} />

        {/* Buralar qorunmalidir */}
        <Route path='/admin' element={<AdminHome />}/>
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/users/search' element={<UserSearch />} />
        <Route path='/admin/products/:id' element={<UserProducts />} />
        <Route path='/admin/products' element={<Products />} />
        <Route path='/admin/products/search' element={<ProductSearch />} />
        <Route path='/admin/deleted/users' element={<DeletedUsers />} />
        <Route path='/admin/deleted/products' element={<DeletedProducts />} />
        <Route path='/admin/metadata' element={<Metadata />} />

        {/* <Route path='/' element={<Test2 />} /> */}
      </Routes>
    )  
  }
}