"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip } from 'recharts';
import Image from 'next/image';

import dropdownArrow from '@/assets/svg/dropdown/arrow.svg'

export default function LineGraph(props) {
    const [dropdown, setDropdown] = useState(false)
    const [timeFrame, setTimeFrame] = useState("1m")
    const [data, setData] = useState([])

    useEffect(() => {
        switch (timeFrame) {
            case "MAX":
                // let extraData = props.data
                // extraData.slice(props.data.length - data.length, data.length)
                // extraData.slice(0, data.length)
                // setData(data => [...data, ...extraData])
                // let i = 0
                // setInterval(() => {
                //     if (data.length + i <= props.data.length) {
                //         setData(data => [...data, extraData[i]])
                //         i++
                //     } else {
                //         clearInterval()
                //     }
                // }, 100);
                setData(props.data)
                break
            case "1m":
                setData([])
                setData(props.data.slice(0, 30))
                break
            case "1w":
                setData(props.data.slice(0, 7))
                break
            default:
                setData(props.data)
                break
        }
    }, [timeFrame, props.data])

    return (
        <div className='flex flex-col gap-2 items-center p-5'>
            <div className='shadow-md rounded-xl bg-var5 overflow-hidden'>
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
                            className='absolute top-10 bg-var5 z-10 w-full border border-neutral-300 rounded-b-md'
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
                <LineChart width={730} height={340} data={data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false}/>
                    <Tooltip />
                    {props.keys.map(key => (
                        <Line type="basis" dataKey={key.title} stroke={key.color} strokeWidth={3} dot={false} activeDot={false} animationDuration={250} />
                    ))}
                </LineChart>
            </div>
        </div>
    )
}