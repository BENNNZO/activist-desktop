"use client"

import React, { useRef, useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';

import GoogleIcon from '@/assets/svg/login/Google.svg'

export default function page() {
    const seachParams = useSearchParams()

    const [providers, setProviders] = useState(null)

    useEffect(() => {
        async function setupProviders() {
            const res = await getProviders()
            setProviders(res)
        }
        setupProviders()
        passwordRef.current.value = "password123$123$123$"
        emailRef.current.value = "test@gmail.com"
    }, [])

    const passwordRef = useRef()
    const emailRef = useRef()

    function handleCredentialSignOn(e) {
        e.preventDefault()
        signIn("credentials", { email: emailRef.current.value, password: passwordRef.current.value, redirect: true, callbackUrl: '/' })
    }

    return (
        <div className='h-screen w-screen flex flex-col gap-2 justify-center bg-gradient-to-tr from-var1 to-var3'>
            <div className='p-5 rounded-md border border-neutral-200 flex flex-col gap-3 items-center bg-white shadow-md self-center'>
                {seachParams.get('error') === "userNoExist" ? (
                    <div className='bg-red-200 border border-red-300 px-2 py-1 rounded-md text-red-600 text-sm'>
                        User not found.
                    </div>
                ) : seachParams.get('error') === "password" ? (
                    <div className='bg-red-200 border border-red-300 px-2 py-1 rounded-md text-red-600 text-sm'>
                        Incorrect password.
                    </div>
                ) : seachParams.get('error') === "userAlready" ? (
                    <div className='bg-red-200 border border-red-300 px-2 py-1 rounded-md text-red-600 text-sm'>
                        Email already used.
                    </div>
                ) : ''}
                <h1 className='text-var1'>Sign In</h1>
                <form onSubmit={e => handleCredentialSignOn(e)} className='flex flex-col gap-3'>
                    <input 
                        type="email" 
                        placeholder='Email'
                        className='border boder-neutral-300 py-1 px-3 rounded-md text-sm'
                        ref={emailRef}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder='Password'
                        className='border boder-neutral-300 py-1 px-3 rounded-md text-sm'
                        ref={passwordRef}
                        required
                    />
                    <button 
                        type="submit"
                        className='bg-var1 py-1 px-3 rounded-md text-white'
                    >
                        Login
                    </button>
                </form>
                <div className='flex flex-row w-full justify-center items-center gap-2'>
                    <span className='w-full h-px bg-neutral-300'/>
                    <p className='font-thin text-xs whitespace-nowrap text-neutral-400'>Or Sign In With</p>
                    <span className='w-full h-px bg-neutral-300'/>
                </div>
                {providers && Object.values(providers).map((provider) => (
                    provider.name !== "Credentials" ? (
                        <button
                            key={provider.name}
                            onClick={() => signIn(provider.id, { redirect: true, callbackUrl: '/' })}
                            className='p-1 rounded-full border border-neutral-200'
                        >
                            <Image 
                                src={
                                    provider.name === "Google" ? GoogleIcon : ''
                                }
                                width={25}
                                height={25}
                                alt={`sign in with ${provider.name}`}
                            />
                        </button>
                    ) : ""
                ))}
            </div>
            <p className='text-xs self-center text-neutral-300'>
                Don't have an account?
                <Link 
                    className=' text-sky-300 ml-1'
                    href='/api/auth/signUp'
                >
                    Sign Up!
                </Link>
            </p>
        </div>
    )
}