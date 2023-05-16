"use client"

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion';
import axios from 'axios';

import LineGraph from '@/components/LineGraph';
import RadarGraph from '@/components/RadarGraph'
import BooleanGraph from '@/components/BooleanGraph';

export default function page() {
    const { push } = useRouter()
    const { data: session } = useSession()
    const params = useParams()

    const [dataPoints, setDataPoints] = useState([])
    const [userData, setUserData] = useState({})

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
        <main className='bg-var5'>
            <motion.h1 
                className='text_gradient font-extrabold text-7xl text-center py-3 leading-relaxed'
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {session?.user.id === params.userId ? "My Dashboard" : `${userData.username} Dashboard`}
            </motion.h1>
            <div>
                <BooleanGraph 
                
                />
            </div>
            <div className='flex flex-row'>
                <LineGraph
                    data={dataPoints}
                    keys={[
                        { title: "Mood", color: "#8884d8" },
                        { title: "Energy", color: "#82ca9d" }
                    ]}
                />
                <RadarGraph
                    data={dataPoints}
                    keys={{ title: "Mood", color: "#8884d8" }}
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