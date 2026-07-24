import Footer from "../components/Footer";
import Header from "../components/header/Header";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton";
import { deleteProduct, getMyProducts } from "../redux/slices/product/productSlice";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profile(){

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const { id } = useSelector(s => s.user)

  useEffect(() => {
    dispatch(getMyProducts(id))
  }, [])

  const {
    userProducts,
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
      <ProfileContent products={userProducts} />
      <Footer />
    </div>
  )
}