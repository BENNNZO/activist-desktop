"use client"

import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export default function LineGraph(props) {
    const [data, setData] = useState([])
    const [set, setSet] = useState(true)

    function count(value) {
        if (set === true) {
            return props.data.filter(x => x.Mood === value).length + 1
        } else {
            return props.data.filter(x => x.Energy === value).length + 1
        }
    }

    useEffect(() => {
        for (let i = 0; i < 10; i++) {
            setData(prevData => {
                let newData = [...prevData]
                newData[i] = { Key: i, DataPoint: count(i) }
                return newData
            })
        }
    }, [props.data, set])

    return (
        <div className='shadow-md rounded-xl p-5 bg-white w-80'>
            <div className='relative flex justify-center items-center h-[10%]'>
                <AnimatePresence initial={false}>
                    {set ? 
                        <motion.h2 
                            key="Mood"
                            className='text-3xl leading-relaxed text-center font-bold text_gradient2 absolute'
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.1 }}
                        >
                            Mood
                        </motion.h2> : 
                        <motion.h2 
                            key="Energy"
                            className='text-3xl leading-relaxed text-center font-bold text_gradient3 absolute'
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.1 }}
                        >
                            Energy
                        </motion.h2>
                    }
                </AnimatePresence>
            </div>
            <ResponsiveContainer height="80%">
                <RadarChart data={data} outerRadius={100}>
                    <PolarGrid />
                    <PolarAngleAxis
                        dataKey="Key"
                        allowDuplicatedCategory={false}
                    />
                    <Radar dataKey="DataPoint" stroke={set ? '#8884d8' : '#82ca9d'} fill={set ? '#8884d8' : '#82ca9d'} fillOpacity={0.5} animationDuration={150}/>
                </RadarChart>
            </ResponsiveContainer>
            <button onClick={() => setSet(set => !set)} className='text-center w-full border border-neutral-300 py-1 rounded-md h-[10%] text-neutral-600'>
                Change To {set ? 'Energy' : 'Mood'}
            </button>
        </div>
    )
}