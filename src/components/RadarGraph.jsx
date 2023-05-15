"use client"

import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

export default function LineGraph(props) {
    const [data, setData] = useState({})

    function count(value) {
        if (props.keys.title === "Mood") {
            return props.data.filter(x => x.Mood === value).length
        } else if (props.keys.title === "Energy") {
            return props.data.filter(x => x.Energy === value).length
        }
    }

    useEffect(() => {
        setData([
            {
                Key: 0,
                Mood: count(0)
            },
            {
                Key: 1,
                Mood: count(1)
            },
            {
                Key: 2,
                Mood: count(2)
            },
            {
                Key: 3,
                Mood: count(3)
            },
            {
                Key: 4,
                Mood: count(4)
            },
            {
                Key: 5,
                Mood: count(5)
            },
            {
                Key: 6,
                Mood: count(6)
            },
            {
                Key: 7,
                Mood: count(7)
            },
            {
                Key: 8,
                Mood: count(8)
            },
            {
                Key: 9,
                Mood: count(9)
            },
            {
                Key: 10,
                Mood: count(10)
            }
        ])
    }, [props.data])

    return (
        <div className='flex flex-col gap-2 items-center p-5'>
            <div className='shadow-md rounded-md p-5 bg-var5'>
                <RadarChart width={250} height={250} data={data} outerRadius={90}>
                    <PolarGrid />
                    <PolarAngleAxis
                        dataKey="Key"
                        allowDuplicatedCategory={false}
                    />
                    <Radar dataKey={props.keys.title} stroke={props.keys.color} fill={props.keys.color} fillOpacity={0.5} />
                </RadarChart>
            </div>
            {/* <pre>
                {JSON.stringify(data, null, 4)}
            </pre> */}
        </div>
    )
}