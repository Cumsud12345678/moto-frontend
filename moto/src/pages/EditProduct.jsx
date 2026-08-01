import { useEffect } from "react";
import Form from "../components/update-product/Form";
import { useProduct } from "../components/update-product/hooks/useProduct";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMetadata } from "../redux/slices/metadata/metadataSlice";
import { getProductDetails } from "../redux/slices/product/productSlice";

export default function EditProduct(){
  
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    console.log('1')
    dispatch(getMetadata())
    dispatch(getProductDetails(id))
  }, [])

  const product = useProduct()

  return(
    <div className='flex flex-col w-full lg:mt-30 lg:container mx-auto lg:max-w-[750px]'>
      <Form product={product} />
    </div>
  )
}