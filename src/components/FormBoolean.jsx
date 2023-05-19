import React from 'react';

export default function FormBoolean(props) {
    return (
        <div className='w-96 px-3 py-3 shadow-md rounded-lg flex flex-row justify-between items-center border border-neutral-200'>
            <p>{props.question}</p>
            <div 
                className='p-1 bg-neutral-400 w-10 rounded-full cursor-pointer'
                onClick={props.handleClick(props.key)}
            >
                <div className='h-3 aspect-square bg-white rounded-full'></div>
            </div>
        </div>
    )
}