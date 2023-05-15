"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function LineGraph(props) {
    return (
        <div className='flex flex-col gap-2 items-center p-5'>
            <div className='shadow-md rounded-xl bg-var5 overflow-hidden'>
                <LineChart width={730} height={340} data={props.data} margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false}/>
                    {/* <XAxis /> */}
                    {/* <YAxis /> */}
                    <Tooltip />
                    {/* <Legend height={50}/> */}
                    {props.keys.map(key => (
                        <Line type="basis" dataKey={key.title} stroke={key.color} strokeWidth={3} dot={false} activeDot={false} />
                    ))}
                </LineChart>
                <div className='flex flex-row justify-center gap-5'>
                    {props.keys.map(key => (
                        <div className='flex flex-row gap-2 items-center py-3'>
                            <span className={'aspect-square h-4 inline-block rounded-full'} style={{ backgroundColor: key.color }}/>
                            <p style={{ color: key.color }}>{key.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}