import Box from '@mui/material/Box'
import ProductCard from './ProductCard'
import { useSelector, useDispatch } from 'react-redux'
import { Container } from '@mui/material'

export default function ProductList({ products, topMob, topDes }){
  
  return(
    <Box sx={{ marginTop: { xs: topMob, lg: topDes } }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2 lg:mt-2">
      {
        products.map((p) => (
          <ProductCard product={p} key={p._id} />
        ))
      }
    </Box>
  )
}