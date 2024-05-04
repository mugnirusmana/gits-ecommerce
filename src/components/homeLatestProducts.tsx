import Image from "next/image"
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon
} from "@heroicons/react/24/solid"

import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootType } from "@/reducer/store"
import { getProducts, setDefaultProducts } from "@/reducer/slices/productsSlice"
import { useEffect } from "react"

export default function homeLatestProducts() {
  const router = useRouter()
  const { ProductsSlice }  = useSelector((state: RootType) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    let params = {
      skip: 0,
      limit: 10
    }
    dispatch(getProducts(params))
  }, [])

  useEffect(() => {
    let {
      isError,
    } = ProductsSlice

    if (isError) dispatch(setDefaultProducts())

  }, [ProductsSlice])

  const renderAction = () => {
    return ProductsSlice?.isSuccess ? (
      <div className="flex flex-row gap-4">
          <div className="w-[40px] h-[30px] border border-slate-300 rounded flex items-center justify-center">
            <ArrowLeftCircleIcon className="h-5 w-5"/>
          </div>
          <div className="w-[40px] h-[30px] border border-slate-300 rounded flex items-center justify-center">
            <ArrowRightCircleIcon className="h-5 w-5"/>
          </div>
        </div>
    ) : null
  }

  const renderContent = () => {
    if (ProductsSlice?.isLoading) return renderLoader()
    if (ProductsSlice?.errorMessage) return renderError()
    if (ProductsSlice?.isSuccess) return renderData()
    return renderLoader()
  }

  const renderLoader = () => {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">Loading...</div>
    )
  }

  const renderError = () => {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">{ProductsSlice.errorMessage}</div>
    )
  }

  const renderData = () => {
    return (
      <div className="w-full flex flex-row gap-10 overflow-y-hidden hide-scroll">
        {ProductsSlice?.data?.products
          ? ProductsSlice?.data?.products?.map((item: any, key: number) => {
            return (
              <div
                key={key}
                className="w-[200px] min-w-[200px] max-w-[200px] h-fit bg-red flex flex-col rounded border border-slate-200 p-2 bg-slate-100 cursor-pointer"
                onClick={() => router.push(`/product/${item.id}`)}
              >
                <Image
                  src={item.thumbnail}
                  alt={"banner"}
                  className={"w-[200px] h-[150px] object-cover rounded-md"}
                  width={200}
                  height={100}
                  priority
                />
                <div className="w-full flex flex-row items-center">
                  <span className="mt-2 text-wrap w-full text-sm text-ellipsis">{item.title}</span>
                  <span className="mt-2 text-nowrap text-xs">${item.price}</span>
                </div>
              </div>
            )
          }) : renderNotData()}
      </div>
    )
  }

  const renderNotData = () => {
    return <span>No Product Found</span>
  }

  return (
    <div className="w-full h-fit p-10 flex flex-col">
      <div className="flex flex-row items-center mb-4 gap-4">
        <h1 className="font-bold text-xl w-full">Latest Product</h1>
        {renderAction()}
      </div>
      {renderContent()}
    </div>
  )
}