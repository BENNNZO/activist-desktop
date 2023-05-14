"use client"

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function Home() {
    const { push } = useRouter()
    const { data: session } = useSession()

    const [dataPoints, setDataPoints] = useState({})

    useEffect(() => {
        if (session === null) push('/user/signIn')
        console.log(session)
    }, [session])

    function handleCreateDataPoint() {
        console.log("creat point")
        axios.post(`/api/data/${session?.user.id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    function handleFetchDataPoint() {
        console.log("fetch points")
        axios.get(`/api/data/${session?.user.id}`)
        .then(res => setDataPoints(res.data))
        .catch(err => console.log(err))
    }

    if (session) return (
        <main>
            <h1>Signed In</h1>
            <button onClick={() => signOut()} className='py-2 px-4 bg-slate-300 shadow-sm'>Sign Out</button>
            <img
                src={session?.user.image ? session?.user.image : `https://source.boringavatars.com/beam/120/${session?.user.name}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`} 
                width={75}
                height={75}
                alt="profile picture"
                className='rounded-full'
            />
            <p className='text_gradient font-extrabold text-5xl'>{session?.user.name}</p>
            <p>{session?.user.email}</p>
            <button onClick={handleCreateDataPoint} className='p-2 border border-black'>
                Create DataPoint
            </button>
            <button onClick={handleFetchDataPoint} className='p-2 border border-black'>
                Get DataPoints
            </button>
            <pre>
                {JSON.stringify(dataPoints, null, 4)}
            </pre>
        </main>
    )
}
