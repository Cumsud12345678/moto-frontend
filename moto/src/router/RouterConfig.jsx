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
import Cookies from "js-cookie";
import { setFavorites } from '../redux/slices/favorite/favoritesSlice'
import { checkMe } from '../redux/slices/user/userSlice'
import Auth from '../pages/Auth'

import AdminHome from '../admin/pages/Home'
import Users from '../admin/pages/Users'
import UserProducts from '../admin/pages/UserProducts'
import Products from '../admin/pages/Products'
import Metadata from '../admin/pages/Metadata'
import DeletedUsers from '../admin/pages/DeletedUsers'
import DeletedProducts from '../admin/pages/DeletedProducts'
import UserSearch from '../admin/pages/UserSearch'
import ProductSearch from '../admin/pages/ProductSearch'
import Adsense from '../admin/pages/Adsense'
import AdminRoute from './protected-route/AdminRoute'
import About from '../pages/About'
import Privacy from '../pages/Privacy'

export default function RouterConfig(){

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { isAuth, authStatus, role } = useSelector(s => s.user)

  useEffect(() => {
    if (authStatus !== 'success' || !isAuth) return

    const raw = Cookies.get('favorites')
    let favorites = []
    try {
      favorites = raw ? JSON.parse(raw) : []
    } catch (e) {
      favorites = []
    }

    if (favorites.length === 0) return

    // setFavorites tək id qəbul edir, ona görə hər birini ayrıca göndəririk
    // və YALNIZ hamısı uğurla köçürüləndən sonra cookie-ni siləcəyik
    Promise.all(favorites.map(id => dispatch(setFavorites(id)).unwrap()))
      .then(() => {
        Cookies.remove('favorites')
      })
      .catch(() => {
        // migrasiya uğursuzdursa cookie-ni saxlayırıq ki, itməsin
      })
  }, [authStatus, isAuth])

  useEffect(() => {
    dispatch(checkMe())
  }, [])

  useEffect(() => {
    if(authStatus !== 'idle'){
      setLoading(false)
    }
  }, [authStatus])

  if (loading) {
    const text = "Motoelan.com";
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex">
          {text.split('').map((char, i) => (
            <span
              key={i}
              className="text-3xl font-bold text-orange-500 animate-bounce"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    );
  } else{

    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/elanlar/:id' element={<ProductDetails />} />
        <Route path='/elanlarim/:id' element={<ProductDetails />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/new' element={isAuth ? <New /> : <Navigate to="/auth" replace />} />
        <Route path='/profile' element={isAuth ? <Profile /> : <Navigate to="/auth" replace />} />
        <Route path='/edit/product/:id' element={isAuth ? <EditProduct /> : <Navigate to="/auth" replace />} />
        <Route path='/autos' element={<Autos />} />
        <Route path='/auth' element={isAuth ? <Navigate to="/" replace /> : <Auth />} />
        <Route path='/about' element={<About />} />
        <Route path='/privacy' element={<Privacy />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<Users />} />
          <Route path="users/search" element={<UserSearch />} />
          <Route path="products" element={<Products />} />
          <Route path="products/search" element={<ProductSearch />} />
          <Route path="products/:id" element={<UserProducts />} />
          <Route path="deleted/users" element={<DeletedUsers />} />
          <Route path="deleted/products" element={<DeletedProducts />} />
          <Route path="adsense" element={<Adsense />} />
          <Route path="metadata" element={<Metadata />} />
        </Route>

      </Routes>
    )  
  }
}