import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function header(props: {active?: string | null}) {
  const router = useRouter()

  const renderClass = (route: string) => {
    if (route !== props.active) return 'cursor-pointer font-normal'
    return 'cursor-default font-bold';
  }

  const redirect = (route: string) => {
    if (route !== props.active) {
      router.push(route)
    } else {
      alert('can not')
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
        <span
          className={`${renderClass('/categories')} hover:font-bold`}
          onClick={() => redirect('/categories')}
        >Categories</span>
        <span
          className={`${renderClass('/login')} hover:font-bold`}
          onClick={() => redirect('/login')}
        >Login</span>
      </div>
    </div>
  )
}