import { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../../redux/slices/product/productSlice"

export const useCursorBasedPagination = () => {

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const {
    productsStatus,
    productsPage,
    productsHasMore
  } = useSelector(s => s.product)

  const observerRef = useRef(null)
  const lastProductRef = useCallback((node) => {
    if (loading || loadingMore) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && productsHasMore) {
        setLoadingMore(true)
        dispatch(getAllProducts(productsPage + 1)).finally(() => setLoadingMore(false))
      }
    })

    if (node) observerRef.current.observe(node)
  }, [loading, loadingMore, productsHasMore, productsPage])

  useEffect(() => {
    if(productsStatus !== 'idle'){
      setLoading(false)
    }
  }, [productsStatus])

  return {
    loading,
    setLoading,
    lastProductRef,
    loadingMore
  }

}