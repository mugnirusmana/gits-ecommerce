import { useRouter } from 'next/navigation'

export default function header() {
  const router = useRouter()

  return (
    <div className="w-full min-h-[60px] flex flex-row items-center px-10 gap-10 border-b border-b-slate-600">
      <div className="font-bold text-2xl text-nowrap">Gits Commerce</div>
      <div className="w-full flex flex-row gap-5 justify-end">
        <span
          className="cursor-pointer"
          onClick={() => router.push('/')}
        >Home</span>
        <span
          className="cursor-pointer"
          onClick={() => router.push('/product')}
        >Product</span>
        <span
          className="cursor-pointer"
          onClick={() => router.push('/categories')}
        >Categories</span>
        <span
          className="cursor-pointer"
          onClick={() => router.push('/login')}
        >Login</span>
      </div>
    </div>
  )
}