import { useEffect } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootType } from "@/reducer/store"
import { getCategories, setDefaultCategories } from "@/reducer/slices/categoriesSlice"

export default function homeCategories() {
  const router = useRouter()
  const { CategoriesSlice }  = useSelector((state: RootType) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    let {
      isError,
    } = CategoriesSlice

    if (isError) dispatch(setDefaultCategories())

  }, [CategoriesSlice])

  const renderContent = () => {
    if (CategoriesSlice?.isLoading) return renderLoader()
    if (CategoriesSlice?.errorMessage) return renderError()
    if (CategoriesSlice?.isSuccess) return renderData()
    return renderLoader()
  }

  const renderLoader = () => {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">Loading...</div>
    )
  }

  const renderError = () => {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">{CategoriesSlice.errorMessage}</div>
    )
  }

  const renderData = () => {
    return CategoriesSlice?.data?.map((item: string, index: number) => {
      return (
        <div
          key={index}
          className="w-fit h-fit flex flex-col cursor-pointer"
          onClick={() => router.push(`/product?category=${item}`)}
        >
          <Image
            src="https://cdn.shopify.com/s/files/1/1246/6441/files/Shopify_Retail_BlogHeader_Product_Samples_FA.jpg"
            alt={"category"}
            className={"w-[100px] min-w-[100px] min-h-[100px] h-[100px] object-cover rounded-md"}
            width={100}
            height={100}
            priority
          />
          <span className="mt-2 text-center text-xs">{item}</span>
        </div>
      )
    })
  }

  return (
    <div className="w-full h-fit p-10 flex flex-col">
      <h1 className="font-bold text-xl mb-4">Categories</h1>
      <div className="w-full flex flex-row gap-4 overflow-y-hidden hide-scroll">
        {renderContent()}
      </div>
    </div>
  )
}