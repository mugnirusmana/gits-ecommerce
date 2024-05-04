'use client'

import Header from "@/components/header"
import HomeBanner from "@/components/homeBanner"
import HomeCategories from "@/components/homeCategories"
import HomeLatestProducts from "@/components/homeLatestProducts"

export default function Home() {
  return (
      <div className="w-[100wh] min-h-screen h-fit flex flex-col overflow-hidden hide-scroll bg-white">

        <Header active={"/"} />

        <HomeBanner />

        <HomeCategories />

        <HomeLatestProducts />

      </div>
  )
}