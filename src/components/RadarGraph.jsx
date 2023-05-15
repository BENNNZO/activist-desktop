"use client"

import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

export default function LineGraph(props) {
    const [data, setData] = useState({})
    const [set, setSet] = useState(true)

    function count(value) {
        console.log(`Calculating: ${value}`)
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
            <div className='shadow-md rounded-md p-5 bg-var5'>
                {set ? 
                    <h2 className='text-2xl text-center font-bold text_gradient2 h-[50px]'>Mood</h2> : 
                    <h2 className='text-2xl text-center font-bold text_gradient3 h-[50px]'>Energy</h2>
                }
                <RadarChart width={250} height={250} data={data} outerRadius={90}>
                    <PolarGrid />
                    <PolarAngleAxis
                        dataKey="Key"
                        allowDuplicatedCategory={false}
                    />
                    <Radar dataKey="DataPoint" stroke={set ? '#8884d8' : '#82ca9d'} fill={set ? '#8884d8' : '#82ca9d'} fillOpacity={0.5} animationDuration={250}/>
                </RadarChart>
                <button onClick={() => setSet(set => !set)} className='text-center w-full border border-neutral-300 py-1 rounded-md h-[40px]'>
                    Change To {set ? 'Energy' : 'Mood'}
                </button>
            </div>
            {/* <pre>
                {JSON.stringify(data, null, 4)}
            </pre> */}
        </div>
    )
}