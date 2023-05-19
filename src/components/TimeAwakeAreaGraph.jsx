import React from 'react';

import { ResponsiveContainer, AreaChart, Area, Tooltip, CartesianGrid, Brush } from 'recharts';

export default function TimeAwakeAreaGraph(props) {
    return (
        <div className='h-full w-full bg-white rounded-t-lg shadow-md'>
            <div className='h-[10%] text-center text-lg grid place-items-center font-bold text-neutral-600'>
                Time Awake Area Chart
            </div>
            <ResponsiveContainer height="90%">
                <AreaChart data={props.data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <Brush stroke='#8884d8'/>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} />
                    <Tooltip />
                    <Area dataKey="TimeAwake" stroke="#8884d8" fill="#8884d8" strokeWidth={3} animationDuration={250} type="basis" dot={false} activeDot={false} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}