// "use client"

// import React from 'react';
// import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// export default function LineGraphBoolean(props) {
//     return (
//         <div className='flex flex-col gap-2 items-center w-full'>
//             <div className='shadow-md rounded-xl bg-white overflow-hidden w-full h-full'>
//                 <div className='flex flex-row justify-between px-4'>
//                     <div className='flex flex-row justify-center gap-5'>
//                         {props.keys.map(key => (
//                             <div className='flex flex-row gap-2 items-center py-3'>
//                                 <span className={'aspect-square h-4 inline-block rounded-full'} style={{ backgroundColor: key.color }}/>
//                                 <p style={{ color: key.color }}>{key.title}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <pre>
//                     {/* {JSON.stringify(props.data, null, 4)} */}
//                 </pre>
//                 <ResponsiveContainer height="90%">
//                     <LineChart 
//                         data={props.data} 
//                         margin={{ top: 0, left: 15, right: 15, bottom: 0 }}
//                     >
//                         <CartesianGrid strokeDasharray="5 5" vertical={false}/>
//                         <Tooltip />
//                         {props.keys.map((key, i) => (
//                             <Line key={i} type="basis" dataKey={key.title} stroke={key.color} strokeWidth={3} dot={false} activeDot={false} animationDuration={250} />
//                         ))}
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     )
// }

"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LineGraphBoolean(props) {
    const [avgData, setAvgData] = useState([])
    const [prevDays, setPrevDays] = useState(30)

    useEffect(() => {
        console.clear()
        let avgDataControl = []

        for (let k = 0; k < props.keys; k++) {
            for (let i = 0; i < props.data.length; i++) {
                let key = props.keys[k].title
                let value = props.data[i][key]
                let lastValues = 0
    
                if (i > prevDays) {
                    for (let j = 0; j < prevDays; j++) {
                        lastValues = lastValues + (props.data[i - j][key] ? 10 : 0)
                    }
                } else {
                    for (let j = 0; j < i; j++) {
                        console.log([i, j, i - j, lastValues])
                        lastValues = lastValues + (props.data[i - j][key] ? 10 : 0)
                    }
                }
    
                if (i < 15) {
                    console.log(`${lastValues} + ${(value ? 10 : 0)} / ${((i < prevDays ? i : prevDays) + 1)}`)
                    console.log(value)
                    // console.log(i)
                    console.log((lastValues + (value ? 10 : 0)) / ((i < prevDays ? i : prevDays) + 1))
                }
    
                let avg = (lastValues + (value ? 10 : 0)) / ((i < prevDays ? i : prevDays) + 1)
    
                if (k === 0) {
                    avgDataControl.push({
                        key: avg
                    })
                }
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
                    <div className='flex flex-row justify-center gap-5'>
                        {props.keys.map(key => (
                            <div className='flex flex-row gap-2 items-center py-3'>
                                <span className={'aspect-square h-4 inline-block rounded-full'} style={{ backgroundColor: key.color }}/>
                                <p style={{ color: key.color }}>{key.title}</p>
                            </div>
                        ))}
                        <button
                            onClick={() => setPrevDays(prev => prev + 1)}
                            className='px-3 border border-neutral-300 rounded-md self-center py-1'
                        >
                            +1
                        </button>
                        <button
                            onClick={() => setPrevDays(prev => prev - 1)}
                            className='px-3 border border-neutral-300 rounded-md self-center py-1'
                        >
                            -1
                        </button>
                        <button
                            onClick={() => setPrevDays(prev => prev + 5)}
                            className='px-3 border border-neutral-300 rounded-md self-center py-1'
                        >
                            +5
                        </button>
                        <button
                            onClick={() => setPrevDays(prev => prev - 5)}
                            className='px-2 border border-neutral-300 rounded-md self-center py-1'
                        >
                            -5
                        </button>
                        <input 
                            type="range" 
                            min="5" 
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