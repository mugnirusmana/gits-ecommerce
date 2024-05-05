'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/solid"
import Header from '@/components/header'
import Image from "next/image"

import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootType } from "@/reducer/store"
import { getCategories, setDefaultCategories } from "@/reducer/slices/categoriesSlice"
import { getProducts, setDefaultProducts } from "@/reducer/slices/productsSlice"

interface paramsType {
  category?: string | null
  skip: any,
  limit: number
  sort?: string | null
}

export default function Product() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const [data, setData] = useState<[]>([])
  const [params, setParams] = useState<paramsType>({
    category: category??'',
    skip: 0,
    limit: 30,
    sort: ''
  })
  const router = useRouter()

  const { CategoriesSlice, ProductsSlice }  = useSelector((state: RootType) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (category) {
      setParams({
        ...params,
        category: category
      })
    }

    dispatch(getCategories())
    dispatch(getProducts({
      categories: category,
      skip: params.skip,
      limit: params.limit
    }))
  }, [])

  useEffect(() => {
    let {
      isError,
    } = CategoriesSlice

    if (isError) dispatch(setDefaultCategories())

  }, [CategoriesSlice])

  useEffect(() => {
    setSortData(data?.length > 0 ? data : [])
  }, [params.sort])

  useEffect(() => {
    let {
      isError,
      isSuccess,
      data
    } = ProductsSlice

    if (isError) dispatch(setDefaultProducts())

    if (isSuccess) setSortData(data?.products??[])
  }, [ProductsSlice])

  const setSortData = (dataProducts: []) => {
    let sortedProducts: any = []
    if (params?.sort === 'asc') {
      sortedProducts = dataProducts?.slice()?.sort((a: any, b: any) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    } else if (params?.sort === 'desc') {
      sortedProducts = dataProducts?.slice()?.sort((a: any, b: any) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
    } else {
      sortedProducts = dataProducts
    }
    setData(sortedProducts??[])
    setParams({
      ...params,
      skip: ProductsSlice?.data?.skip,
    })
  }

  const renderCategories = () => {
    return CategoriesSlice?.data?.map((item: any, key: number) => {
      return (
        <div
          key={key}
          className="w-fit flex flex-row gap-2 cursor-pointer"
          onClick={() => {
            let cat = item === params?.category ? '' : item
            setParams({
              ...params,
              category: cat,
              skip: 0,
              sort: ''
            })
            dispatch(getProducts({
              categories: cat,
              skip: 0,
              limit: params.limit
            }))
          }}
        >
          <input type="checkbox" className="outline-none cursor-pointer" value={item} checked={params?.category === item}/>
          <span>{item}</span>
        </div>
      )
    })
  }

  const renderContentProduct = () => {
    if (ProductsSlice?.isLoading) return renderProductLoader()
    if (ProductsSlice?.isSuccess) {
      if (data?.length > 0) {
        return renderProduct()
      } else {
        return renderNoProduct()
      }
    }
    return renderProductLoader()
  }

  const renderProductLoader = () => {
    return (
      <div className="w-full flex items-center justify-center">
        <span className="text-sm text-center">Loading...</span>
      </div>
    )
  }

  const renderProduct = () => {
    return (
      <div className="w-full h-fit grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-5 gap-5">
        {data?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="w-full min-w-full max-w-full h-fit flex flex-col rounded border border-slate-200 p-2 bg-slate-100 hover:bg-slate-400 cursor-pointer"
              onClick={() => router.push(`/product/${item?.id}`)}
            >
              <Image
                src={item?.thumbnail}
                alt={"banner"}
                className={"w-full h-[150px] object-cover rounded-md"}
                width={200}
                height={100}
                priority
              />
              <div className="w-full flex flex-row items-center">
                <span className="mt-2 text-wrap w-full text-sm text-ellipsis">{item?.title}</span>
                <span className="mt-2 text-nowrap text-xs">${item?.price}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderNoProduct = () => {
    return (
      <div className="w-full flex items-center justify-center">
        <span className="text-sm text-center">No product available yet.</span>
      </div>
    )
  }

  const renderPrevPage = () => {
    if (ProductsSlice.isSuccess) {
      return (
        <div
          className={`${params.skip === 0 ? 'bg-gray-200 cursor-default border-grey-300' : 'bg-blue-200 cursor-pointer border-blue-300'} w-fit h-fit border rounded flex flex-row gap-2 items-center justify-center px-2 py-1`}
          onClick={() => {
            if (params?.skip > 0) {
              let prevPage = parseInt(params.skip) - 1
              dispatch(getProducts({
                categories: category,
                skip: prevPage,
                limit: params.limit
              }))
            }
          }}
        >
          <ChevronDoubleLeftIcon className="w-[15px]" />
          <span className="text-sm">Prev</span>
  
        </div>
      )
    }
    return null
  }

  const renderNextPage = () => {
    if (ProductsSlice.isSuccess) {
      return (
        <div
          className={`${data?.length > 0 ? 'bg-blue-200 cursor-pointer border-blue-300' : 'bg-gray-200 cursor-default border-grey-300'} w-fit h-fit border rounded flex flex-row gap-2 items-center justify-center px-2 py-1`}
          onClick={() => {
            if (data?.length > 0) {
              let nextPage = parseInt(params.skip) + 1
              dispatch(getProducts({
                categories: category,
                skip: nextPage,
                limit: params.limit
              }))
            }
          }}
        >
          <span className="text-sm">Next</span>
          <ChevronDoubleRightIcon className="w-[15px]" />
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-[100wh] min-h-screen h-screen flex flex-col overflow-y-auto overflow-x-hidden bg-white">
      <Header active={"/product"} />
      
      <div className="w-full h-full flex flex-col gap-4 pt-10 tablet:pt-0">
        <div className="w-full flex flex-row border-b border-b-slate-300 p-10">
          <h1 className="w-full text-4xl font-bold">Product List</h1>
          <div
            className="w-fit h-fit border border-slate-200 rounded flex flex-row gap-2 items-center justify-center px-2 py-1 cursor-pointer"
            onClick={() => {
                setParams({
                  ...params,
                  sort: params.sort === '' || params.sort === 'desc' ? 'asc' : 'desc'
                })
            }}
          >
            <span className="text-sm">Sort</span>
            {params.sort === 'asc' 
              ? <ChevronDoubleUpIcon className="w-[15px]" /> 
              : params?.sort === 'desc'
                ? <ChevronDoubleDownIcon className="w-[15px]" />
                : <EllipsisHorizontalIcon className="w-[15px]" />
            }
          </div>
        </div>
        <div className="w-full h-full flex flex-row gap-4 px-10">
          <div className="w-[200px] min-h-screen h-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-">
              <span className="font-bold">Category</span>
              {renderCategories()}
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-5 border-l border-l-slate-200 pl-10">
            {renderContentProduct()}
            <div className="w-full h-fit flex flex-row gap-2 items-center justify-center text-blue-950 pb-10">
              {renderPrevPage()}
              {renderNextPage()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}