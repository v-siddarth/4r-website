import React from 'react';

function ImageGallery({ wasteDetails }) {
  if (!wasteDetails?.images || wasteDetails.images.length === 0) {
    return <div>No images available.</div>;
  }

  return (
    <div className='flex flex-wrap gap-4'>
      {wasteDetails?.images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index + 1}`}
          className='w-full h-[500px] object-cover rounded-xl'
        />
      ))}
    </div>
  );
}

export default ImageGallery;
