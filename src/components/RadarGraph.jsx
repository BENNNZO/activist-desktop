"use client"

import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

export default function LineGraph(props) {
    const [data, setData] = useState({})
    const [set, setSet] = useState(true)

    function count(value) {
        if (set === true) {
            return props.data.filter(x => x.Mood === value).length + 1
        } else {
            return props.data.filter(x => x.Energy === value).length + 1
        }
    }

    useEffect(() => {
        setData([
            {
                Key: 0,
                DataPoint: count(0)
            },
            {
                Key: 1,
                DataPoint: count(1)
            },
            {
                Key: 2,
                DataPoint: count(2)
            },
            {
                Key: 3,
                DataPoint: count(3)
            },
            {
                Key: 4,
                DataPoint: count(4)
            },
            {
                Key: 5,
                DataPoint: count(5)
            },
            {
                Key: 6,
                DataPoint: count(6)
            },
            {
                Key: 7,
                DataPoint: count(7)
            },
            {
                Key: 8,
                DataPoint: count(8)
            },
            {
                Key: 9,
                DataPoint: count(9)
            },
            {
                Key: 10,
                DataPoint: count(10)
            }
        ])
    }, [props.data, set])

    return (
        <div className='flex flex-col gap-2 items-center p-5'>
            <div className='shadow-md rounded-xl p-5 bg-var5'>
                <div className='relative h-8 flex justify-center items-center'>
                    <AnimatePresence initial={false}>
                        {set ? 
                            <motion.h2 
                                key="Mood"
                                className='text-2xl text-center font-bold text_gradient2 absolute'
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                Mood
                            </motion.h2> : 
                            <motion.h2 
                                key="Energy"
                                className='text-2xl text-center font-bold text_gradient3 absolute'
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
                                Energy
                            </motion.h2>
                        }
                    </AnimatePresence>
                </div>
                <RadarChart width={250} height={258} data={data} outerRadius={90}>
                    <PolarGrid />
                    <PolarAngleAxis
                        dataKey="Key"
                        allowDuplicatedCategory={false}
                    />
                    <Radar dataKey="DataPoint" stroke={set ? '#8884d8' : '#82ca9d'} fill={set ? '#8884d8' : '#82ca9d'} fillOpacity={0.5} animationDuration={250}/>
                </RadarChart>
                <button onClick={() => setSet(set => !set)} className='text-center w-full border border-neutral-300 py-1 rounded-md h-[40px] text-neutral-600'>
                    Change To {set ? 'Energy' : 'Mood'}
                </button>
            </div>
            {/* <pre>
                {JSON.stringify(data, null, 4)}
            </pre> */}
        </div>
    )
}