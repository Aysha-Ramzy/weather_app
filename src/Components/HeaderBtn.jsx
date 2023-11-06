import React from 'react'

function HeaderBtn  ({setQuery})  {

  const cities = [
    { id: 1, name: 'Colombo' },
    { id: 2, name: 'Moratuwa' },
    { id: 3, name: 'Kegalle' },
    { id: 4, name: 'Jaffna' },
    { id: 5, name: 'Ampara ' },
  ]

  return (
    <div className='flex items-center justify-around my-6'>
      {
        cities.map((city) => (
          <button
            key={city.id}
            onClick={() => setQuery({q:city.name}) }
            className="text-black text-lg font-medium transition ease-in-out hover:scale-90"
          >
            {city.name}
          </button>
        ))
      }
    </div>
  )
}

export default HeaderBtn