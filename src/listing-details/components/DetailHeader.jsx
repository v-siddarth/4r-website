import React from 'react';
import { HiCalendarDays } from "react-icons/hi2";
import { FaTag, FaWeight, FaRuler, FaThList } from "react-icons/fa"; // Updated icons

function DetailHeader({wasteDetails}) {
  return (
    <div>
      {wasteDetails?.listingTitle ? (
        <div>
          <h2 className='font-bold text-3xl'>{wasteDetails?.listingTitle}</h2>
          <p className='text-sm'>{wasteDetails?.tagline}</p>

          <div className='flex gap-2 mt-3'>
            {/* Posted On */}
            <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3'>
              <HiCalendarDays className='h-5 w-5 text-primary' />
              <h2 className='text-primary text-sm'>{wasteDetails?.postedOn}</h2>
            </div>

            {/* Weight */}
            <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3'>
              <FaWeight className='h-5 w-5 text-primary' />
              <h2 className='text-primary text-sm'>{wasteDetails?.weight}</h2>
            </div>

            {/* Category */}
            <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3'>
              <FaThList className='h-5 w-5 text-primary' />
              <h2 className='text-primary text-sm'>{wasteDetails?.category}</h2>
            </div>

            {/* Dimensions */}
            <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-3'>
              <FaRuler className='h-5 w-5 text-primary' />
              <h2 className='text-primary text-sm'>{wasteDetails?.dimensions}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full rounded-xl h-[100px] bg-slate-200 animate-pulse'></div>
      )}
    </div>
  );
}

export default DetailHeader;
