"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TimePicker from 'react-time-picker'
import { motion } from 'framer-motion';

import Arrow from '@/assets/svg/dropdown/arrow.svg'

// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';

export default function FormTimes() {
    const [timeTo, setTimeTo] = useState("")
    const [timeFrom, setTimeFrom] = useState("")

    return (
        <div className='flex flex-col gap-4'>
            <motion.div 
                className='p-3 border border-neutral-300 rounded-lg shadow-md'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <p className='text-center text-lg text-neutral-500 mb-2'>Wake Up:</p>
                <TimePicker disableClock required className="time_picker_styles" hourPlaceholder='hh' minutePlaceholder='mm' onChange={setTimeTo} value={timeTo} />
            </motion.div>
            <motion.div 
                className='p-3 border border-neutral-300 rounded-lg shadow-md'
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <p className='text-center text-lg text-neutral-500 mb-2'>Sleep:</p>
                <TimePicker disableClock required className="time_picker_styles" hourPlaceholder='hh' minutePlaceholder='mm' onChange={setTimeFrom} value={timeFrom} />
            </motion.div>
        </div>
    )
}