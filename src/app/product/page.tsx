import {Suspense} from "react";
import ComponentProductPage from '@/app/product/component'

const ProductPage = () => {
  return (
    <Suspense>
      <ComponentProductPage />
    </Suspense>
  )
}

export default ProductPage