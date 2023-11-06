import React, { useState } from 'react'
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons'

function SearchLocation ({setQuery,units,setUnits}) {
    const [city,setCity] = useState("");

    const handleSearch =() => {
        if(city !== ' ' ) setQuery({q:city})
    }
    
    const handleLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=> {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                setQuery({
                    lat,lon,
                })
            })
        }
    }

    const handleUnits = (e) => {
        const selectedUnit = e.currentTarget.name;
        if(units !== selectedUnit) setUnits(selectedUnit);
    }

  return (

    <div className='flex flex-row justify-center my-6 '>
        <div className='flex flex-row justify-center items-center bg-white  border-gray-300 rounded-full w-3/4 h-14  '>
            <input
            value={city}
            onChange={(e)=> setCity(e.currentTarget.value)}
            className='rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none'
            id='search'
            type='text'
            placeholder='Search city'
            />
            <div className='p-4'>
            <button className='bg-blue-500 text-black rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center'>
                <UilSearch size='20'
                onClick = {handleSearch}
                />
            </button>
            </div>
        </div>
        <div className='flex flex-row justify-center items-center rounded-full w-1/4 h-14 ml-2'>
            <div className='py-4 px-2'>
            <button className=' text-black rounded-full p-2 transition ease-in-out hover:scale-150 focus:outline-none w-12 h-12 flex items-center justify-center'>
                <UilLocationPoint 
                onClick = {handleLocation}
                size='20' />
            </button>
            </div>
        </div>
        <div className='flex flex-row space-between items-center rounded-full w-1/4 h-14 ml-2'>
            <div className='p-4 flex'>
            <button 
            name="metric"
            onClick = {handleUnits}
            className=' text-black rounded-full p-2 transition ease-in-out hover:scale-150 focus:outline-none w-12 h-12 flex items-center justify-center'>
                °C  
            </button>
            <div className='flex items-center justify-center text-black'>|</div>
            <button 
            onClick = {handleUnits}
            name='imperial'
            className='text-black rounded-full p-2  transition ease-in-out hover:scale-150 focus:outline-none w-12 h-12 flex items-center justify-center'>
                °F
            </button>
            </div>
        </div>

    </div>

  )
}

export default SearchLocation