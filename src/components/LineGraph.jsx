"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image';

import dropdownArrow from '@/assets/svg/dropdown/arrow.svg'

export default function LineGraph(props) {
    const [dropdown, setDropdown] = useState(false)
    const [timeFrame, setTimeFrame] = useState("MAX")
    const [data, setData] = useState([])
    const [type, setType] = useState("basis")

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    return (
        <div className='flex flex-col gap-2 items-center p-5 w-full'>
            <div className='shadow-md rounded-xl bg-white overflow-hidden w-full h-full'>
                <div className='flex flex-row justify-between px-4'>
                    <div className='flex flex-row justify-center gap-5'>
                        {props.keys.map(key => (
                            <div className='flex flex-row gap-2 items-center py-3'>
                                <span className={'aspect-square h-4 inline-block rounded-full'} style={{ backgroundColor: key.color }}/>
                                <p style={{ color: key.color }}>{key.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className='grid place-items-center relative'>
                        <div 
                            onClick={() => setDropdown(dropdown => !dropdown)} 
                            className={`select-none cursor-pointer flex flex-row justify-between p-1 border border-neutral-300 px-2 w-24 text-neutral-500 ${dropdown ? 'rounded-t-md' : 'rounded-md'}`}
                        >
                            <p>{timeFrame}</p>
                            <Image 
                                src={dropdownArrow}
                                height={15}
                                width={15}
                                alt='dropdown arrow'
                                className={`opacity-50 ${dropdown ? 'rotate-90' : ''} transition-transform`}
                            />
                        </div>
                        <ul 
                            style={dropdown ? { display: 'block' } : { display: 'none' }} 
                            className='absolute top-10 bg-white z-10 w-full border border-neutral-300 rounded-b-md'
                        >
                            <li
                                onClick={() => {
                                    setTimeFrame("1w")
                                    setDropdown(dropdown => !dropdown)
                                }}
                                className='text-center text-sm cursor-pointer hover:bg-slate-100 py-1 text-neutral-600'
                            >
                                1 week
                            </li>
                            <li
                                onClick={() => {
                                    setTimeFrame("1m")
                                    setDropdown(dropdown => !dropdown)
                                }}
                                className='text-center text-sm border-t border-neutral-300 cursor-pointer hover:bg-slate-100 py-1 text-neutral-600'
                            >
                                1 month
                            </li>
                            <li
                                onClick={() => {
                                    setTimeFrame("MAX")
                                    setDropdown(dropdown => !dropdown)
                                }}
                                className='text-center text-sm border-t border-neutral-300 cursor-pointer hover:bg-slate-100 py-1 text-neutral-600'
                            >
                                Max
                            </li>
                        </ul>
                    </div>
                </div>
                <ResponsiveContainer height="90%">
                    <LineChart 
                        data={
                            timeFrame === "1m" ? data.slice(data.length - 30) : 
                            timeFrame === "1w" ? data.slice(data.length - 7) : data
                        } 
                        margin={{ top: 0, left: 15, right: 15, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="5 5" vertical={false}/>
                        <Tooltip />
                        {props.keys.map((key, i) => (
                            <Line key={i} type={type} dataKey={key.title} stroke={key.color} strokeWidth={3} dot={false} activeDot={false} animationDuration={250} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
                {/* <button
                    onClick={() => setType(type => {
                        if (type === "basis") {
                            return "monotone"
                        } else if (type === "monotone") {
                            return "linear"
                        } else {
                            return "basis"
                        }
                    })}
                    className='p-1 bg-black text-white'
                >
                    Type
                </button> */}
            </div>
        </div>
    )
}