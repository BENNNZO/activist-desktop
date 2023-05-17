"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion';
import axios from 'axios';
import Image from 'next/image';

import LineGraph from '@/components/LineGraph';
import RadarGraph from '@/components/RadarGraph'
import BooleanGraph from '@/components/BooleanGraph';
import LineGraphBoolean from '@/components/LineGraphBoolean';

import dropdownArrow from '@/assets/svg/dropdown/arrow.svg'

export default function page() {
    const { push } = useRouter()
    const { data: session } = useSession()
    const params = useParams()

    const [dataPoints, setDataPoints] = useState([])
    const [userData, setUserData] = useState({})
    const [timeFrame, setTimeFrame] = useState("MAX")
    const [dropdown, setDropdown] = useState(false)

    useEffect(() => {
        axios.get(`/api/user/get-user/${params.userId}`)
        .then(res => setUserData(res.data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (session === null) {
            push('/user/signIn')
        } else if (session !== undefined || null) {
            axios.get(`/api/data/${params.userId}`)
            .then(res => setDataPoints(res.data))
            .catch(err => console.log(err))
        }
    }, [session])

    function handleCreateDataPoint() {
        console.log("creat point")
        let i = 0
        setInterval(() => {
            if (i < 30) {
                i++
                axios.post(`/api/data/${session?.user.id}`)
                .then(() => {
                    handleFetchDataPoint()
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
        <main className='bg-var5'>
            <motion.h1 
                className='text_gradient font-extrabold text-7xl text-center py-3 leading-relaxed'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {session?.user.id === params.userId ? "My Dashboard" : `${userData.username} Dashboard`}
            </motion.h1>
            <motion.span 
                className='bg-var5 w-screen inline-block'
                initial={{ height: '100vh' }}
                animate={{ height: '0vh' }}
            />
            <div className='w-full mb-5 px-5'>
                <div className='bg-white w-full h-full rounded-lg shadow-md flex flex-row justify-between p-5 cursor-pointer' onClick={() => setDropdown(dropdown => !dropdown)}>
                    <div></div>
                    <div className='w-24 relative'>
                        <div className={`border border-neutral-300 px-2 flex flex-row justify-between py-1 select-none ${dropdown ? 'rounded-t-md' : 'rounded-md'}`}>
                            <p className='text-neutral-600'>{timeFrame}</p>
                            <Image 
                                src={dropdownArrow}
                                height={15}
                                width={15}
                                alt='dropdown arrow'
                                className={`opacity-50 ${dropdown ? 'rotate-90' : ''} transition-transform`}
                            />
                        </div>
                        <ul 
                            className='z-10 absolute top-full rounded-b-md bg-white w-full border border-neutral-300 border-t-0' 
                            style={dropdown ? { display: 'block' } : { display: 'none' }}
                        >
                            <li 
                                className='text-center text-sm px-2 py-1 text-neutral-600 hover:bg-slate-50'
                                onClick={() => setTimeFrame("1w")}
                            >
                                <p>1 week</p>
                            </li>
                            <li 
                                className='text-center text-sm px-2 py-1 text-neutral-600 hover:bg-slate-50 border-t border-neutral-300'
                                onClick={() => setTimeFrame("1m")}
                            >
                                <p>1 month</p>
                            </li>
                            <li 
                                className='text-center text-sm px-2 py-1 text-neutral-600 hover:bg-slate-50 border-t border-neutral-300'
                                onClick={() => setTimeFrame("MAX")}
                            >
                                <p>MAX</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex flex-row px-5 gap-5 w-full'>
                <LineGraph
                    data={
                        timeFrame === "1w" ? dataPoints.slice(-7) :
                        timeFrame === "1m" ? dataPoints.slice(-30) :
                        dataPoints
                    }
                    keys={[
                        { title: "Mood", color: "#8884d8" },
                        { title: "Energy", color: "#82ca9d" }
                    ]}
                />
                <RadarGraph
                    data={
                        timeFrame === "1w" ? dataPoints.slice(-7) :
                        timeFrame === "1m" ? dataPoints.slice(-30) :
                        dataPoints
                    }
                    keys={{ title: "Mood", color: "#8884d8" }}
                />
            </div>
            <div className='mt-5 px-5'>
                <LineGraphBoolean
                    data={
                        timeFrame === "1w" ? dataPoints.slice(-7) :
                        timeFrame === "1m" ? dataPoints.slice(-30) :
                        dataPoints
                    }
                    keys={[
                        { title: "Mood", color: "#8884d8" },
                        { title: "Energy", color: "#82ca9d" }
                    ]}
                />
            </div>
            <div className='h-[500px] p-5 w-full'>
                <BooleanGraph 
                    data={
                        timeFrame === "1w" ? dataPoints.slice(-7) :
                        timeFrame === "1m" ? dataPoints.slice(-30) :
                        dataPoints
                    }
                    dataKeys={[
                        "Breakfast", 
                        "Lunch", 
                        "Dinner",
                        "GoodSleep",
                        "Headache",
                        "Exercise",
                        "Shower",
                        "Work",
                        "Game",
                        "Music",
                        "Smoke",
                        "Vape",
                        "Drink"
                    ]}
                    dataColors={[
                        "#8884D8", 
                        "#82CA9D", 
                        "#e09c89",
                        "#8884D8", 
                        "#82CA9D", 
                        "#e09c89",
                        "#8884D8", 
                        "#82CA9D", 
                        "#e09c89",
                        "#8884D8", 
                        "#82CA9D", 
                        "#e09c89",
                        "#8884D8"
                    ]}
                />
            </div>
            <button onClick={handleCreateDataPoint} className='text-xs border text-white ml-5 border-black'>
                Create Random DataPoint
            </button>
            <button onClick={handleFetchDataPoint} className='text-xs border text-white ml-5 border-black'>
                Get DataPoints
            </button>
            <button onClick={handleDeleteDataPoint} className='text-xs border text-white ml-5 border-black'>
                Delete DataPoints
            </button>
        </main>
    )} else return (
        <div className='w-screen h-screen grid place-items-center'>
            <h1 className='text-4xl'>Loading</h1>
        </div>
    )
}