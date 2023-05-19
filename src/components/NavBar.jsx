"use client"

import React, { useState } from 'react';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, useAnimate, stagger, AnimatePresence } from 'framer-motion';

import Logo from '@/assets/svg/navbar/logo.svg'

export default function NavBar() {
    const { data: session } = useSession()
    const { push } = useRouter()

    const [logoRotate, setLogoRotate] = useState(0)
    const [dropdown, setDropdown] = useState(false)

    return (
        <nav className='flex flex-row justify-between px-16 h-14 items-center border-b border-b-neutral-200 select-none'>
            <div className='flex flex-row gap-5 items-center cursor-pointer'>
                <Image // NAV LEFT
                    src={Logo}
                    width={25}
                    height={25}
                    onClick={() => {
                        push('/')
                        setLogoRotate(deg => deg - 360)
                    }}
                    style={{ rotate: `${logoRotate}deg`, transition: 'all 0.75s ease-out' }}
                />
                <p 
                    className='text-2xl drop-shadow-md text-var1 font-bold cursor-pointer' 
                    onClick={() => push('/')}
                >
                    Activist
                </p>
            </div>
            {session ? (
                <motion.ul // NAV RIGHT
                    className='flex flex-row gap-5 items-center'
                >
                    <motion.li
                        className='py-1 px-4 rounded-full border border-var1 cursor-pointer transition-colors hover:bg-var5 bg-var1 hover:text-var1 text-var5'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        onClick={() => push('/create-daily-entry')}
                    >
                        Create Daily Entry
                    </motion.li>
                    <motion.li 
                        className='py-1 px-4 rounded-full border border-var1 cursor-pointer transition-colors hover:bg-var1 bg-var5 hover:text-var5 text-var1'
                        onClick={() => {
                            setDropdown(false)
                            signOut()
                            push('/')
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Sign Out
                    </motion.li>
                    <motion.li // PROFILE PICTURE
                        className='relative'
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 0.3
                        }}
                    >
                        <motion.div
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setDropdown(dropdown => !dropdown)}
                            animate={dropdown ? { rotate: 30 } : { rotate: 0 }}
                        >
                            <Image
                                src={session?.user.image ? session?.user.image : `https://source.boringavatars.com/beam/120/${session?.user.email}?colors=2197a3,f71e6c,f07868,ebb970,e7d3b0`} 
                                width={40}
                                height={40}
                                alt="profile picture"
                                className='rounded-full cursor-pointer shadow-md'
                            />
                        </motion.div>
                        <motion.ul 
                            style={{ display: `${dropdown ? 'block' : 'none'}` }} 
                            className='absolute bg-white right-0 whitespace-nowrap mt-3 rounded-md overflow-hidden shadow-lg'
                            animate={dropdown ? { opacity: 1, scale: 1, height: 106 } : { opacity: 0, scale: 0, height: 0 }}
                        >
                            <motion.li
                                animate={dropdown ? { opacity: 1, x: 0, height: "calc(100% / 3)" } : { opacity: 0, x: -10, height: 0 }}
                                transition={{ delay: 0.1 }}
                                className='pt-2 pb-1 px-5 hover:bg-var5 cursor-pointer'
                                onClick={() => {
                                    setDropdown(false)
                                    push(`/dashboard/${session?.user.id}`)
                                }}
                            >
                                My Dashboard
                            </motion.li>
                            <motion.li 
                                animate={dropdown ? { opacity: 1, x: 0, height: "calc(100% / 3)" } : { opacity: 0, x: -10, height: 0 }}
                                transition={{ delay: 0.2 }}
                                className='py-1 px-5 border-t border-t-neutral-300 hover:bg-var5 cursor-pointer'
                            >
                                Settings
                            </motion.li>
                            <motion.li 
                                animate={dropdown ? { opacity: 1, x: 0, height: "calc(100% / 3)" } : { opacity: 0, x: -10, height: 0 }}
                                transition={{ delay: 0.3 }}
                                className='pt-1 pb-2 px-5 border-t border-t-neutral-300 hover:bg-var5 cursor-pointer'
                                onClick={() => {
                                    setDropdown(false)
                                    signOut()
                                    push('/')
                                }}
                            >
                                Sign Out
                            </motion.li>
                        </motion.ul>
                    </motion.li>
                </motion.ul>
            ) : ( // ALTERNATE NAV IF NOT LOGGED IN
                <ul className='flex flex-row gap-3'>
                    <li
                        className='px-3 py-1 border border-neutral-400 rounded-full cursor-pointer'
                        onClick={() => push('/user/signIn')}
                    >
                        Login
                    </li>
                    <li
                        className='px-3 py-1 border border-neutral-400 rounded-full cursor-pointer'
                        onClick={() => push('/user/signUp')}
                    >
                        Sign Up
                    </li>
                </ul>
            )}
        </nav>
    )
}