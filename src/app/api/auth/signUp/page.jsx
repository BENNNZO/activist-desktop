"use client"

import React, { useRef, useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'

import GoogleIcon from '@/assets/svg/login/Google.svg'

export default function page() {
    const { push } = useRouter()

    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    
    const [providers, setProviders] = useState(null)

    useEffect(() => {
        async function setupProviders() {
            const res = await getProviders()
            setProviders(res)
        }
        setupProviders()
        passwordRef.current.value = "password123$123$123$"
        usernameRef.current.value = "Benjamin Phillips"
        emailRef.current.value = "test@gmail.com"
    }, [])

    function handleCredentialSignOn(e) {
        e.preventDefault()
        axios.post("/api/createUser", {
            email: emailRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value
        })
        .then(res => {
            console.log(res)
            if (res.data !== "User already") {
                // signIn("credentials", { email: emailRef.current.value, username: usernameRef.current.value, password: passwordRef.current.value, redirect: true, callbackUrl: '/' })
            } else {
                push('/api/auth/signIn?error=userAlready')
            }
        })
        .catch(err => console.error(err))
    }

    return (
        <div className='h-screen w-screen flex flex-col gap-2 justify-center bg-gradient-to-tr from-var1 to-var4'>
            <div className='p-5 rounded-md border border-neutral-200 flex flex-col gap-3 items-center bg-white shadow-md self-center'>
                <h1 className='text-var1'>Sign Up</h1>
                <form onSubmit={e => handleCredentialSignOn(e)} className='flex flex-col gap-3'>
                    <input 
                        type="email" 
                        placeholder='Email'
                        className='border boder-neutral-300 py-1 px-3 rounded-md text-sm'
                        ref={emailRef}
                        required
                    />
                    <input 
                        type="text" 
                        placeholder='Username'
                        className='border boder-neutral-300 py-1 px-3 rounded-md text-sm'
                        ref={usernameRef}
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
                        Sign Up
                    </button>
                </form>
                <div className='flex flex-row w-full justify-center items-center gap-2'>
                    <span className='w-full h-px bg-neutral-300'/>
                    <p className='font-thin text-xs whitespace-nowrap text-neutral-400'>Or Sign Up With</p>
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
                Already have an account?
                <Link 
                    className=' text-sky-300 ml-1'
                    href='/api/auth/signIn'
                >
                    Login!
                </Link>
            </p>
        </div>
    )
}