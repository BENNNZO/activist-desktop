"use client"

import React from 'react';
import TimePicker from 'react-time-picker'
import { motion } from 'framer-motion';

export default function FormTimes(props) {
    return (
        <div className='flex flex-col gap-4'>
            <motion.div 
                className='p-3 border border-neutral-300 rounded-lg shadow-md'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <p className='text-center text-lg text-neutral-500 mb-2'>Wake Up:</p>
                <TimePicker
                    disableClock
                    required
                    className="time_picker_styles"
                    hourPlaceholder='hh'
                    minutePlaceholder='mm'
                    onChange={props.wakeUpChange}
                    value={props.wakeUpValue}
                />
            </motion.div>
            <motion.div 
                className='p-3 border border-neutral-300 rounded-lg shadow-md'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <p className='text-center text-lg text-neutral-500 mb-2'>Sleep:</p>
                <TimePicker
                    disableClock
                    required
                    className="time_picker_styles"
                    hourPlaceholder='hh'
                    minutePlaceholder='mm'
                    onChange={props.sleepChange}
                    value={props.sleepValue}
                />
            </motion.div>
            {/* <div className='flex flex-row justify-between gap-5'>
                <ul className='w-full bg-white border border-neutral-300 rounded-lg'>
                    <p className='px-3 py-1'>
                        {`${wakeUp}pm`}
                    </p>
                    {[...Array(12)].map((e, i) => (
                        <li key={i} className={`py-1 px-3 ${i !== 0 ? 'border-t border-t-neutral-300' : ''}`}>
                            <p>{i === 0 ? '12' : i}am</p>
                        </li>
                    ))}
                </ul>
                <ul className='w-full bg-white border border-neutral-300 rounded-lg'>
                    <p className='px-3 py-1'>
                        {`${wakeUp}am`}
                    </p>
                    {[...Array(12)].map((e, i) => (
                        <li key={i} className={`py-1 px-3 ${i !== 0 ? 'border-t border-t-neutral-300' : ''}`}>
                            <p>{i === 0 ? '12' : i}pm</p>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    )
}