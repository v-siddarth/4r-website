import React from 'react';

function AddressComponent({ address }) {
    return (
        <div className='p-10 border rounded-xl shadow-md mt-7'>
            <h2 className='font-medium text-2xl'>Your Address</h2>

            <div className='mt-5'>
                <label className='font-medium'>Address Line 1</label>
                <p className='text-lg'>{address?.line1 || 'Not provided'}</p>
            </div>

            <div className='mt-5'>
                <label className='font-medium'>Address Line 2</label>
                <p className='text-lg'>{address?.line2 || 'Not provided'}</p>
            </div>

            <div className='flex gap-5 mt-5'>
                <div className="w-full">
                    <label className='font-medium'>City</label>
                    <p className='text-lg'>{address?.city || 'Not provided'}</p>
                </div>
                <div className="w-full">
                    <label className='font-medium'>Pincode</label>
                    <p className='text-lg'>{address?.pincode || 'Not provided'}</p>
                </div>
            </div>

            <div className='mt-5'>
                <label className='font-medium'>State</label>
                <p className='text-lg'>{address?.state || 'Not provided'}</p>
            </div>
        </div>
    );
}

export default AddressComponent;
