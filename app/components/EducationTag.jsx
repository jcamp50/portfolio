import React from 'react';
import Image from 'next/image';

const EducationTag = ({ icon, name, degree, date, GPA }) => {
  return (
    <div className='font-sans w-full flex flex-row px-6 py-2 items-center justify-start border rounded-xl sm:rounded-full md:rounded-xl lg:rounded-full font-semibold gap-2  text-[#121212] bg-[#ffffff]'>
      <Image src={icon} width={50} height={50} alt={`${name} icon`} />
      <div className='flex flex-row w-full items-center justify-between'>
        <div className='mr-4 flex flex-col'>
          <h1 className='text-xs sm:text-sm md:text-xs lg:text-sm font-extrabold'>
            {name}{' '}
          </h1>
          <h2 className='text-xs sm:text-sm md:text-xs lg:text-sm'>{degree}</h2>
        </div>
        <div className='flex flex-col'>
          <h1 className='text-xs sm:text-sm md:text-xs lg:text-sm font-extrabold '>
            Graduating:
          </h1>
          <h2 className='text-xs sm:text-sm md:text-xs lg:text-sm'>{date}</h2>
          <div className='flex flex-row gap-1 mt-2'>
            <h1 className='text-xs sm:text-sm md:text-xs lg:text-sm font-extrabold'>
              GPA:
            </h1>
            <h2 className='text-xs sm:text-sm md:text-xs lg:text-sm'>{GPA}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationTag;
