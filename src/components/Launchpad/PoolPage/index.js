import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Pools } from '../../../data/pools';

export default function PoolPageBase() {
    const { id } = useParams();
    const [pool, setPool] = useState(null);

    useEffect(() => {
        const fetchPool = Pools.find((pool) => pool.id === parseInt(id));
        setPool(fetchPool);
    }, [id]);
    return (
        <div className="w-full flex justify-center">
            <div className="w-full px-4 md:px-0 md:flex md:w-10/12 md:gap-7">
                <div className="w-full md:w-[60%] bg-white dark:bg-dark-1 rounded-[10px]">

                </div>

                <div className="mt-14 md:mt-0 md:w-[40%] ">

                </div>
            </div>
        </div>
    )
}
