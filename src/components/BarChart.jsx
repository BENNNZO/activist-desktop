"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function BarChart(props) {
    const [amount, setAmount] = useState(10)

    return (
        <div className='flex flex-col gap-2 items-center'>
            {/* <div className='grid w-96 h-32 p-3 place-self-center self-start shadow-md rounded-md' style={{ gridTemplateColumns: `repeat(${amount}, 1fr)` }}> */}
            {/* <div className='flex flex-row justify-between w-96 h-32 p-3 shadow-md rounded-md'>
                {points.map(point => (
                    <div className='grid' style={{ gridTemplateRows: `${10 - point.Mood}fr ${point.Mood}fr` }}>
                        <div className='w-3 bg-neutral-300/50 rounded-sm'/>
                        <div className='bg-var2 rounded-sm w-3'/>
                    </div>
                ))}
            </div>
            <div className='flex flex-row justify-center gap-1'>
                <button 
                    onClick={() => setAmount(7)}
                    className='py-1 px-2 bg-var2 border border-var2/50 text-white text-sm rounded-[0.2rem]'
                >
                    Week
                </button>
                <button 
                    onClick={() => setAmount(30)}
                    className='py-1 px-2 bg-var2 border border-var2/50 text-white text-sm rounded-[0.2rem]'
                >
                    Month
                </button>
                <button 
                    onClick={() => setAmount(365)}
                    className='py-1 px-2 bg-var2 border border-var2/50 text-white text-sm rounded-[0.2rem]'
                >
                    Year
                </button>
                <button 
                    onClick={() => setAmount(props.data.lenth)}
                    className='py-1 px-2 bg-var2 border border-var2/50 text-white text-sm rounded-[0.2rem]'
                >
                    Max
                </button>
            </div> */}
            {/* <p>{JSON.stringify(dataSet)}</p> */}
            {/* <p>{JSON.stringify(props.data)}</p> */}
            <LineChart width={730} height={250} data={props.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Mood" stroke="#8884d8" strokeWidth={3} />
                <Line type="monotone" dataKey="Energy" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
            {/* <Bar 
                data={dataSet}
            /> */}
        </div>
    )
}