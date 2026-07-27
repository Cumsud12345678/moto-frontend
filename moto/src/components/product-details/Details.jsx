import DetailsLeft from "../product-details/left/DetailsLeft";
import DetailsRight from "../product-details/right/DetailsRight";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ProductList from "../ProductList";
import { DetailsSkeleton } from "../skeletons/DetailsSkeleton";
import { HomeSkeleton } from "../skeletons/HomeSkeleton";

export default function Details({details}){

  const {
    year,
    volume,
    mileage,
    price,
    images,
    user,
    make,
    model,
    city,
    color
  } = details

  return (
    <div>

      <div className="hidden lg:flex flex-row items-center justify-between bg-gray-500 text-white rounded-lg mb-2 px-3 py-2 top-[55px] sticky z-[1000]">
        <div className="flex items-center">
          <span className="font-bold text-lg">{make.label}, {model.label}, {volume}, {year}, {mileage}</span>
        </div>
        <div>
          <span className="font-bold text-lg">{price}</span>
        </div>
      </div>

      <div className="flex gap-3 flex-col lg:flex-row">

        <DetailsLeft product={details} />
        <DetailsRight user={user} price={price} city={city.label} />

      </div>

    </div>
  )
}