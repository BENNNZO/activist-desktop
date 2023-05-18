"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

export default function LineGraphBoolean(props) {
    const [avgData, setAvgData] = useState([])
    const [prevDays, setPrevDays] = useState(30)

    useEffect(() => {
        console.clear()
        let avgDataControl = []

        for (let k = 0; k < props.keys.length; k++) {
            console.log(k)
            for (let i = 0; i < props.data.length; i++) {
                let key = props.keys[k].title
                let value = props.data[i][key]
                let lastValues = 0
    
                if (i > prevDays) {
                    for (let j = 0; j < prevDays; j++) {
                        lastValues = lastValues + (props.data[i - j][key] ? 10 : 0)
                    }
                } else {
                    for (let j = 0; j < (i); j++) {
                        // console.log([i, j, i - j, lastValues])
                        lastValues = lastValues + (props.data[i - j][key] ? 10 : 0)
                    }
                }
    
                if (i < prevDays) {
                    // i === 0 ? console.clear() : null
                    console.log(`${lastValues} + ${(value ? 10 : 0)} / ${((i < prevDays ? i : prevDays) + 2)}`)
                    console.log(value)
                    // console.log(i)
                    console.log((lastValues + (value ? 10 : 0)) / ((i < prevDays ? i : prevDays) + 2))
                }
    
                let avg = (lastValues + (value ? 10 : 0)) / ((i < prevDays ? i : prevDays) + 1)
    
                // if (i >= prevDays) {
                    console.log(k)
                    if (k === 0) {
                        let obj = {}
                        obj[key] = avg
                        avgDataControl.push(obj)
                    } else {
                        console.log(i - prevDays)
                        console.log(avgDataControl[i - prevDays])
                        // avgDataControl[i - prevDays][key] = avg
                        avgDataControl[i][key] = avg
                    }
                // }
            }
        }

        setAvgData(avgDataControl)
        console.log('------------------------------')
        console.log(avgDataControl)
        console.log(avgData)
        console.log('------------------------------')
    }, [props.data, prevDays])

    return (
        <div className='flex flex-col gap-2 items-center w-full h-full'>
            <div className='shadow-md rounded-xl bg-white overflow-hidden w-full h-full'>
                <div className='flex flex-row justify-between px-4'>
                    <div className='flex flex-row justify-center items-center gap-5'>
                        {props.keys.map(key => (
                            <div className='flex flex-row gap-2 items-center py-3'>
                                <span className={'aspect-square h-4 inline-block rounded-full'} style={{ backgroundColor: key.color }}/>
                                <p style={{ color: key.color }}>{key.title}</p>
                            </div>
                        ))}
                        <input 
                            type="range" 
                            min="1" 
                            max="50" 
                            step="1" 
                            value={prevDays} 
                            onChange={e => setPrevDays(parseInt(e.target.value))}
                        />
                        <p>{prevDays}</p>
                    </div>
                </div>
                <ResponsiveContainer height="88%">
                    <LineChart 
                        data={avgData} 
                        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                        <Brush dataKay={avgData} />
                        <CartesianGrid strokeDasharray="5 5" vertical={false}/>
                        <Tooltip />
                        {props.keys.map((key, i) => (
                            <Line key={i} type={prevDays === 1 ? "monotone" : "basis"} dataKey={key.title} stroke={key.color} strokeWidth={3} dot={false} activeDot={false} animationDuration={250} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}