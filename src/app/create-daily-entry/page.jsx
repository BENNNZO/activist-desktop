"use client"

import React, { useState, useEffect } from 'react';

import FormBoolean from '@/components/FormBoolean';
import FormTimes from '@/components/FormTimes';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function page() {
    const router = useRouter()
    const { data: session } = useSession()

    /* ------------------------------- USE CLIENT ------------------------------- */
    const [form, setForm] = useState({})
    const [wakeUp, setWakeUp] = useState("11:23")
    const [sleep, setSleep] = useState("15:45")
    const [mood, setMood] = useState(0)
    const [energy, setEnergy] = useState(0)
    const [response, setResponse] = useState("")

    /* ---------------------------------- UTILS --------------------------------- */
    const Booleans = [
        {
            question: "Did you eat breakfast?",
            key: "Breakfast"
        },
        {
            question: "Did you eat lunch?",
            key: "Lunch"
        },
        {
            question: "Did you eat dinner?",
            key: "Dinner"
        },
        {
            question: "Did you get good sleep?",
            key: "Sleep"
        },
        {
            question: "Did you have a headache?",
            key: "Headache"
        },
        {
            question: "Did you exercise?",
            key: "Exercise"
        },
        {
            question: "Did you shower?",
            key: "Shower"
        },
        {
            question: "Did you work?",
            key: "Work"
        },
        {
            question: "Did you game?",
            key: "Game"
        },
        {
            question: "Did you do any or listen to music?",
            key: "Music"
        },
        {
            question: "Did you smoke?",
            key: "Smoke"
        },
        {
            question: "Did you vape?",
            key: "Vape"
        },
        {
            question: "Did you drink?",
            key: "Drink"
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
    function handleFormSubmit(e) {
        e.preventDefault()
        let formatteWakeUp = parseInt(wakeUp.split(":")[0]) + parseFloat(wakeUp.split(":")[1] / 60)
        let formatteSleep = parseInt(sleep.split(":")[0]) + parseFloat(sleep.split(":")[1] / 60)
        console.log({
            FormattedDate: getDate(),
            TimeAwake: [
                formatteWakeUp,
                formatteSleep
            ],
            Mood: mood,
            Energy: energy,
            form,

        })
        axios.post(`/api/data/${session?.user.id}`, {
            FormattedDate: getDate(),
            TimeAwake: [
                formatteWakeUp,
                formatteSleep
            ],
            Mood: mood,
            Energy: energy,
            form,

        })
        .then(res => {
            setResponse(res.data)
            if (res.data !== "dpae") {
                router.push(`dashboard/${session?.user.id}`)
            }
        })
        .catch(err => console.log(err))
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
                <FormTimes
                    wakeUpChange={setWakeUp}
                    sleepChange={setSleep}
                    wakeUpValue={wakeUp}
                    sleepValue={sleep}
                />
                <motion.span 
                    className='bg-neutral-300 h-px'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                />
                <div className='flex flex-col gap-5 w-full'>
                    <motion.div
                        className='px-5 py-3 bg-white border grid place-items-center gap-2 border-neutral-300 shadow-md rounded-lg'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <h2 className='text-lg text-neutral-500'>Mood</h2>
                        <div className='grid grid-cols-[80%_20%] w-full'>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="1"
                                className='w-full'
                                onChange={e => setMood(e.target.value)}
                                value={mood}
                            />
                            <p className='text-center text-lg text-neutral-500'>{mood}</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className='px-5 py-3 bg-white border grid place-items-center gap-2 border-neutral-300 shadow-md rounded-lg'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h2 className='text-lg text-neutral-500'>Energy</h2>
                        <div className='grid grid-cols-[80%_20%] w-full'>
                            <input
                                type="range"
                                min="0"
                                max="10"
                                step="1"
                                className='w-full'
                                onChange={e => setEnergy(e.target.value)}
                                value={energy}
                            />
                            <p className='text-center text-lg text-neutral-500'>{energy}</p>
                        </div>
                    </motion.div>
                </div>
                <motion.span 
                    className='bg-neutral-300 h-px'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
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
                    transition={{ delay: 1.7 }}
                />
                {
                    response !== "dpae" ? null : (
                        <p className='text-center bg-red-100 border border-red-200 py-2 rounded-lg shadow-md'>
                            Data Point Already Exists!
                        </p>
                    )
                }
                <motion.button 
                    className='bg-blue-500 w-full py-2 rounded-lg text-white hover:bg-blue-400 transition-colors'
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.8 }}
                >
                    Submit
                </motion.button>
            </form>
        </div>
    )
}