import React, { useState, useEffect } from 'react';

import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid, Brush, BarChart, Bar } from 'recharts';

export default function TimeAwakeBarGraph(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        setData([])

        props.data.forEach(e => {
            setData(data => [...data, { TimeAwake: e.TimeAwake[1] - e.TimeAwake[0] }])
        })

            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data])

    return (
        <div className='h-full w-full bg-white rounded-t-lg shadow-md'>
            <div className='h-[15%] text-center text-lg grid place-items-center font-bold text-neutral-600'>
                Time Awake Bar Chart
            </div>
            <ResponsiveContainer height="85%">
                <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                        <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Brush stroke='#8884d8'/>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} />
                    <Tooltip 
                        allowEscapeViewBox={{ x: true, y: true }} 
                        animationEasing='ease-out' 
                        animationDuration={350}
                        contentStyle={{ borderRadius: "5px" }}
                    />
                    <Bar dataKey="TimeAwake" stroke="#82ca9d" fill='#82ca9d' strokeWidth={0} animationDuration={250} type="basis" dot={false} activeDot={false} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}