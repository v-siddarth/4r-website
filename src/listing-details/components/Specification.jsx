import React from 'react'
import IconField from '@/add-listing/components/IconField'

function Specification({ wasteDetails }) {
  const specs = [
    { label: "Category", value: wasteDetails?.category, icon: "FaTag" },
    { label: "Color", value: wasteDetails?.color, icon: "FaPalette" },
    { label: "Condition", value: wasteDetails?.condition, icon: "FaCheckCircle" },
    { label: "Offer Type", value: wasteDetails?.offerType, icon: "FaTags" },
    { label: "Original Price", value: `$${wasteDetails?.originalPrice}`, icon: "FaDollarSign" },
    { label: "Selling Price", value: `$${wasteDetails?.sellingPrice}`, icon: "FaMoneyBillAlt" },
    { label: "Weight", value: wasteDetails?.weight, icon: "FaTachometerAlt" }
  ];

  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
      <h2 className='font-medium text-2xl'>Specifications</h2>
      {wasteDetails ? (
        specs.map((item, index) => (
          <div key={index} className='mt-5 flex items-center justify-between'>
            <h2 className='flex gap-2'>
              <IconField icon={item?.icon} /> {item.label}
            </h2>
            <h2>{item.value}</h2>
          </div>
        ))
      ) : (
        <div className='w-full h-[500px] rounded-xl bg-slate-200 animate-pulse'></div>
      )}
    </div>
  );
}

export default Specification;
