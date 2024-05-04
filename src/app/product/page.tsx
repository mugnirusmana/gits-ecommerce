'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/header'

export default function Product() {
  const [data, setData] = useState([])
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  useEffect(() => {
    console.log('category ', category)
  }, [])

  return (
    <div className="w-[100wh] min-h-screen flex flex-col overflow-y-hidden hide-scroll bg-white">
      <Header active={"/product"} />
      <span>Product Page</span>
    </div>
  )
}