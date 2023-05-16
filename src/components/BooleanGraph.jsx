import React from 'react';

import { ReactComponent as SVG } from '@/assets/svg/graphs/boolean.svg'

export default function BooleanGraph() {
    return (
        <div className='flex flex-col gap-5'>
            Boolean Graph
            <div className='border border-black self-center'>
                <SVG />
            </div>
        </div>
    )
}