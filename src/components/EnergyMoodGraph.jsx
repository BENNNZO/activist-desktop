"use client"

import React from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

export default function EnergyMoodGraph(props) {
    return (
        <div className='flex flex-col gap-2 items-center w-full'>
            <div className='shadow-md rounded-t-xl bg-white overflow-hidden w-full h-full'>
                <div className='flex flex-row justify-between px-4 h-[15%]'>
                    <div className='flex flex-row justify-center gap-5'>
                        {props.keys.map(key => (
                            <div className='flex flex-row gap-2 items-center py-3'>
                                <span className={'aspect-square h-4 inline-block rounded-full'} style={{ backgroundColor: key.color }}/>
                                <p style={{ color: key.color }}>{key.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <ResponsiveContainer height="85%">
                    <LineChart 
                        data={props.data} 
                        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        <Brush stroke='#8884d8'/>
                        <CartesianGrid strokeDasharray="5 5" vertical={false}/>
                        <Tooltip />
                        {props.keys.map((key, i) => (
                            <Line key={i} type="basis" dataKey={key.title} stroke={key.color} strokeWidth={3} dot={false} activeDot={false} animationDuration={250} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}