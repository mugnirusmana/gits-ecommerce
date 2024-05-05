'use client'

import Header from '@/components/header'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from "next/image"

import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootType } from "@/reducer/store"
import { getProductDetail, setDefaultProductDetail } from "@/reducer/slices/productDetailSlice"
import { addToCart, setDefaultCart } from "@/reducer/slices/cartSlice"

interface popupType {
  isShow: boolean,
  message?: string | null
}

export default function ProductDetail({ params }: { params: { id?: string } }) {
  const [popup, setPopUp] = useState<popupType>({
    isShow: false,
    message: ''
  })
  const listColorProduct = [
    {
      title: 'White',
      class: 'bg-white'
    },
    {
      title: 'Black',
      class: 'bg-black'
    },
    {
      title: 'Red',
      class: 'bg-red-500'
    },
    {
      title: 'Green',
      class: 'bg-green-500'
    },
    {
      title: 'Blue',
      class: 'bg-blue-500'
    }
  ]
  const listSpecProduct = ['Low', 'Mid', 'High', 'Ultra']
  const listSizeProduct = ['S', 'M', 'L', 'XL']
  const [selectColor, setSelectColor] = useState<string | null>('')
  const [selectSpec, setSelectSpec] = useState<string | null>('')
  const [selectSize, setSelectSize] = useState<string | null>('')
  const [activeImage, setActiveImage] = useState<string>('')
  const { id }: {id?: string | null} = params
  const router = useRouter()
  const path = usePathname()
  const { ProductDetailSlice, CartSlice, AuthSlice }  = useSelector((state: RootType) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id))
    } else {
      setPopUp({
        isShow: true,
        message: 'Product Not Found'
      })
    }
  }, [])

  useEffect(() => {
    let {
      isError,
      errorMessage
    } = ProductDetailSlice

    if (isError) {
      setPopUp({
        isShow: true,
        message: errorMessage
      })
      dispatch(setDefaultProductDetail())
    }

    if (ProductDetailSlice.isSuccess) {
      setActiveImage(ProductDetailSlice.data?.thumbnail)
    }

  }, [ProductDetailSlice])

  useEffect(() => {
    let {
      isSuccess,
      isError,
      errorMessage
    } = CartSlice

    if (isError) {
      setPopUp({
        isShow: true,
        message: errorMessage
      })
      dispatch(setDefaultCart())
    }

    if (isSuccess) {
      dispatch(setDefaultCart())
      router.push('/cart')
    }
  }, [CartSlice])

  const renderPopUp = () => {
    if (popup?.isShow) {
      return (
        <div className='w-screen h-screen absolute top-0 left-0 flex items-center justify-center backdrop-blur-md'>
          <div className='w-[320px] h-[150px] rounded bg-white border border-slate-300 flex flex-col items-center justify-center p-5 gap-3'>
            <span className='font-bold'>Product Detail</span>
            <span className='h-full text-sm'>{popup?.message}</span>
            <div
              className='w-full flex flex-row items-center justify-center py-1 px-2 rounded bg-blue-300 text-white text-sm cursor-pointer'
              onClick={() => {
                setPopUp({
                  isShow: false,
                  message: ''
                })
                setTimeout(() => {
                  router.push('/product')
                }, 300)
              }}
            >Close</div>
          </div>
        </div>
      )
    }
    return null
  }

  const renderContent = () => {
    if (ProductDetailSlice?.isLoading) return renderLoader()
    if (ProductDetailSlice?.isSuccess) return renderData()
    return renderLoader()
  }

  const renderLoader = () => {
    return (
      <div className='w-full flex items-center justify-center'>Loading...</div>
    )
  }

  const renderData = () => {
    return (
      <div className='w-full h-full flex flex-col tablet:flex-row gap-10'>
        <div className='w-full tablet:w-1/2 h-ful flex flex-col gap-5'>
          <div className='w-full h-[400px] flex flex-row'>
            <Image
              src={activeImage}
              alt={"product-detail"}
              className={"w-full min-w-full min-h-full h-full object-cover rounded-md border border-slate-200"}
              width={100}
              height={100}
              priority
            />
          </div>
          <div className='w-full h-[100px] flex flex-row overflow-y-hidden hide-scroll gap-5'>
            {renderOtherImages()}
          </div>
        </div>
        <div className='w-full tablet:w-1/2 h-full flex flex-col gap-10 pb-10'>
          <span className='font-bold text-xl'>{ProductDetailSlice?.data?.title}</span>
          <span>${ProductDetailSlice?.data?.price}</span>

          <div className='flex flex-col gap-3'>
            <span className='font-bold'>Colors</span>
            <div className='flex flex-row gap-3'>
              {listColorProduct?.map((item: any, index: number) => {
                if (item?.title === 'Black') {
                  return <div
                    key={index}
                    className={`min-w-[40px] h-[40px] ${item?.class} ${selectColor === item?.title ? 'border-4 border-slate-400' : 'border border-slate-200'} rounded-full cursor-pointer`}
                    onClick={() => setSelectColor(item?.title)}
                  />
                } else {
                  return <div
                    key={index}
                    className={`min-w-[40px] h-[40px] ${item?.class} ${selectColor === item?.title ? 'border-4 border-black' : 'border border-slate-200'} rounded-full cursor-pointer`}
                    onClick={() => setSelectColor(item?.title)}
                  />
                }
              })}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <span className='font-bold'>Specification</span>
            <div className='flex flex-row gap-3 text-sm'>
              {listSpecProduct?.map((item: string, index: number) => {
                return <div
                  key={index}
                  className={`w-fit h-fit px-4 py-2 ${selectSpec === item ? 'bg-blue-400 text-white' : 'bg-white'} border border-slate-200 rounded cursor-pointer`}
                  onClick={() => setSelectSpec(item)}
                >{item}</div>
              })}
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <span className='font-bold'>Size</span>
            <div className='flex flex-row gap-3 text-sm'>
              {listSizeProduct?.map((item: string, index: number) => {
                return <div
                  key={index}
                  className={`w-fit h-fit px-4 py-2 ${selectSize === item ? 'bg-blue-400 text-white' : 'bg-white'} border border-slate-200 rounded cursor-pointer`}
                  onClick={() => setSelectSize(item)}
                >{item}</div>
              })}
            </div>
          </div>

          <div
            className='border border-blue-500 bg-blue-400 rounded px-2 py-1 flex items-center justify-center text-nowrap text-sm text-white cursor-pointer'
            onClick={() => {
              if(!AuthSlice?.data?.id) {
                localStorage.setItem('nextRoute', path)
                router.replace('/login')
              } else {
                const itemCart = {
                  ...ProductDetailSlice?.data,
                  size: selectSize,
                  color: selectColor,
                  specification: selectSpec
                }
                dispatch(addToCart(itemCart))
              }
            }}
          >Add to Cart</div>

          <div className='flex flex-row gap-5'>
            <div className='flex flex-row gap-3 w-full'>
              <span className='font-bold'>Stock</span>
              <span>{ProductDetailSlice?.data?.stock}</span>
            </div>

            <div className='flex flex-row gap-3 w-full'>
              <span className='font-bold'>Rating</span>
              <span>{ProductDetailSlice?.data?.rating}/5</span>
            </div>
          </div>

          <div className='flex flex-row gap-5'>
            <div className='flex flex-row gap-3 w-full'>
              <span className='font-bold'>Category</span>
              <span>{ProductDetailSlice?.data?.category}/5</span>
            </div>

            <div className='flex flex-row gap-3 w-full'>
              <span className='font-bold'>Brand</span>
              <span>{ProductDetailSlice?.data?.brand}/5</span>
            </div>
          </div>

          <div className='flex flex-col gap-3 pb-10'>
            <span className='font-bold'>Description</span>
            <span>${ProductDetailSlice?.data?.description}</span>
          </div>
        </div>
      </div>
    )
  }

  const renderOtherImages = () => {
    return ProductDetailSlice?.data?.images?.map((item: any, index: number) => {
      return (
        <div
          key={index}
          className={`min-w-[100px] w-[100px] h-[100px] rounded-md ${activeImage === item ? 'border-2 border-blue-400 cursor-default' : 'border border-slate-200 cursor-pointer'}`}
          onClick={() => {
            if (activeImage !== item) {
              setActiveImage(item)
            }
          }}
        >
          <Image
            src={item}
            alt={"product-detail"}
            className={"w-full min-w-full min-h-full h-full object-cover rounded-md"}
            width={100}
            height={100}
            priority
          />
        </div>
      )
    })
  }

  return (
    <div className="w-[100wh] min-h-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden bg-white relative">
      <Header active={"/product"} />

      <div className='w-full h-full flex flex-col gap-5 p-10 mt-10 tablet:mt-0'>
        <div className='w-full h-fit flex flex-row text-sm justify-center tablet:justify-start gap-2'>
          <span className='cursor-pointer' onClick={() => router.push('/product')}>Product</span>
          <span>/</span>
          <span>Product Detail</span>
          <span>/</span>
          <span className='font-bold'>{ProductDetailSlice?.isLoading ? 'Loading...' : ProductDetailSlice?.data?.title ?? ''}</span>
        </div>
        {renderContent()}
      </div>

      {renderPopUp()}
    </div>
  )
}