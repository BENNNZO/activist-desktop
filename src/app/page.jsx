"use client"

import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import axios from 'axios';

import LineGraph from '@/components/LineGraph';
import RadarGraph from '@/components/RadarGraph'

export default function Home() {
    const { push } = useRouter()
    const { data: session } = useSession()

    const [dataPoints, setDataPoints] = useState([])

    useEffect(() => {
        if (session === null) push('/user/signIn')
        console.log(session)
    }, [session])

    function handleCreateDataPoint() {
        console.log("creat point")
        let i = 0
        setInterval(() => {
            if (i < 50) {
                axios.post(`/api/data/${session?.user.id}`)
                .then(() => {
                    handleFetchDataPoint()
                    i++
                })
                .catch(err => console.log(err))
            } else {
                clearInterval()
            }
        }, 50);
    }

    function handleFetchDataPoint() {
        console.log("fetch points")
        axios.get(`/api/data/${session?.user.id}`)
        .then(res => setDataPoints(res.data))
        .catch(err => console.log(err))
    }

    function handleDeleteDataPoint() {
        console.log("delete points")
        axios.delete(`/api/data/${session?.user.id}`)
        .then(res => {
            handleFetchDataPoint()
        })
        .catch(err => console.log(err))
    }

    if (session) { return (
        <main className='bg-var1'>
            <h1>Signed In</h1>
            <button onClick={() => signOut()} className='py-2 px-4 bg-slate-300 shadow-sm'>Sign Out</button>
            <img
                src={session?.user.image ? session?.user.image : `https://source.boringavatars.com/beam/120/${session?.user.email}?colors=383961,6494aa,6494aa,30ff97,6494aa`} 
                width={75}
                height={75}
                alt="profile picture"
                className='rounded-full'
            />
            <p className='text_gradient font-extrabold text-5xl'>{session?.user.name}</p>
            <p>{session?.user.email}</p>
            <button onClick={handleCreateDataPoint} className='p-2 border border-black'>
                Create Random DataPoint
            </button>
            <button onClick={handleFetchDataPoint} className='p-2 border border-black'>
                Get DataPoints
            </button>
            <button onClick={handleDeleteDataPoint} className='p-2 border border-black'>
                Delete DataPoints
            </button>
            <div className='flex flex-row flex-wrap'>
                <LineGraph
                    data={dataPoints}
                    keys={[
                        {
                            title: "Mood",
                            color: "#8884d8" 
                        },
                        {
                            title: "Energy",
                            color: "#82ca9d" 
                        }
                    ]}
                />
                <RadarGraph
                    data={dataPoints}
                    keys={{ title: "Mood", color: "#8884d8" }}
                />
            </div>
            <pre>
                {JSON.stringify(dataPoints, null, 4)}
            </pre>
        </main>
    )} else return (
        <div className='w-screen h-screen grid place-items-center'>
            <h1 className='text-4xl'>Loading</h1>
        </div>
    )
}
