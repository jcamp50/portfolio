import React from 'react'
import Image from 'next/image'

const SkillTag = ({ icon, name }) => {
  return (
    <div className='flex flex-row px-2 py-1 items-center justify-center border rounded-full font-semibold gap-2  text-[#121212] bg-[#ffffff]'>
      <Image src={icon} width={25} height={25} alt={`${name} icon`} />
      {name}
    </div>
  );
};

export default SkillTag