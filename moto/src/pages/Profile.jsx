import Footer from "../components/Footer";
import Header from "../components/header/Header";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import { getMyActiveProducts, getMyDeactiveProducts, getMyProducts } from "../redux/slices/product/productSlice";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profile(){

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const { id } = useSelector(s => s.user)

  useEffect(() => {
    dispatch(getMyProducts(id))
    dispatch(getMyActiveProducts(id))
    dispatch(getMyDeactiveProducts(id))
  }, [])

  const {
    userProducts,
    userActiveProducts,
    userDeactiveProducts,
    userStatus,
    message
  } = useSelector(s=> s.product)

  useEffect(() => {
    if(userStatus !== 'idle') {
      setLoading(false)
    }
  }, [userStatus])

  if(loading){
    return(
      <div>
        <Header />
        <ProfileSkeleton />
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <ProfileContent products={userProducts} activeProducts={userActiveProducts} deactiveProducts={userDeactiveProducts} />
      <Footer />
    </div>
  )
}