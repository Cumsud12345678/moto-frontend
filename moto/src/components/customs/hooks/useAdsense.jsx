import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clickAdsense, getAdsense } from "../../../redux/slices/admin/adminAdsenseSlice"


export const useAdsense = () => {

  const dispatch = useDispatch()

  const [mobileAdsense, setMobileAdsense] = useState([])
  const [deskopLeftAdsense, setDeskopLeftAdsense] = useState([])
  const [deskopRightAdsense, setDeskopRightAdsense] = useState([])

  const {
    adsenseData,
    clickStatus
  } = useSelector(s => s.adminAdsense)

  useEffect(() => {
    if(adsenseData.length > 0) {
      setMobileAdsense(adsenseData.filter(ads => ads.position === 'mobile'))
      setDeskopLeftAdsense(adsenseData.filter(ads => ads.position === 'deskop_left'))
      setDeskopRightAdsense(adsenseData.filter(ads => ads.position === 'deskop_right'))
    }
  }, [adsenseData])

  useEffect(() => {
    dispatch(getAdsense())
  }, [])

  const handleAdsClick = async (id, link) => {
    dispatch(clickAdsense(id))
    if (clickStatus === 'success') {
      window.open(
        `https://${link}`,
        "_blank",
        "noopener,noreferrer"
      )
    }
  }

  return {
    mobileAdsense,
    handleAdsClick,
    deskopLeftAdsense,
    deskopRightAdsense
  }

}