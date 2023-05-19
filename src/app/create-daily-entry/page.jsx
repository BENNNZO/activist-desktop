"use client"

import React, { useState, useEffect } from 'react';

import FormBoolean from '@/components/FormBoolean';

export default function page() {
    const [form, setForm] = useState({})

    useEffect(() => {
        
    }, [])

    function handleFormSubmit() {
        e.preventDefault()
    }

    function handleClick(key) {
        setForm(form => form[key] ? form[key] = false : form[key] = true)
    }

    return (
        <div className='grid place-items-center'>
            Hello World!
            <form onSubmit={e => handleFormSubmit(e)}>
                <FormBoolean 
                    question="Breakfast"
                    key="Breakfast"
                    handleClick={() => handleClick}
                />
            </form>
            <pre>
                {JSON.stringify(form, null, 4)}
            </pre>
        </div>
    )
}