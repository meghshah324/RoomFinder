import React from 'react';

export default function LifeStyle({lifeStyle}) {
  
    return (
        <div className='m-10 bg-gray-100 p-5 rounded-lg shadow-sm w-auto'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
                LifeStyle
            </h2>
            <div className='text-[16px] grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2  font-medium'>
                <h3 className='text-gray-600'>Cleanliness : <span className='text-gray-900 text-semibold'>{lifeStyle.cleanliness}</span></h3>
                <h3 className='text-gray-600'>FoodPrefrence : <span className='text-gray-900 text-semibold'>{lifeStyle.foodPreference}</span></h3>
                <h3 className='text-gray-600'>Smoker : <span className='text-gray-900 text-semibold'>{lifeStyle.smoker}</span></h3>
                <h3 className='text-gray-600'>PartHabit : <span className='text-gray-900 text-semibold'>{lifeStyle.partyHabit}</span></h3>
                <h3 className='text-gray-600'>OverNightGuest : <span className='text-gray-900 text-semibold'>{lifeStyle.overnightGuest}</span></h3>
                <h3 className='text-gray-600'>Occupation : <span className='text-gray-900 text-semibold'>{lifeStyle.occupation}</span></h3>
            </div>
        </div>
    );
}
