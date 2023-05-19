import React, { useState, useEffect } from 'react';

import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid, Brush, BarChart, Bar } from 'recharts';

export default function TimeAwakeBarGraph(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        setData([])

        props.data.forEach(e => {
            setData(data => [...data, { diff: e.TimeAwake[1] - e.TimeAwake[0] }])
            // let diff = e.TimeAwake[1] - e.TimeAwake[0]
        })

    }, props.data)

    return (
        <div className='h-full w-full bg-white rounded-t-lg shadow-md'>
            <div className='h-[10%] text-center text-lg grid place-items-center font-bold text-neutral-600'>
                Time Awake Bar Chart
            </div>
            <ResponsiveContainer height="90%">
                <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Brush stroke='#8884d8'/>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} />
                    <Tooltip />
                    <Bar dataKey="diff" stroke="#8884d8" fill="#8884d8" strokeWidth={3} animationDuration={250} type="basis" dot={false} activeDot={false} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}