"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function LineGraph(props) {
    return (
        <div className='flex flex-col gap-2 items-center p-5'>
            <div className='shadow-md rounded-md p-5 bg-var5'>
                <LineChart width={730} height={250} data={props.data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* <XAxis /> */}
                    {/* <YAxis /> */}
                    <Tooltip />
                    <Legend />
                    {props.keys.map(key => (
                        <Line type="monotone" dataKey={key.title} stroke={key.color} strokeWidth={3} />
                    ))}
                </LineChart>
            </div>
        </div>
    )
}