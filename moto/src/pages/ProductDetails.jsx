import DetailsLeft from "../components/product-details/left/DetailsLeft";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useParams } from "react-router-dom";
import DetailsRight from "../components/product-details/right/DetailsRight";
import Header from "../components/header/Header";
import ProductList from "../components/ProductList";
import { DetailsSkeleton } from "../components/skeletons/DetailsSkeleton";
import Details from "../components/product-details/Details";
import { toast } from "@heroui/react";
import { getProductDetails, getSimilarProducts } from "../redux/slices/product/productSlice";
import { HomeSkeleton } from "../components/skeletons/HomeSkeleton";

export default function ProductDetails(){

  const { id } = useParams()
  const dispatch = useDispatch()

  // hansi id ucun similar mehsullarin artiq cekildiyini izleyirik
  const [similarsLoadedFor, setSimilarsLoadedFor] = useState('')

  const {
    selectedProduct,
    detailsStatus,
    message,
    similarProducts,
    similarStatus
  } = useSelector(s => s.product)

  // DETAYLARI VE SIMILARS I CAQIR
  useEffect(() => {
    if(!(selectedProduct && selectedProduct._id == id)){
      dispatch(getProductDetails(id))
    }
    if(similarsLoadedFor !== id){
      dispatch(getSimilarProducts(id))
      setSimilarsLoadedFor(id)
    }
  }, [id])

  // ERRORU YAZDIR
  useEffect(() => {
    if(message) toast.danger(message)
  }, [message])

  // loading-i state-den deyil, birbasa id ile selectedProduct-un uygunlugundan
  // hesabliyiriq ki, id deyisende kohne mehsul bir an ekranda qalmasin
  const loadingDetails = detailsStatus === 'loading' || !selectedProduct || selectedProduct._id != id
  const loadingSimilars = similarStatus === 'loading' || similarsLoadedFor !== id
    
  return (
    <div className="container mx-auto max-w-[1000px]">
      <Header dur={true} />

      {
        loadingDetails
          ? <DetailsSkeleton /> 
          : <Details details={selectedProduct} />
      }

      <div className="mt-5 px-4">
        <h4>Oxsar mehsullar</h4>
        {
          loadingSimilars
            ?
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2 lg:mt-3">
              {
                [...Array(8)].map((_, index) => (
                  <HomeSkeleton key={index} />
                ))
              }
            </div>
            :
            similarProducts.length == 0
              ? 'Urun tapilmadi'
              : <ProductList products={similarProducts} topMob={'0px'} topDes={'0px'} />
        }
      </div>

    </div>
  )
}