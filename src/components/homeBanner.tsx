import { useEffect } from "react"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootType } from "@/reducer/store"
import { getBanner, setDefaultBanner } from "@/reducer/slices/bannerSlice"

export default function homeBanner() {
  const router = useRouter()
  const { BannerSlice }  = useSelector((state: RootType) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getBanner())
  }, [])

  useEffect(() => {
    let {
      isError,
    } = BannerSlice

    if (isError) dispatch(setDefaultBanner())

  }, [BannerSlice])

  const renderContent = () => {
    if (BannerSlice?.isLoading) return renderLoader()
    if (BannerSlice?.errorMessage) return renderError()
    if (BannerSlice?.isSuccess) return renderData()
    return renderLoader()
  }

  const renderLoader = () => {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">Loading...</div>
    )
  }

  const renderError = () => {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">{BannerSlice.errorMessage}</div>
    )
  }

  const renderData = () => {
    return (
      <>
        <div className="w-full h-full mr-10 flex flex-col justify-center gap-3">
          <h1 className="font-bold text-2xl">Welcome to Gits Commerce</h1>
          <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti eos nihil esse aut, quia dicta non expedita voluptates officiis. Odit, dolor magnam excepturi ipsa cupiditate rerum sapiente assumenda deleniti blanditiis.</span>
          <div
            className="w-fit h-fit p-2 rounded bg-blue-300 cursor-pointer"
            onClick={() => router.push('/product')}
          >Start Shopping</div>
        </div>
        <div className="w-[400px] h-full flex items-center justify-center">
          {BannerSlice?.data?.thumbnail
            ? (<Image
              src={BannerSlice.data.thumbnail}
              alt={"banner"}
              className={"w-[400px] h-[200px] object-cover rounded-md"}
              width={200}
              height={100}
              priority
            />)
            : null
          }
        </div>
      </>
    )
  }

  return (
    <div className="w-full min-h-[200px] h-fit border-b border-b-slate-600 p-10 flex flex-row items-center">
      {renderContent()}
    </div>
  )
}