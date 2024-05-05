'use client'

import Header from '@/components/header'
import { setClearCart, removeCart } from '@/reducer/slices/cartSlice'
import { AppDispatch, RootType } from '@/reducer/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Cart() {
  const [data, setData] = useState<[]>([])
  const [payCart, setPayCart] = useState({
    isLoading: false,
    isSuccess: false
  })

  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { CartSlice, AuthSlice }  = useSelector((state: RootType) => state)

  useEffect(() => {
    if (AuthSlice?.data?.id) {
      setData([])
      setTimeout(() => {setDataCart()},500)
    } else {
      localStorage.setItem('nextRoute', '/cart')
      router.replace('/login')
    }
  }, [])

  useEffect(() => {
    setDataCart()
  }, [CartSlice])

  const setDataCart = () => {
    let dummyData: any = []
    CartSlice?.data?.forEach((item: any) => {
      if (dummyData?.length > 0) {
        let checkData = dummyData?.find((itemDummy: any) => {
          return itemDummy?.id === item?.id && itemDummy?.color === item?.color && itemDummy?.size === item?.size && itemDummy?.specification === item?.specification
        })

        if (checkData) {
          let indexOfDummyData = dummyData?.findIndex((itemDummy: any) => {
            return itemDummy?.id === item?.id && itemDummy?.color === item?.color && itemDummy?.size === item?.size && itemDummy?.specification === item?.specification
          })
          dummyData[indexOfDummyData].qty = parseInt(dummyData[indexOfDummyData].qty) + 1
        } else {
          let newItem = {
            ...item,
            qty: 1
          }
          dummyData = dummyData.concat(newItem)
        }
      } else {
        let newItem = {
          ...item,
          qty: 1
        }
        dummyData = dummyData.concat(newItem)
      }
    })
    setData(dummyData??[])
  }

  const renderPrePayCart = () => {
    if (payCart.isSuccess) return renderSuccesPayment()
    return renderCartSection()
  }

  const renderSuccesPayment = () => {
    return (
      <div className='w-full h-fit flex flex-col items-center justify-center py-20 gap-5 text-sm'>
        <span className='text-2xl font-bold'>Thank you!</span>
        <span>Your order will be processed immedietly</span>
        <div
          className='w-fit flex flex-row rounded px-4 py-2 text-sm text-white cursor-pointer bg-blue-400 text-center items-center justify-center'
          onClick={() => router.push('/')}
        >Back to Home</div>
      </div>
    )
  }

  const renderCartSection = () => {
    return (
      <>
        <div className="w-full h-fit">
            <h1 className="w-full text-4xl font-bold">Shopping Cart</h1>
          </div>
          <div className="w-full h-fit laptop:h-full flex flex-col laptop:flex-row gap-10">
            <div className='w-full h-full flex flex-col'>
              {renderContent()}
            </div>
            {data?.length > 0 ? (
              <div className='w-full laptop:w-1/3 h-fit flex flex-col text-sm p-5 rounded gap-3 border border-slate-200'>
                <div className='flex flex-row justify-between font-bold'>
                  <span>Subtotal</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <span className='flex flex-row justify-between text-xs italic'>*Shopping and taxes caculated at checkout</span>

                <div
                  className={`w-full flex flex-row rounded px-4 py-2 text-sm text-white ${payCart?.isLoading ? 'bg-gray-500 cursor-default' : 'bg-blue-400 cursor-pointer'} text-center items-center justify-center`}
                  onClick={() => {
                    if (!payCart?.isLoading) {
                      dispatch(setClearCart())
                      setPayCart({
                        isLoading: true,
                        isSuccess: false,
                      })
                      setTimeout(() => {
                        setPayCart({
                          isLoading: false,
                          isSuccess: true,
                        })
                      }, 1000)
                    }
                  }}
                >{payCart?.isLoading ? 'Loading...' : 'Checkout'}</div>
              </div>
            ) : null}
          </div>
      </>
    )

  }

  const renderContent = () => {
    if (data?.length > 0) return renderCart()
    return renderNullCart()
  }

  const calculateTotal = (item: any) => {
    let {qty, price} = item
    return qty * price
  }

  const calculateSubtotal = () => {
    let subtotal: any = 0
    data?.forEach((item: any) => {
      let total = calculateTotal(item)
      subtotal = parseInt(subtotal) + total
    })

    return subtotal
  }

  const renderCart = () => {
    return data?.map((item: any, index: number) => {
      return (
        <div key={index} className='w-full min-h-[150px] h-[150px] flex flex-row gap-5 border-b border-b-slate-200 py-4'>
          <Image
            src={item?.thumbnail}
            alt={"category"}
            className={"w-[150px] min-w-[150px] h-full object-cover rounded-md"}
            width={100}
            height={100}
            priority
          />
          <div className='w-full h-full text-sm flex flex-col'>
            <div className='flex h-full flex-col'>
              <span className='font-bold mb-2'>{item.title}</span>
              <span>Color: {item.color??'-'}</span>
              <span>Specification: {item.specification??'-'}</span>
              <span>Size: {item.size??'-'}</span>
            </div>
            <span>Qty: <span className='font-bold'>{item.qty??0}</span></span>
          </div>
          <div className='w-[200px] h-full flex flex-col items-end justify-between'>
            <div className='w-fit flex flex-col text-xs gap-2'>
              <span>Price: ${item?.price}</span>
              <span className='font-bold'>Total: ${calculateTotal(item)}</span>
            </div>
            <span
              className='text-blue-500 underline cursor-pointer text-xs'
              onClick={() => dispatch(removeCart(item, CartSlice?.data))}
            >Remove</span>
          </div>
        </div>
      )
    })
  }

  const renderNullCart = () => {
    return (
      <div className='text-sm'>No product added yet, <span className='cursor-pointer text-blue-500 underline text-xs' onClick={() => router.push('/product')}>Start Shopping</span></div>
    )
  }

  return (
    <div className="w-[100wh] min-h-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden bg-white">
      <Header active={"/cart"} />

      <div className="w-full h-full flex flex-col p-10 gap-10">
        {renderPrePayCart()}
      </div>
    </div>
  )
}