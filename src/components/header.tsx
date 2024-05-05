import { useRouter } from 'next/navigation'

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootType } from "@/reducer/store"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from 'react'
import { setLogout, setDefaultLogin } from "@/reducer/slices/authSlice"

export default function header(props: {active?: string | null}) {
  const [showLogoutSection, setShowLogoutSection] = useState<boolean>(false)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { CartSlice, AuthSlice }  = useSelector((state: RootType) => state)

  useEffect(() => {
    setShowLogoutSection(false)
  }, [])

  useEffect(() => {
    let {
      isSuccess
    } = AuthSlice

    if(isSuccess) {
      dispatch(setDefaultLogin())
      router.replace('/')
    }

  }, [AuthSlice])

  const renderClass = (route: string) => {
    if (route !== props.active) return 'cursor-pointer font-normal'
    return 'cursor-default font-bold';
  }

  const redirect = (route: string) => {
    if (route !== props.active) router.push(route)
  }

  const countCart = () => {
    let dataCart = CartSlice?.data?.length > 0 ? CartSlice?.data?.length : 0
    return dataCart > 0 ? `(${dataCart})` : ''
  }

  const renderLogoutSection = () => {
    if (showLogoutSection) {
      return (
        <div
          className='w-[100px] h-fit rounded bg-white border border-slate-300 absolute top-5 right-0 flex flex-col p-3 text-sm'
          onClick={() => setShowLogoutSection(!showLogoutSection)}
        >
          <span
            className='cursor-pointer'
            onClick={() => dispatch(setLogout())}
          >Logout</span>
        </div>
      )
    }
  }

  return (
    <div className="w-full min-h-[60px] flex flex-row items-center px-10 gap-10 border-b border-b-slate-600">
      <div className="font-bold text-2xl text-nowrap">Gits Commerce</div>
      <div className="w-full flex flex-row gap-5 justify-end">
        <span
          className={`${renderClass('/')} hover:font-bold`}
          onClick={() => redirect('/')}
        >Home</span>
        <span
          className={`${renderClass('/product')} hover:font-bold`}
          onClick={() => redirect('/product')}
        >Product</span>
        {AuthSlice?.data?.id ? (
          <span
            className={`${renderClass('/cart')} hover:font-bold`}
            onClick={() => redirect('/cart')}
          >Cart {countCart()}</span>
        ) : null}
        {AuthSlice?.data?.id ? (
          <div className='w-fit h-fit relative'>
            <UserCircleIcon
              className='w-[15px] cursor-pointer'
              onClick={() => setShowLogoutSection(!showLogoutSection)}
            />
            {renderLogoutSection()}
          </div>
        ) : (
          <span
            className={`${renderClass('/login')} hover:font-bold`}
            onClick={() => redirect('/login')}
          >Login</span>
        )}
      </div>
    </div>
  )
}