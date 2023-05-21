"use client"

import React, { useState, useEffect } from 'react';

import FormBoolean from '@/components/FormBoolean';
import FormTimes from '@/components/FormTimes';
import { motion } from 'framer-motion';

export default function page() {
    /* ------------------------------- USE CLIENT ------------------------------- */
    const [form, setForm] = useState({})

    /* ---------------------------------- UTILS --------------------------------- */
    const Booleans = [
        {
            question: "Breakfast",
            key: "Breakfast"
        },
        {
            question: "Lunch",
            key: "Lunch"
        },
        {
            question: "Dinner",
            key: "Dinner"
        },
        {
            question: "Sleep",
            key: "Sleep"
        },
        {
            question: "Headache",
            key: "Headache"
        },
        {
            question: "Exercise",
            key: "Exercise"
        },
        {
            question: "Shower",
            key: "Shower"
        },
        {
            question: "Work",
            key: "Work"
        },
        {
            question: "Game",
            key: "Game"
        },
        {
            question: "Music",
            key: "Music"
        }
    ]

    function getDate() {
        let date = new Date
        let month = date.getMonth()
        let day = date.getDate()
        let year = date.getFullYear()

        switch (month) {
            case 1: month = "January"; break;
            case 2: month = "Febuary"; break;
            case 3: month = "March"; break;
            case 4: month = "April"; break;
            case 5: month = "May"; break;
            case 6: month = "June"; break;
            case 7: month = "July"; break;
            case 8: month = "August"; break;
            case 9: month = "September"; break;
            case 10: month = "October"; break;
            case 11: month = "November"; break;
            case 12: month = "December"; break;
        }
        return `${month} ${day}, ${year}`
    }

    /* -------------------------------- HANDLERS -------------------------------- */
    function handleFormSubmit() {
        e.preventDefault()
    }

    function handleClick(key) {
        setForm({...form, [key]: !form[key]})
    }

    return (
        <div className='grid place-items-center pt-10 pb-24 select-none bg-var5'>
            <form onSubmit={e => handleFormSubmit(e)} className='flex flex-col gap-5 p-5 bg-white shadow-md rounded-lg border border-neutral-200'>
                <motion.h2 
                    className='text-center font-bold tracking-wider text-3xl text-neutral-700'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    Daily Form
                </motion.h2>
                <motion.h3 
                    className='text-center font-normal tracking-wide text-sm mb-2 text-neutral-400'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {getDate()}
                </motion.h3>
                <motion.span 
                    className='bg-neutral-300 h-px'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                />
                <FormTimes/>
                <motion.span 
                    className='bg-neutral-300 h-px'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                />
                <div className='flex flex-col gap-3'>
                    {Booleans.map((e, i) => (
                        <FormBoolean key={i} delay={i} value={form[e.key]} question={e.question} objKey={e.key} handleClick={handleClick} />
                    ))}
                </div>
                <motion.span 
                    className='bg-neutral-300 h-px'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                />
                <motion.button 
                    className='bg-blue-500 w-full py-2 rounded-lg text-white hover:bg-blue-400 transition-colors'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 }}
                >
                    Submit
                </motion.button>
            </form>
        </div>
    )
}