'use client'

import { AppDispatch, RootType } from "@/reducer/store"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLogin, setDefaultLogin } from "@/reducer/slices/authSlice"

interface popupType {
  isShow: boolean,
  message?: string | null
}

export default function Login() {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [username, setUsername] = useState({
		value: '',
		isError: false,
		errorMessage: ''
	})
	const [password, setPassword] = useState({
		value: '',
		isError: false,
		errorMessage: ''
	})
	const [popup, setPopUp] = useState<popupType>({
    isShow: false,
    message: ''
  })

	const router = useRouter()
	const { AuthSlice } = useSelector((state: RootType) => state)
	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		let {
			isSuccess,
			isError,
			errorMessage
		} = AuthSlice

		if (isError) {
			setPopUp({
				isShow: true,
				message: errorMessage
			})

			dispatch(setDefaultLogin())
		}

		if (isSuccess) {
			dispatch(setDefaultLogin())
			let nextRoute = localStorage.getItem('nextRoute')
			localStorage.removeItem('nextRoute')
			router.replace(nextRoute??'/')
		}

	}, [AuthSlice])

	const setSignIn = () => {
		let resultValidateUsername = validate(username.value, 'Username')
		let resultValidatePassword = validate(password.value, 'Password')
		if (resultValidateUsername?.isError || resultValidatePassword?.isError) {
			setUsername({
				...username,
				isError: resultValidateUsername?.isError,
				errorMessage: resultValidateUsername?.errorMessage
			})
			setPassword({
				...password,
				isError: resultValidatePassword?.isError,
				errorMessage: resultValidatePassword?.errorMessage
			})
		} else {
			dispatch(setLogin(JSON.stringify({
				username: username.value,
				password: password.value,
				expiresInMins: 1440 //24 hours
			})))
		}
	}

	const validate = (value: string, name: string) => {
		let isError: boolean = false
		let errorMessage: string | null = ''
		if (!value) {
			isError = true
			errorMessage = `${name} is required`
		} else if (value?.length > 50) {
			isError = true
			errorMessage = `${name} max length 50 characters`
		}

		return {
			isError,
			errorMessage
		}
	}

	const renderPopUp = () => {
    if (popup?.isShow) {
      return (
        <div className='w-screen h-screen absolute top-0 left-0 flex items-center justify-center backdrop-blur-md'>
          <div className='w-[320px] h-[150px] rounded bg-white border border-slate-300 flex flex-col items-center justify-center p-5 gap-3'>
            <span className='font-bold'>Login</span>
            <span className='h-full text-sm'>{popup?.message}</span>
            <div
              className='w-full flex flex-row items-center justify-center py-1 px-2 rounded bg-blue-300 text-white text-sm cursor-pointer'
              onClick={() => {
								setPopUp({
									isShow: false,
									message: ''
								})
              }}
            >Close</div>
          </div>
        </div>
      )
    }
    return null
  }

	return (
		<div className="w-screen h-screen bg-[#e5e5e5] flex items-center justify-center py-20 text-sm">
			<div className="w-1/3 h-fit rounded p-10 border border-[#d7d7d7] flex flex-col gap-5 bg-white">
				<h1 className="font-bold text-2xl w-full border-b border-b-slate-200 pb-3">Login</h1>
				<div className="w-full flex flex-col gap-1">
					<span>Username</span>
					<input
						type="text"
						placeholder="Username"
						className="outline-none w-full border border-slate-200 rounded px-2"
						value={username?.value}
						onChange={(event) => setUsername({...username, value: event?.target?.value, isError: false, errorMessage: ''})}
					/>
					<span className="text-[8px] text-red-500">{username?.errorMessage}</span>
				</div>
				<div className="w-full flex flex-col gap-1">
					<span>Password</span>
					<div className="w-full flex flex-row border border-slate-200 rounded">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							className="outline-none w-full px-2"
							value={password?.value}
							onChange={(event) => setPassword({...username, value: event?.target?.value, isError: false, errorMessage: ''})}
						/>
						<div
							className="w-fit h-full rounded-tr rounded-br px-2 cursor-pointer flex items-center justify-center"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? (<EyeIcon className="h-[16px]" />) : (<EyeSlashIcon className="h-[16px]" />)}
						</div>
					</div>
					<span className="text-[8px] text-red-500">{password?.errorMessage}</span>
				</div>

				<div
					className={`w-full flex flex-row items-center justify-center text-white ${AuthSlice?.isLoading ? 'bg-gray-500 cursor-default' : 'bg-blue-400 cursor-pointer'} rounded py-2 px-4`}
					onClick={() => !AuthSlice?.isLoading ? setSignIn() : {}}
				>{AuthSlice?.isLoading ? 'Loading...' : 'Sign In'}</div>
				<span className="text-blue-400 italic text-xs underline cursor-pointer" onClick={() => router.push('/')}>Back to Home</span>
			</div>
			{renderPopUp()}
		</div>
	)
}