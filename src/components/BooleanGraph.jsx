"use client"

import React, { useState, useEffect } from 'react';

export default function BooleanGraph(props) {
    const [linesData, setLinesData] = useState([])

    useEffect(() => {
        let lines = []

        for (let i = 0; i < props.dataKeys.length; i++) {
            let linesWrapper = []
            let colorLight = props.dataColors[i]

            let bgLine =
                <line
                    y1={`${100 / props.dataKeys.length * (i + 0.5)}%`}
                    y2={`${100 / props.dataKeys.length * (i + 0.5)}%`}
                    x1="0"
                    x2="100%"
                    stroke={colorLight}
                    strokeWidth='30'
                    strokeLinecap='round'
                    className='opacity-10'
                />

            linesWrapper.push(bgLine) // pushes darker background line before others so its layered under the top lines

            for (let j = 0; j < props.data.length; j++) {
                let line =
                    <line
                        y1={`${100 / props.dataKeys.length * (i + 0.5)}%`} // plus 0.5 centers the lines
                        y2={`${100 / props.dataKeys.length * (i + 0.5)}%`} // plus 0.5 centers the lines
                        x1={`${(100 / props.data.length * j)}%`}
                        x2={`${(100 / props.data.length * (j + 1))}%`}
                        stroke={colorLight}
                        strokeLinecap='round'
                        className={`${props.data[j][props.dataKeys[i]] === true ? 'opacity-100' : 'opacity-0'}`}
                    />

                if (props.data[j][props.dataKeys[i]] === true) {
                    linesWrapper.push(line)
                }
            }
            lines.push(linesWrapper)
        }
        setLinesData(lines)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.data])

    return (
        <div className='w-full h-full flex flex-row'>
            <div className='flex flex-col justify-between py-5 gap-1'>
                {props.dataKeys.map((key, i) => ( // list of keys on left of graph
                    <div key={i} className='relative flex flex-row gap-5 items-center rounded-l-full px-1 pr-5 overflow-hidden h-[7rem]'>
                        <div className='absolute top-0 left-0 w-full h-full opacity-10' style={{ backgroundColor: `${props.dataColors[i]}` }} />
                        <div className='w-4 h-4 rounded-full' style={{ backgroundColor: `${props.dataColors[i]}` }} />
                        <p style={{ color: `${props.dataColors[i]}` }}>{key}</p>
                    </div>
                ))}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className='overflow-visible py-5 px-8 bg-white rounded-lg shadow-md z-10'>
                {linesData.map((line, i) => ( // adds <g> wrapper around each row for hover effects
                    <g key={i} className='stroke-[5] opacity-50 hover:stroke-[10] hover:opacity-100 transition-all' height="10">
                        {line.map((subLine, i) => (
                            subLine
                        ))}
                    </g>
                ))}
            </svg>
        </div>
    )
}