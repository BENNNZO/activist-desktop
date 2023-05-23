import React from 'react';
import { motion } from 'framer-motion';

export default function FormBoolean(props) {
    return (
        <motion.div 
            className={`w-96 px-3 py-3 shadow-md rounded-lg flex flex-row justify-between items-center border cursor-pointer ${props.value ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'} transition-colors`}
            onClick={() => props.handleClick(props.objKey)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + (props.delay / 10) }}
        >
            <p className='text-md'>{props.question}</p>
            <div className={`p-1 w-10 rounded-full transition-colors ${props.value ? 'bg-green-400' : 'bg-red-400'}`}>
                <div className={`relative h-3 aspect-square bg-white rounded-full transition-transform ${props.value ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </motion.div>
    )
}