"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer, Brush } from 'recharts';

export default function LineGraphBoolean2(props) {
    const [avgData, setAvgData] = useState([])
    const [prevDays, setPrevDays] = useState(30)
    const [activeKeys, setActiveKeys] = useState(props.keys.slice(0, 3))

    useEffect(() => {
        let avgDataControl = []

        for (let k = 0; k < activeKeys.length; k++) { // for each active key
            for (let i = 0; i < props.data.length; i++) { // for each data point
                let key = activeKeys[k].title
                let value = props.data[i][key]
                let sum = 0

                if (i < prevDays - 1) {
                    for (let j = 0; j < prevDays; j++) {
                        sum = sum + props.data[Math.max(0, i + (prevDays / 2) - j)] ? 10 : 0
                    }
                } else if (i > prevDays - 1 && i < props.data.length - prevDays) {
                    for (let j = 0; j < prevDays; j++) {
                        sum = sum + props.data[i + (prevDays / 2) - j] ? 10 : 0
                    }
                } else if (i > props.data.length - prevDays) {
                    for (let j = 0; j < prevDays; j++) {
                        sum = sum + props.data[Math.min(props.data.length - 1, i + (prevDays / 2) - j)] ? 10 : 0
                    }
                }

                // if (i > prevDays && i < (props.data.length - prevDays)) {
                //     for (let j = 0; j < prevDays; j++) {
                //         lastValues = lastValues + props.data[(i + (prevDays / 2)) - j][key] ? 10 : 0
                //     }
                // }
    
                // if (i <= (props.data.length - (prevDays / 2)) && i >= (prevDays / 2)) { // add 10 for each true value looped by the prevDays
                //     // for (let j = 0; j < prevDays; j++) { // middle
                //     //     console.log((i + (prevDays / 2)) - j)
                //     //     lastValues = lastValues + (props.data[(i + (prevDays / 2)) - j][key] ? 10 : 0)
                //     // }
                //     for (let j = 0; j < (prevDays / 2); j++) { // middle
                //         // console.log((i + (prevDays / 2)) - j)
                //         console.log(`${props.data[(i + (prevDays / 4)) - j]}`)
                //         // lastValues = lastValues + (props.data[(i + (prevDays / 4)) - j][key] ? 10 : 0)
                //     }
                //     // lastValues = 10
                // } else if (i > (props.data.length - (prevDays / 2))) {
                //     for (let j = 0; j < (prevDays / 2); j++) { // end
                //         lastValues = lastValues + (props.data[i - j][key] ? 10 : 0)
                //     }
                // } else if (i < (prevDays / 2)) {
                //     for (let j = 0; j < (prevDays / 2); j++) { // start
                //         // console.clear()
                //         // console.log(i + j)
                //         lastValues = lastValues + (props.data[i + j][key] ? 10 : 0)
                //     }
                // }
                    
                // if (i > prevDays) { // add 10 for each true value looped by the prevDays
                //     for (let j = 0; j < prevDays; j++) {
                //         sum = sum + (props.data[i - j][key] ? 10 : 0)
                //     }
                // } else {
                //     for (let j = 0; j < (i); j++) {
                //         sum = sum + (props.data[i - j][key] ? 10 : 0)
                //     }
                // }
    
                // calc avg and round to nearest tenth { eq = *Previous days added up* + *if (value === true) +10 else +0* / *if (index is less than the amount of days it looks back to calculate the avg) / i else / prevDays* }
                // let avg = Math.round((lastValues + (value ? 10 : 0)) / ((i < prevDays ? i : prevDays) + 1) * 10) / 10
                let avg = Math.round((sum + (value ? 10 : 0)) / ((i < prevDays ? i : prevDays) + 1) * 10) / 10
                
                if (k === 0) {
                    let obj = {}
                    obj[key] = avg
                    avgDataControl.push(obj)
                } else {
                    avgDataControl[i][key] = avg
                }
            }
        }

        setAvgData(avgDataControl)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data, prevDays, activeKeys])

    return (
        <div className='shadow-md rounded-t-xl bg-white overflow-hidden w-full h-full'>
            <div className='flex flex-row items-center gap-5 py-1 px-3 h-[10%]'>
                {props.keys.map((key, i) => (
                    <label 
                        key={i} 
                        htmlFor={key.title} 
                        style={activeKeys.filter(keys => keys.title === key.title).length === 0 ? { opacity: "0.5", transform: "translate(2px, -2px)" } : { opacity: "1", transform: "translate(-2px, -2px)" }}
                        className='h-full flex flex-row items-center gap-3 transition-all cursor-pointer' 
                    >
                        <input 
                            type="checkbox" 
                            id={key.title}
                            checked={activeKeys.filter(keys => keys.title === key.title).length === 0 ? false : true}
                            onChange={() => {
                                if (activeKeys.filter(keys => keys.title === key.title).length === 0) {
                                    setActiveKeys(activeKeys => [...activeKeys, { title: key.title, color: key.color }])
                                } else {
                                    setActiveKeys(keys => keys.filter(keys => keys.title !== key.title))
                                }
                            }}
                            className='boolean_checkbox'
                        />
                        <div className='boolean_custom_checkbox' style={{ backgroundColor: key.color }} />
                        <p className='select-none translate-y-[1px]' style={{ color: key.color }}>{key.title}</p>
                    </label>
                ))}
                <input
                    type="range"
                    min="1"
                    max="200"
                    step="2"
                    value={prevDays}
                    onChange={e => setPrevDays(parseInt(e.target.value))}
                    className="appearance-none bg-neutral-200 h-2 rounded-full hover:h-5 transition-all hover:px-1 px-0 w-full"
                />
                <p className='w-16'>{prevDays}</p>
                <div className=" relative group flex justify-center items-center aspect-square bg-neutral-200 rounded-full h-5 cursor-help">
                    <p className='text-sm text-neutral-700 cursor-help select-none'>?</p>
                    <p className='absolute right-0 top-[120%] w-96 bg-neutral-100 py-1 px-3 z-10 rounded-md shadow-md text-neutral-700 opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-y-2 group-hover:translate-y-0'>
                        This is the amount of previous days it looks back to calculate the average. This is why the first days dont change because there are not as many days to look back on.
                    </p>
                </div>
            </div>
            <ResponsiveContainer height="90%">
                <LineChart
                    data={avgData}
                    margin={{top: 0, left: 0, right: 0, bottom: 0}}
                >
                    <Brush stroke='#8884d8'/>
                    {/* <CartesianGrid strokeDasharray="5 5" vertical={true} verticalCoordinatesGenerator={(props2) => [(props2.width / props.data.length) * prevDays]}/> */}
                    <CartesianGrid strokeDasharray="5 5" vertical={false} />
                    <Tooltip/>
                    {props.keys.map((key, i) => (
                        <Line key={i} type={prevDays === 1 ? "monotone" : "basis"} dataKey={key.title} stroke={key.color} strokeWidth={3} dot={false} activeDot={false} animationDuration={250}/>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}