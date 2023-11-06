import React from 'react'
import { formatToLocalTime } from '../Services/WeatherService'

function TimeAndLocation({weather: {dt,timezone,name,country}} )  {
  return (
    <div>
        <div className='flex items-center justify-center my-6'>
            <p className='text-black text-xl font-extralight'>
                {formatToLocalTime(dt,timezone)}
            </p>
        </div>
        <div className=' flex items-center justify-center my-3'>
            <p className='text-black text-2xl font-medium'>
                {`${name}`}
            </p>
            <p className='text-black text-2xl font-medium'>
                ,{`${country}`}
            </p>

        </div>
    </div>
  )
}

export default TimeAndLocation